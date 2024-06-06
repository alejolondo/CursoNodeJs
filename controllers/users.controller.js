const {response, request } = require('express')
const { unsubscribe } = require('../routes/users.routes')
const Usuario = require('../models/usuario.js')


const getUsers = (req = request, res) => {

    const {nombre = 'No name', correo } = req.query;
    
    res.status(200).json({
        msg: 'Hello World, GET - controlador',
        nombre,
        correo
    })
  }

const postUsers = async (req, res) => {

    const body = req.body;
    const usuario = new Usuario( body );

    await usuario.save();
    
    res.status(201).json({
        msg: 'Hello World, POST - controlador',
        usuario
    })
  }

const putUsers = (req, res) => {

    const id = req.params.id

    res.status(200).json({
        msg: 'Hello World, PUT - controlador ',
        id
    })
  }


const deleteUsers = (req, res) => {
    res.status(200).json({
        msg: 'Hello World, DELETE - controlador'
    })
  }

  module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers

  }