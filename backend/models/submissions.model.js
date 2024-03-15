module.exports = (sequelize, Sequelize) => {
    const Submissions = sequelize.define('submissions', {
        submission_id: {
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
        site_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'sc_sites',
                key: 'site_id'
            }, allowNull: false
        },
        staff_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'staffs',
                key: 'staff_id'
            }, allowNull: false
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
    Submissions.sync({ alter: true });
    return Submissions;
};
