const { db } = require('../utils/db_connection');

const Submission = db.submissions;
const Forms= db.forms;
exports.createSubmission = async (req, res) => {
    try {
        const submission = await Submission.create({
            form_id: req.body.form_id,
            staff_id: req.session.user.staff_id,
            site_id: req.body.site_id,
        });
        res.status(200).send(submission);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateSubmission = async (req, res) => {
    try {
        const updated = await Submission.update(req.body, { where: { submission_id: req.params.id }});
        if (updated) {
            const updatedSubmission = await Submission.findByPk(req.params.id);
            res.status(200).send(updatedSubmission);
        } else {
            res.status(404).send({ message: 'Submission not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



exports.getSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByPk(req.params.id);
        if (submission) {
            res.status(200).send(submission);;
        } else {
            res.status(404).send({ message: 'Submission not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllSubmission = async (req, res) => {
    try {
        const submissions = await Submission.findAll();
        res.status(200).send(submissions);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteSubmission = async (req, res) => {
    try {
        const deleted = await Submission.destroy({
            where: { submission_id: req.params.id }
        });
        if (deleted) {
            res.status(200).send({ message: 'Submission deleted successfully' });
        } else {
            res.status(404).send({ message: 'Submission not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
