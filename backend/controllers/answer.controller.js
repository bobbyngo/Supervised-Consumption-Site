const { db, pool } = require('../utils/db_connection');
const transporter = require('../utils/email_notification');
const Submissions = db.Submissions;
const Answers = db.answers;

exports.submitAnswers = async (req, res) => {


    try {
                // Create a new submission
            // Create a new submission
        const submission = await Submissions.create({
            form_id: req.body.form_id,
            staff_id: req.session.user.staff_id,
            site_id: req.body.site_id,
        });
        const answers = req.body.answers.map(answer => ({
            submission_id: submission.submission_id,
            question_id: answer.question_id,
            answer_text: answer.answer_text,
            answer_boolean: answer.answer_boolean,
            answer_date: answer.answer_date,
            question_option_id: answer.question_option_id,


        }));

        await Answers.bulkCreate(answers);
        res.send({ message: "Answers submitted successfully." });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};


exports.findAllAnswers = async (req, res) => {
    try {
        await Answers.findAll({
            where: { submission_id: parseInt(req.params.sid) },
        }).then((data) => res.send(data));
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};


exports.updateAnswer = async (req, res) => {
    const id = req.params.id;
    const answer = await Answers.findByPk(id);
    // Get the id of the user who created the question and the current user
    const userCreatedId = answer.dataValues.supervised_user_id;
    const currentUserId = req.session.user.staff_id;

    if (userCreatedId !== currentUserId && req.session.user.role_id !== 0) {
        res.send({
            message: `Only staff submitted the answer (staff_id: ${userCreatedId} can update this answer)`,
        });
    } else {
        Answers.update(
            { answer_text: req.body.answer_text },
            {
                where: { answer_id: id },
            }
        ).then(async (num) => {
            if (num == 1) {
                // Send email notification for the first update this will be for site admins
                
                const submission = await Submissions.findByPk(answer.submission_id);
                const submissionDate = submission.createdAt; // Assuming createdAt field stores submission date
                const mailOptions = {
                    from: 'ngohuugiabao8980@gmail.com',
                    to: ['ngohuugiabao8980@gmail.com'],
                    subject: 'Answer Update Alert',
                    text: `User ID ${currentUserId} updated the answer with the id ${id} for submission ID ${submission.submission_id}`,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                // Check if the submission was created more than 45 days ago
                const currentDate = new Date();
                const differenceInDays = Math.floor((currentDate - submissionDate) / (1000 * 60 * 60 * 24));

                if (differenceInDays > 45) {
                    // Send email notification after 45 days this will be for HC
                    const secondMailOptions = {
                        from: 'ngohuugiabao8980@gmail.com',
                        to: ['ngohuugiabao8980@gmail.com'],
                        subject: 'Answer Update Alert After 45 Days',
                        text: `User ID ${currentUserId} updated the answer with the id ${id} for submission ID ${submission.submission_id} after 45 days.`,
                    };
                    transporter.sendMail(secondMailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }

                res.send({
                    message: 'Answer is updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update answer with id=${id}`,
                });
            }
        }).catch((error) => {
            res.status(500).send({ message: error.message });
        });
    }
};
