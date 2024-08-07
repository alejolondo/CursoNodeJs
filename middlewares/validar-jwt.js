const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT =  ( req, res = response, next  ) => {
    const token = req.header('Autorizathion');

    if( !token ){
      return res.status(401).json({
        messagge: 'There is no a token into the req'
      });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        req.uid = uid;
    
        next(); 
    } catch (error) {
        return res.status(401).json({
        messagge: 'Invalid Token'
        });
    }

    
}


module.exports = {
    validarJWT
}