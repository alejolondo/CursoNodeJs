const { Router } = require('express')
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller.js');
const { validarCampos } = require('../middlewares/validar-campos.js');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is necesary').not().isEmpty(),
    validarCampos
] , login );

router.post('/google',[
    check('id_token', 'Id token de google es necesario').not().isEmpty(),
    validarCampos
] , googleSingIn );

module.exports = router;
