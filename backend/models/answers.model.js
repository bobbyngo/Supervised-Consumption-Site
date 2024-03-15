module.exports = (sequelize, Sequelize) => {
    const Answers = sequelize.define('answers', {
        answer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        submission_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'submissions',
                key: 'submission_id'
            }
        },
        question_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'question_id'
            }
        },
        answer_text: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        question_option_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'question_options',
                key: 'question_option_id'
            }
        },
        answer_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        answer_boolean: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        created_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },

    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    Answers.sync({ alter: true });
    return Answers;
};
