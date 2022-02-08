

const validateFields  = require('../middlewares/validator-users');
const validationRole = require('../middlewares/validator-roles');
const validationJwt = require('../middlewares/validator-jwt');

module.exports = {
    ...validateFields,
    ...validationRole,
    ...validationJwt
}