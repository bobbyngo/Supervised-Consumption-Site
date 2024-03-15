const controller = require('../controllers/users.controller');
const authMiddleware = require('../middleware/authorization');
const verifyAuthToken = require('../middleware/signInCheck');

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        );
        next();
    });

    /**
     * Update user information giving the user id
     * @Method PUT
     * @endpoint http://localhost:4000/api/user/:id/edit
     * Example
     * :id is the user id, http://localhost:4000/api/user/3/edit
     * 
     * @RequestBody
     * {
            "site_id": 1,
            "username" : "user_4",
            "role_id": 4,
            "email" : "user_4@gmail",
            "password": "password"
        }
     */
    app.put(
        '/api/user/:id/edit',
        [verifyAuthToken, authMiddleware.isAdmin], 
        controller.updateUser
    );
};
