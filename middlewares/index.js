const validarCampos = require('../middlewares/validar-campos');
const  validarJWT = require('../middlewares/validar-jwt.js');
const validarRoles = require('../middlewares/validar-roles.js');


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}