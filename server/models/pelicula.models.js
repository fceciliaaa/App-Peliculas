const mongoose = require('mongoose');
const {coleccionComentarios} = require('./comentarios.models');

const coleccionPeliculas = mongoose.Schema({
  titulo: {
    type: String, 
    required: [true, 'Nombre de la pelicula es requerido'],
    minlength: [3, 'Debe contener al menos 3 caracteres']
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userRegister'
},
  comentarios: [coleccionComentarios]
}, { timestamps: true });

const Peliculas = mongoose.model('peliculas', coleccionPeliculas)

module.exports = Peliculas; 