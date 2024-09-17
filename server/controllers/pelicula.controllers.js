const Peliculas = require('../models/pelicula.models'); 
const {Comentarios} = require('../models/comentarios.models')

//Añadir nueva Pelicula
module.exports.crearPelicula = (req, res) =>{ 
  Peliculas.create(req.body) 
    .then((nuevaPelicula) => {
      return res.status(201).json(nuevaPelicula);
    })
    .catch((error) => {
      res.statusMessage = error;
      return res.status(400).json(error);
    });
};

//Obtener pelicula
module.exports.todasLasPeliculas = (req, res) => { 
  Peliculas.find() 
      .then((listaPeliculas) => {
          return res.status(200).json(listaPeliculas);
      })
      .catch((error) => {
          return res.status(400).json(error);
      });
};

//Borrar pelicula
module.exports.eliminarPelicula = (req, res) =>{ 
  Peliculas.findOneAndDelete({_id: req.params.id}) 
    .then(() => {
      return res.status(200).end();
    })
    .catch((error) => {
        return res.status(400).json(error);
    });
}; 

//Actualizar pelicula
module.exports.editarPelicula = (req, res) => { 
  const  actualizarPelicula={}
  const {titulo, usuario, rating, comentario} = req.body

  if (titulo){
    actualizarPelicula.titulo = titulo;
  }
  if (usuario){
    actualizarPelicula.usuario = usuario;
  } 
  if (rating){
    actualizarPelicula.rating = rating;
  }
  if (comentario){
    actualizarPelicula.comentario = comentario;
  }

  Peliculas.findByIdAndUpdate({_id: req.params.id}, actualizarPelicula, {new: true, runValidators: true}) 
    .then((peliculaActualizada)=>{
      return res.status(200).json(peliculaActualizada)
    })
    .catch((error) => {
      res.statusMessage = error;
      return res.status(400).json(error);
  });
};


//Añadir comentario
module.exports.agregarComentario = (req, res) => { 
  const { id } = req.params; // ID de la película
  const { usuario, rating, comentario, createdBy } = req.body; // Utilizar createdBy en lugar de userId

  // Primero, intenta actualizar el comentario existente en la base de datos de Comentarios
  Comentarios.findOneAndUpdate(
    { createdBy, comentario: comentario }, // Usar createdBy y comentario como criterios de búsqueda
    { $set: { rating, comentario } }, // Actualizar el rating y comentario
    { new: true, runValidators: true } // Devolver el documento actualizado
  )
  .then(comentarioActualizado => {
    if (comentarioActualizado) {
      // Si se actualizó un comentario, añade este comentario actualizado a la película
      Peliculas.findByIdAndUpdate(
        id,
        { $set: { 'comentarios.$[elem]': comentarioActualizado } }, // Utiliza un filtro para actualizar el comentario en el array
        { arrayFilters: [{ 'elem.createdBy': createdBy }], new: true, runValidators: true } // Aplica el filtro para actualizar el comentario
      )
      .then(peliculaActualizada => {
        res.status(200).json(peliculaActualizada);
      })
      .catch(error => {
        res.status(400).json(error);
      });
    } else {
      // Si el comentario no se encontró, crea un nuevo comentario en la base de datos de Comentarios
      const nuevoComentario = { usuario, rating, comentario, createdBy };

      Comentarios.create(nuevoComentario)
      .then(comentarioCreado => {
        // Luego añade el nuevo comentario a la película
        Peliculas.findByIdAndUpdate(
          id,
          { $push: { comentarios: comentarioCreado } }, // Añade el nuevo comentario a la película
          { new: true, runValidators: true }
        )
        .then(peliculaConComentarioNuevo => {
          res.status(200).json(peliculaConComentarioNuevo);
        })
        .catch(error => {
          res.status(400).json(error);
        });
      })
      .catch(error => {
        res.status(400).json(error);
      });
    }
  })
  .catch(error => {
    res.status(400).json(error);
  });
};

// Borrar comentario
module.exports.eliminarComentario = (req, res) => {
  // Primero, eliminar el comentario de la colección de comentarios
  Comentarios.findOneAndDelete({ _id: req.params.id })
    .then((comentarioEliminado) => {
      if (!comentarioEliminado) {
        return res.status(404).json({ message: "Comentario no encontrado en la base de datos de comentarios" });
      }

      // Segundo, eliminar el comentario del array de comentarios en la película
      return Peliculas.findOneAndUpdate(
        { "comentarios._id": req.params.id }, // Busca la película que tiene este comentario
        { $pull: { comentarios: { _id: req.params.id } } }, // Elimina el comentario del array
        { new: true } // Devuelve el documento actualizado
      );
    })
    .then((peliculaActualizada) => {
      if (!peliculaActualizada) {
        return res.status(404).json({ message: "Película no encontrada" });
      }
      return res.status(200).json({ message: "Comentario eliminado con éxito de ambas bases de datos", pelicula: peliculaActualizada });
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message });
    });
};
