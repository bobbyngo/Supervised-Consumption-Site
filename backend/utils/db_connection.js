const config = require('../config/config.json');
const Pool = require('pg').Pool;
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
});

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    underscored: true,
    define: {
        underscored: true,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.supervised_users = require('../models/users.model.js')(sequelize, Sequelize);
db.questions = require('../models/questions.model.js')(sequelize, Sequelize);
db.submissions = require('../models/submissions.model.js')(sequelize, Sequelize);
db.answers = require('../models/answers.model.js')(sequelize, Sequelize);
db.roles = require('../models/roles.model.js')(sequelize, Sequelize);
db.logs = require('../models/logs.model.js')(sequelize, Sequelize);
db.sc_sites = require('../models/sc_sites.model.js')(sequelize, Sequelize);
db.question_type = require('../models/question_type.model.js')( sequelize,Sequelize);
db.question_option = require('../models/question_options.model.js')(sequelize, Sequelize);
db.forms = require('../models/forms.model.js')(sequelize, Sequelize);

db.questions.hasMany(db.question_option, {
    foreignKey: 'question_id',
    as: 'question_option',
});

db.question_option.belongsTo(db.questions, {
    foreignKey: 'question_id',
    as: 'question',
});

db.forms.hasMany(db.questions, { foreignKey: 'form_id', as: 'questions' });
db.questions.belongsTo(db.forms, { foreignKey: 'form_id', as: 'form' });


db.forms.hasMany(db.submissions, { foreignKey: 'form_id', as: 'submissions' });
db.submissions.belongsTo(db.forms, { foreignKey: 'form_id', as: 'form' });

db.submissions.hasMany(db.answers, { foreignKey: 'submission_id', as: 'answers' });
db.answers.belongsTo(db.submissions, { foreignKey: 'submission_id', as: 'submission' });


// // Populate the data
// async function populateForms() {
//     const forms = [
//         {
//             site_id: 1,
//             user_id: 1,
//             form_name: 'Client data collection form',
//         },
//         {
//             site_id: null,
//             user_id: 2,
//             form_name: 'Metric form',
//         },
//         {
//             site_id: 2,
//             user_id: 2,
//             form_name: 'Form 3',
//         },
//     ];
//     await db.forms.bulkCreate(forms);
// }

// async function populateUser() {
//     const users = [
//         {
//             site_id: 1,
//             username: 'admin',
//             role_id: 0,
//             email: 'admin@gmail',
//             password_hash: bcrypt.hashSync('password', 8),
//         },
//         {
//             site_id: 1,
//             username: 'hcadmin',
//             role_id: 1,
//             email: 'hcadmin@gmail',
//             password_hash: bcrypt.hashSync('password', 8),
//         },
//         {
//             site_id: 1,
//             username: 'hcuser',
//             role_id: 2,
//             email: 'hcuser@gmail',
//             password_hash: bcrypt.hashSync('password', 8),
//         },
//         {
//             site_id: 1,
//             username: 'siteadmin',
//             role_id: 3,
//             email: 'siteadmin@gmail',
//             password_hash: bcrypt.hashSync('password', 8),
//         },
//         {
//             site_id: 1,
//             username: 'siteuser',
//             role_id: 4,
//             email: 'site@gmail',
//             password_hash: bcrypt.hashSync('password', 8),
//         },
//     ];
//     await db.supervised_users.bulkCreate(users);
// }
// async function populateQuestions() {
//     const questions = [
//         {
//             form_id: 1,
//             question_type_id: 1,
//             is_required: true,
//             is_mandatoryhc: true,
//             question_text: 'What subtance did you use?',
//             user_created_id: 1,
//         },
//         {
//             form_id: 1,
//             question_type_id: 1,
//             is_required: true,
//             is_mandatoryhc: true,
//             question_text: 'What is your age?',
//             user_created_id: 1,
//         },
//         {
//             // form_id is auto generated in the API
//             form_id: 1,
//             question_type_id: 1,
//             is_required: true,
//             is_mandatoryhc: true,
//             question_text: 'What is your gender?',
//             // user_created_id is auto generated in the API
//             user_created_id: 1,
//         },
//         {
//             form_id: 1,
//             question_type_id: 1,
//             is_required: true,
//             is_mandatoryhc: true,
//             question_text: 'What area do you live in?',
//             user_created_id: 1,
//         },
//     ];

//     const optionQuestion = [
//         {
//             // question id is auto generated in the API
//             question_id: 1,
//             determined_answer: 'Crack',
//         },
//         {
//             question_id: 1,
//             determined_answer: 'Cocaine',
//         },
//         {
//             // question id is auto generated in the API
//             question_id: 3,
//             determined_answer: 'Male',
//         },
//         {
//             question_id: 3,
//             determined_answer: 'Female',
//         },
//     ];
//     await db.questions.bulkCreate(questions);
//     await db.question_option.bulkCreate(optionQuestion);
// }

// //populateForms();
// //populateUser();
// //populateQuestions();

module.exports = {
    pool,
    db,
};
