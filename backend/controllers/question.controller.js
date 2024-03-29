const { db, pool } = require('../utils/db_connection');
const Role = require('../config/roleEnum');
const authMiddleware = require('../middleware/authorization');
const Forms = db.forms;
const Questions = db.questions;
const QuestionOptions = db.question_option;

exports.createQuestion = async (req, res) => {
    const form = await Forms.findByPk(req.params.sid);
    if (form !== null) {
        try {
            let returnData = {};
            await Questions.create({
                form_id: form.form_id,
                question_text: req.body.question_text,
                question_type_id: req.body.question_type_id,
                is_mandatoryhc: req.body.is_mandatoryhc,
                is_required: req.body.is_required,
                user_created_id: req.session.user.staff_id,
            }).then((data) => {
                returnData = data.dataValues;
            });
            let reqQuestionOption = req.body.question_option;
            if (reqQuestionOption) {
                reqQuestionOption = reqQuestionOption.map((obj) => ({
                    ...obj,
                    question_id: returnData.question_id,
                }));

                returnData = {
                    ...returnData,
                    question_option: reqQuestionOption,
                };

                await QuestionOptions.bulkCreate(reqQuestionOption);
                res.send(returnData);
            }
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    } else {
        res.status(500).send({ message: "Session doesn't exist" });
    }
};

exports.findAllQuestions = async (req, res) => {
    try {
        let questions = await Questions.findAll({
            include: [
                {
                    model: QuestionOptions,
                    as: 'question_option',
                },
            ],
            where: { form_id: parseInt(req.params.sid) },
        });
        res.status(200).send(questions);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.findQuestionById = async (req, res) => {
    try {
        const id = req.params.id;
        let question = await Questions.findOne({
            include: [
                {
                    model: QuestionOptions,
                    as: 'question_option',
                },
            ],
            where: { question_id: id },
        });
        res.status(200).send(question);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await Questions.findByPk(id);
        // Get the role id of user create the question and the current user
        const userCreatedRoleId = question.dataValues.user_created_id;
        const currentUserRoleId = req.session.user.role_id;

        if (
            authMiddleware.isAdminToModify(userCreatedRoleId, currentUserRoleId)
        ) {
            Questions.update(req.body, {
                where: { question_id: id },
            }).then((num) => {
                if (num == 1) {
                    res.send({
                        message: 'Question is updated successfully.',
                    });
                } else {
                    res.send({
                        message: `Cannot update Question with id=${id}`,
                    });
                }
            });
        } else {
            res.send({
                message: `User has no priviledge to update the question`,
            });
        }
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    const id = req.params.id;
    const question = await Questions.findByPk(id);
    const userCreatedRoleId = question.dataValues.user_created_id;
    const currentUserRoleId = req.session.user.role_id;

    if (authMiddleware.isAdminToModify(userCreatedRoleId, currentUserRoleId)) {
        Questions.destroy({
            where: { question_id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: 'Question was deleted successfully!',
                    });
                } else {
                    res.send({
                        message: `Cannot delete Question with id=${id}`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message,
                });
            });
    } else {
        res.send({
            message: `User has no priviledge to delete the question`,
        });
    }
};
