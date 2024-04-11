const {response, request } = require('express')
const { unsubscribe } = require('../routes/users.routes')

const getUsers = (req = request, res) => {

    const {nombre = 'No name', correo } = req.query;
    
    res.status(200).json({
        msg: 'Hello World, GET - controlador',
        nombre,
        correo
    })
  }

const postUsers = (req, res) => {

    const { nombre, correo } = req.body;

    res.status(201).json({
        msg: 'Hello World, POST - controlador',
        nombre,
        correo
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