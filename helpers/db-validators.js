const Role = require('../models/role.js')
const Usuario = require('../models/usuario.js')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne( { rol });
    if( !existeRol ) {
      throw new Error(`rol value ${rol} is not allowed.`);
    }
  }

const emailExiste = async ( email ) => {
    const existEmail =  await Usuario.findOne({ email: email })
    if(existEmail){
        throw new Error(`Email ${email} already exist`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existUsuario =  await Usuario.findById( id )
    if( !existUsuario ){
        throw new Error(`Id ${id} dosen't exist. `);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}