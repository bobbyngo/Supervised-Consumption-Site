module.exports = (sequelize, Sequelize) => {
    const QuestionOptions = sequelize.define('question_options', {
        question_option_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        question_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'question_id'
            }
        },
        determined_answer: {
            type: Sequelize.STRING,
        },
    });
    QuestionOptions.sync({ alter: true });
    return QuestionOptions;
};
