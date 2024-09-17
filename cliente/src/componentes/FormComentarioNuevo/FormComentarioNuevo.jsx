import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const FormComentarioNuevo = ({ actualizarPelicula, listaPeliculas }) => {
  const [usuario, setUsuario] = useState('');
  const [rating, setRating] = useState('');
  const [comentario, setComentario] = useState('');
  const { state, setState } = useContext(AppContext);
  const { id } = useParams();

  const navegacion = useNavigate();
  const createdBy = state.user._id

  //Busca la pelicula en la base de datos por medio del id que se encuentra en la URL
  const peliculaSeleccionada = listaPeliculas.find((pelicula) => pelicula._id == id);

  useEffect(() => {
    if (state.user && state.user.name) {
      setUsuario(state.user.name); // Establece el nombre del usuario desde el estado global
    }
  }, [state.user]);

  const agregarNuevoComentario = async (e) => {
    e.preventDefault();
    try {
      const nuevoComentario = { usuario, rating, comentario, createdBy }

      const url = `http://localhost:8080/pelicula/agregar/comentario/${id}`
      const respuesta = await axios.put(url, nuevoComentario);

      actualizarPelicula(respuesta.data);
      navegacion(`/pelicula/${id}`);


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2> Nuevo comentario para <span className="sub-title-movies"> {peliculaSeleccionada.titulo} </span>  </h2>

      <form onSubmit={agregarNuevoComentario}>

        <div className="inputs">
          <label htmlFor="usuario"> Tu nombre </label>
          <input type="text" id="usuario" name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>

        <div className="inputs">
          <label htmlFor="rating"> Rating </label>
          <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="rating-select" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="inputs">
          <label htmlFor="comentario"> Tu comentario </label>
          <input type="text" id="comentario" name="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} />
        </div>

        <button type="button" onClick={() => navegacion(`/`)}> Cancelar </button>
        <button type="submit" className="btn-agregar" > Agregar </button>
      </form>
    </>
  )
};

export default FormComentarioNuevo;