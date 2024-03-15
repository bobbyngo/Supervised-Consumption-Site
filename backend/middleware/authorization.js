const Role = require('../config/roleEnum');

function isSuperAdmin(req, res, next) {
    const user = req.session.user;
    return Role[user.role_id] === 'Administrator';
}

function isAdmin(req, res, next) {
    const user = req.session.user;
    const role = Role[user.role_id];
    if (
        isSuperAdmin(req) ||
        role === 'HC_Administrator' ||
        role === 'Site_Administrator'
    ) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isSiteRole(req, res, next) {
    const user = req.session.user;
    const role = Role[user.role_id];
    if (
        isSuperAdmin(req) ||
        role === 'Site_Data_Collectors' ||
        role === 'Site_Administrator'
    ) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isHCRole(req, res, next) {
    const user = req.session.user;
    if (
        isSuperAdmin(req) ||
        user.role === 'HC_Viewer' ||
        user.role === 'HC_Administrator'
    ) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isHCAdmin(req, res, next) {
    const user = req.session.user;
    if (isSuperAdmin(req) || user.role === 'HC_Administrator') {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isSiteAdmin(req, res, next) {
    const user = req.session.user;
    if (isSuperAdmin(req) || user.role === 'Site_Administrator') {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to access the resources',
        });
    }
}

function isAdminToModify(userTargetRoleId, currentUserRoleId) {
    // A function checking admin role and compare they are the same admin in the department
    return (
        (Role[userTargetRoleId] === Role[currentUserRoleId] &&
            (Role[currentUserRoleId] === 'HC_Administrator' ||
                Role[currentUserRoleId] === 'Site_Administrator')) ||
        Role[currentUserRoleId] === 'Administrator'
    );
}

function isAdminInSameDepartmentToModify(userTargetRoleId, currentUserRoleId) {
    // Function checking if the current user role is admin, if yes, they can perform action to the
    // target in their department
    if (
        Role[currentUserRoleId] === 'HC_Administrator' &&
        Role[userTargetRoleId].includes('HC')
    ) {
        return true;
    }
    if (
        Role[currentUserRoleId] === 'Site_Administrator' &&
        Role[userTargetRoleId].includes('Site')
    ) {
        return true;
    }

    return Role[currentUserRoleId] === 'Administrator';
}


function canModifySubmission(req, res, next) {
    if (isSiteRole(req) || isSuperAdmin(req)) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to modify the submission',
        });
    }
}

function canViewSubmission(req, res, next) {
    if (isSuperAdmin(req) || isSiteRole(req)) {
        return next();
    } else {
        return res.status(401).send({
            message: 'Unauthorized to view the submission',
        });
    }
}
function canSubmitForm(req, res, next) {
    if (isSiteRole(req)) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized to submit data' });
    }
}

function canManageSiteQuestions(req, res, next) {
    if (isSuperAdmin(req) || isSiteAdmin(req)) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized to manage site questions' });
    }
}

function canAccessSiteSpecificDashboard(req, res, next) {
    if (isSiteAdmin(req)) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized to view site dashboard' });
    }
}

function canManageHCFormsAndQuestions(req, res, next) {
    if (isSuperAdmin(req) || isAdmin(req)) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized to manage HC questions/global forms' });
    }
}

function canDeleteSubmission(req, res, next) {
    // Logic to check if the user can delete a specific submission
    if (isSuperAdmin(req) || isSiteAdmin(req)) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized to delete submission' });
    }
}
const authMiddleware = {
    isSuperAdmin,
    isAdmin,
    isSiteRole,
    isHCRole,
    isHCAdmin,
    isSiteAdmin,
    isAdminToModify,
    isAdminInSameDepartmentToModify,
    canModifySubmission,
    canViewSubmission,
    canSubmitForm,
    canManageSiteQuestions,
    canAccessSiteSpecificDashboard,
    canManageHCFormsAndQuestions,
    canDeleteSubmission,
};
module.exports = authMiddleware;

