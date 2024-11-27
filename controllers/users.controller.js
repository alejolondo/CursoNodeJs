const {response, request } = require('express')
const { unsubscribe } = require('../routes/users.routes')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario.js')


const getUsers =  async (req = request, res) => {

  //Para paginar y limitar la cantidad de registros que consulto.
  const { limite = 5, desde = 0 } = req.params;

  //Forma #1
  // const usuarios = await Usuario.find({ status: true})
  //   .limit(  Number(limite))
  //   .skip( Number( desde ));

  // const total = await Usuario.countDocuments({ status: true});

  //OTRA FORMA DE ESCRIBIR EL CODIGO PARA QUE SE HAGA TODO AL TIEMPO
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ status: true}),
    Usuario.find({ status: true})
      .limit(  Number(limite))
      .skip( Number( desde ))
  ])

  res.status(200).json( { 
    total, 
    usuarios
  });
}

const postUsers = async (req, res) => {

    const {name, email, password, rol } = req.body;
    const usuario = new Usuario( {name, email, password, rol } );


    // Encrptiar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();
    
    res.status(201).json({
        msg: 'Hello World, POST - controlador',
        usuario
    })
  }   

const putUsers = async (req, res) => {

    const id = req.params.id
    const { _id, password, google, ...resto } = req.body;

    //Validar ID con la base de Datos


    if( password ) {
      //Encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.status(200).json({ usuario })
  }


const deleteUsers = async (req, res) => {
  const { id } = req.params;
  
  //Borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete( id );

  //Borrado Recomendado
  const usuario = await Usuario.findByIdAndUpdate(id, { status: false } );

    res.status(200).json(usuario);
  }

  module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers

  }