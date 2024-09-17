const mongoose = require('mongoose');

const coleccionComentarios = mongoose.Schema({
  usuario: {
    type: String, 
    required: [true, 'Nombre de usuario es requerido'],
    minlength: [3, 'Debe contener al menos 3 caracteres']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userRegister'
  },
  rating:{
    type: Number
  },
  comentario:{
    type: String, 
    required: [true, 'Nombre de usuario es requerido']
  }
});

const Comentarios = mongoose.model('comentarios', coleccionComentarios)

module.exports = {Comentarios, coleccionComentarios}; 