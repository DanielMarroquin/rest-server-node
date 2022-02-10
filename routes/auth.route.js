const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validator-users');


const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    // check('login', 'Login invalido').isJWT(),
    
    validateFields

], login );

router.post('/google', [
    check('id_token', 'El ID token es necesario').not().isEmpty(),
    // check('login', 'Login invalido').isJWT(),
    
    validateFields

], googleSingIn );


module.exports = router;