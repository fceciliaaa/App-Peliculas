import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppProvider";

const FormPelicula = ({ actualizarLista }) => {

  const [titulo, setTitulo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [rating, setRating] = useState('');
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState({});
  const navegacion = useNavigate();
  const { state, setState } = useContext(AppContext);

  // useEffect para establecer el nombre del usuario al cargar el componente
  useEffect(() => {
    if (state.user && state.user.name) {
      setUsuario(state.user.name); // Establece el nombre del usuario desde el estado global
    }
  }, [state.user]); // Solo se ejecuta cuando `state.user` cambia

  const agregarNuevaPelicula = async (e) => {
    e.preventDefault();
    const createdBy = state.user._id

    try {
      //Primero se agrega el nuevo comentario a la base de datos de comentarios
      const nuevoComentario = { usuario, createdBy, rating, comentario }
      await axios.post('http://localhost:8080/comentarios/nuevo', nuevoComentario)

      const nuevaPelicula = { titulo, createdBy, comentarios: [nuevoComentario] }

      const url = 'http://localhost:8080/pelicula/nueva'
      const respuesta = await axios.post(url, nuevaPelicula);

      actualizarLista(respuesta.data);
      navegacion('/');

      setError({})

    } catch (error) {
      console.log(error.response.data.errors);
      setError(error.response.data.errors);
    }

  }

  return (
    <>
      <h2> Nueva pelicula </h2>
      <form onSubmit={agregarNuevaPelicula}>

        <div className="inputs">
          <label htmlFor="titulo"> Titulo </label>
          <input type="text" id="titulo" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          {error.titulo ? <p style={{ color: 'red' }}>{error.titulo.message}</p> : ''}
        </div>

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

export default FormPelicula;