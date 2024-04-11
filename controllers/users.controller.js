const {response, request } = require('express')
const { unsubscribe } = require('../routes/users.routes')

const getUsers = (req, res) => {
    res.status(200).json({
        msg: 'Hello World, GET - controlador'
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
    res.status(200).json({
        msg: 'Hello World, PUT - controlador '
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