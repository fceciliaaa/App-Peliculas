import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppProvider";
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ComentariosPelicula = ({ listaPeliculas, setListaPeliculas, eliminarPeliculaDeLista }) => {
  const { id } = useParams();
  const navegacion = useNavigate();
  const { state, setState } = useContext(AppContext);

  //Busca la pelicula en la base de datos por medio del id que se encuentra en la URL
  const peliculaSeleccionada = listaPeliculas.find((pelicula) => pelicula._id == id);

  //Eliminar pelicula completa
  const eliminarPelicula = async () => {
    if (!state.isAuthenticated) {
      navegacion("/login")
    } else {
      const url = `http://localhost:8080/pelicula/eliminar/${peliculaSeleccionada._id}`;
      await axios.delete(url);

      eliminarPeliculaDeLista(peliculaSeleccionada._id);
      navegacion('/');

    }
  }

  //Eliminar comentario de la pelicula
  const eliminarComentario = async (comentarioId) => {
    const url = `http://localhost:8080/pelicula/eliminar/comentario/${comentarioId}`;
    await axios.delete(url);

    // Actualizar la lista de comentarios de la película seleccionada
    const nuevaListaComentarios = peliculaSeleccionada.comentarios.filter(
      (comentario) => comentario._id !== comentarioId
    );

    // Actualizar la lista de películas con los comentarios actualizados
    const nuevaListaPeliculas = listaPeliculas.map((pelicula) => {
      if (pelicula._id === peliculaSeleccionada._id) {
        return { ...pelicula, comentarios: nuevaListaComentarios };
      }
      return pelicula;
    });

    setListaPeliculas(nuevaListaPeliculas);
  }

  return (
    <div className="contenedor-comentarios">
      <h2>Comentarios para <span className="sub-title-movies">{peliculaSeleccionada.titulo}</span> </h2>
      <table className="tabla-peliculas" >
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Puntuación </th>
            <th>Reseña</th>
          </tr>
        </thead>
        <tbody>
          {peliculaSeleccionada.comentarios.map((pelicula, index) => (
            <tr key={index}>
              <td>
                {pelicula.usuario}
                {state.user && state.user._id === pelicula.createdBy && (
                  <button className="trash-btn" onClick={() => eliminarComentario(pelicula._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} className="trash-icon" />
                  </button>
                )}
              </td>
              <td> {pelicula.rating} </td>
              <td> {pelicula.comentario} </td>
            </tr>
          ))}
        </tbody>
      </table >
      <button type="button" onClick={() => navegacion(`/`)}> Atrás </button>
      <button className="btn-eliminar" onClick={eliminarPelicula}> Eliminar pelicula </button>
      <div className="links-conditional">
        <Link to={`/pelicula/${peliculaSeleccionada._id}/comentario`}> Escribir una reseña </Link>
      </div>

    </div>
  )
};

export default ComentariosPelicula;