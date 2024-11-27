const { response, request } = require("express");


const esAdminRole = async (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: "No puede validar el rol sin el usuario",
        });
    }
    
    const { rol, name } = req.usuario;
    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no es administrador`,
        });
    }

    next();
}

const tieneRole =  ( ...roles ) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "No puede validar el rol sin el usuario",
            });
        }

        if( !roles.includes(req.usuario.rol) ) {
            return res.status(401).json({
                msg: `El usuario no tiene uno de estos roles : ${roles.join(', ')}`,
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole,
};