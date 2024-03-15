module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions', {
        question_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        form_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'forms',
                key: 'form_id'
            }, allowNull: false
        },
        question_type_id: {
            type: Sequelize.INTEGER,
        },
        question_text: {
            type: Sequelize.STRING,
        },
        is_required: {
            type: Sequelize.BOOLEAN,
        },
        is_mandatoryhc: {
            type: Sequelize.BOOLEAN,
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
    Questions.sync({ alter: true });
    return Questions;
};
