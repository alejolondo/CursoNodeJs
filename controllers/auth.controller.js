const {response, request } = require('express')
const Usuario = require('../models/usuario.js')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt.js');
const { googleVerify } = require('../helpers/google-veriry.js');


const login = async (req, res = response) =>{

    const {email, password} = req.body;

    try {
    

    //verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    console.log("🚀 ~ login ~ usuario:", usuario)
    if ( !usuario ){
        return res.status(400).json({
            msg: 'Email or password incorrect'
        })
    } 

    // Verificar si el usuario esta activo
    if ( !usuario.status ){
        return res.status(400).json({
            msg: 'User not available '
        })
    }

    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if(!validPassword){
        return res.status(400).json({
            msg: 'Incorrect Password'
        })
    }
    //Generar JWT
    const token = await generarJWT( usuario.id )


    res.status(200).json({
       usuario,
       token
    })
        
    } catch (error) {
        res.status(500).json({
            msg: 'Something was wrong, please contact the administrator'
        })
    }
    

}

const googleSingIn = async (req, res )=> {

    const { id_token } = req.body;

    try {

        const {name, email, img } = await googleVerify( id_token );
        
        //vERIFICAR CORREO 
        let usuario = await Usuario.findOne({email});

        //Si el usuario no existe, crearlo
        if ( !usuario ){
            const data = {
                name,
                email,
                img,
                password: ':P',
                google: true,
                role: 'USER_ROLE',
                status: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        //si el usuario en bd
        if( !usuario.status ){
            return res.status(401).json({
                msg: 'User not available '
            })
        }
        
        //Generar JWT
        const token = await generarJWT( usuario.id ) 


        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no válido'
        })
    }

}

module.exports = {
    login,
    googleSingIn
}