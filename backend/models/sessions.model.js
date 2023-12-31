module.exports = (sequelize, Sequelize) => {
    const Sessions = sequelize.define('sessions', {
        session_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        site_id: {
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
        },
    });
    //Sessions.sync({ alter: true });
    return Sessions;
};
