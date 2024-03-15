module.exports = (sequelize, Sequelize) => {
    const Forms = sequelize.define('forms', {
        form_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        site_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'sc_sites',
                key: 'site_id'
            }, allowNull: true
        },
        form_name: {
            type: Sequelize.STRING,
        },
        is_published: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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
    

    // Uncommented for first run
    Forms.sync({ alter: true });


    return Forms;
};
