const { Router } = require('express')
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller.js');
const { validarCampos } = require('../middlewares/validar-campos.js');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is necesary').not().isEmpty(),
    validarCampos
] , login );

module.exports = router;
