const {Comentarios} = require('../models/comentarios.models')

//Obtener comentario
module.exports.todosLosComentarios = (req, res) => { 
    Comentarios.find() 
        .then((listaComentarios) => {
            return res.status(200).json(listaComentarios);
        })
        .catch((error) => {
            return res.status(400).json(error);
        });
};

//Agregar comentario
module.exports.agregarComentario = (req, res) =>{ 
    Comentarios.create(req.body) 
      .then((nuevoComentario) => {
        return res.status(201).json(nuevoComentario);
      })
      .catch((error) => {
        res.statusMessage = error;
        return res.status(400).json(error);
      });
  };