const { Router } = require('express');
const { check } = require('express-validator');

// Importacion de los middlewares
const { validateFields, 
        validationRole, 
        validationJwt, 
        haveRole } = require ('../middlewares')


const { rolValidate, emailValite, validateUserById } = require('../helpers/db-validators');
// const Role = require('../models/role');

const { getUsers, 
        putUsers, 
        postUsers, 
        deleteUsers } = require('../controllers/users.controller');


const router = Router();

router.get('/', getUsers );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no cumple con las condiciones').isEmail(),
    check('email').custom( emailValite ),
    check('role').custom( rolValidate ),
    validateFields

], postUsers);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( validateUserById ),
    check('role').custom( rolValidate ),
    validateFields
], putUsers);

router.delete('/:id', [
    validationJwt,
    // validationRole,
    haveRole('ADMIN_ROLE', 'SALES_ROLE' ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( validateUserById ),
    validateFields
], deleteUsers);



module.exports = router;