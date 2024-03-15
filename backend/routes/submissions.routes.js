const controller = require('../controllers/submission.controller');
const verifyAuthToken = require('../middleware/signInCheck');
const authMiddleware = require('../middleware/authorization');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        );
        next();
    });

    // Route for submitting a new submission
    app.post('/api/form/:fid/submissions/create', [verifyAuthToken, authMiddleware.isSiteRole], controller.createSubmission);

    // Route for retrieving a specific submission by ID
    app.get('/api/form/:fid/submissions/:id', [verifyAuthToken, authMiddleware.isSiteRole], controller.getSubmission);

    // Route for updating a specific submission by ID
    app.put('/api/submissions/:id/update', [verifyAuthToken, authMiddleware.isSiteAdmin], controller.updateSubmission);

    // Route for deleting a specific submission by its ID
    app.delete('/api/submissions/:id/delete', [verifyAuthToken, authMiddleware.isSiteAdmin], controller.deleteSubmission);
};