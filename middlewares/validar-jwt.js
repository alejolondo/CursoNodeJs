const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js')

const validarJWT =  async ( req, res = response, next  ) => {
    const token = req.header('Authorization');
    console.log("🚀 ~ validarJWT ~ token:", token)

    if( !token ){
      return res.status(401).json({
        messagge: 'Invalid token provided'
      });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);
        
        //verificar si usuario existe
        if (!usuario ){
          return res.status(401).json({
            messagge: 'User not found'
          });
        }

        //verificar si usuario no ha sido eliminado
        if( !usuario.status ){
          return res.status(401).json({
            messagge: 'User inactive'
          });
        }
        req.usuario = usuario;
    
        next(); 
    } catch (error) {
      console.log("🚀 ~ validarJWT ~ error:", error)
        return res.status(401).json({
        messagge: 'Invalid Token'
        });
    }

    
}


module.exports = {
    validarJWT
}