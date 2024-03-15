module.exports = (sequelize, Sequelize) => {
    const Logs = sequelize.define('logs', {
        log_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        staff_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'staffs',
                key: 'staff_id'
            }, allowNull: true
        },
        site_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'sc_sites',
                key: 'site_id'
            }, allowNull: true
        },
        log_type: {
            type: Sequelize.STRING,
        },
        log_description: {
            type: Sequelize.STRING,
        },
    });
    // Sync the tables in db, create if not exists or changed the schema
    // Uncommented the sync for all models when first run to create table
    Logs.sync({ alter: true });
    return Logs;
};
