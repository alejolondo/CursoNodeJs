const { Router } = require('express')
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { getUsers,
        postUsers, 
        putUsers, 
        deleteUsers} = require ('../controllers/users.controller.js');

const router = Router();

router.get('/', getUsers );

  router.post('/', [
    check('password', 'Password must have 6 characters ').isLength({min: 6}),
    check('name', 'Fiel name is required').not().isEmpty(),
    // check('rol', 'rol value is not valid').isIn(['ADMIN_ROLE', 'USER_ROL']), en caso de que no lo quiera consultar de la DB
    check('email').custom( emailExiste ), // Están en los helpers
    check('rol').custom( esRolValido ),
    validarCampos //Middleware
  ],  postUsers );

  router.put('/:id', [
    check('id', 'Id is not a Mongo Id Valid').isMongoId(),
    check('id').custom(  existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
  ], putUsers );

  router.delete('/:id',[
    check('id', 'Id is not a Mongo Id Valid').isMongoId(),
    check('id').custom(  existeUsuarioPorId ),
    validarCampos
  ], deleteUsers );





module.exports = router