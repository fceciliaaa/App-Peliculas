const express = require('express');
const peliculaController = require('../controllers/pelicula.controllers');
const routerPeliculas = express.Router();

routerPeliculas.post('/nueva', peliculaController.crearPelicula); 
routerPeliculas.get('/', peliculaController.todasLasPeliculas); 
routerPeliculas.delete('/eliminar/:id', peliculaController.eliminarPelicula); 
routerPeliculas.put('/actualizar/:id', peliculaController.editarPelicula); 
routerPeliculas.put('/agregar/comentario/:id', peliculaController.agregarComentario);
routerPeliculas.delete('/eliminar/comentario/:id', peliculaController.eliminarComentario); 

module.exports = routerPeliculas;