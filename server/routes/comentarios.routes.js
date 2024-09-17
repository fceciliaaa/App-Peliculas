const express = require('express');
const comentarioController = require('../controllers/comentarios.controller');
const routerComentarios = express.Router();

routerComentarios.get('/', comentarioController.todosLosComentarios); 
routerComentarios.post('/nuevo', comentarioController.agregarComentario); 


module.exports = routerComentarios;