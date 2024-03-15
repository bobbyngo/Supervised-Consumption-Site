module.exports = (sequelize, Sequelize) => {
    const Sites = sequelize.define('sc_sites', {
        site_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        site_name: {
            type: Sequelize.STRING,
        },
        address_line1: {
            type: Sequelize.STRING,
        },
        address_line2: {
            type: Sequelize.STRING,
        },
        postal_code: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        province: {
            type: Sequelize.ENUM('AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'),
            allowNull: false
        },
        site_type: {
            type: Sequelize.ENUM('Fixed', 'Mobile'),
            allowNull: false
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
    Sites.sync({ alter: true });
    return Sites;
};
