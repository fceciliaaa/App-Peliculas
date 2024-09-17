import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { useContext } from 'react';


const ListaPeliculas = ({ listaPeliculas }) => {
  const navegacion = useNavigate();
  const { state, setState } = useContext(AppContext);


  const calcularPromedioRating = (comentarios) => {
    let totalRating = 0;

    for (let i = 0; i < comentarios.length; i++) {
      totalRating += comentarios[i].rating;
    }

    const promedioRedondeado = Math.round((totalRating / comentarios.length) * 10) / 10;
    return promedioRedondeado;
  };


  const handleCommentClic = (id) => {
    if (!state.isAuthenticated) {
      navegacion("/login")
    } else {
      navegacion(`/pelicula/${id}/comentario`)
    }
  }

  return (
    <>
      <table className="tabla-peliculas">
        <thead>
          <tr>
            <th>PELICULA</th>
            <th>RATING</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {listaPeliculas.map((pelicula, index) => (
            <tr key={index}>
              <td>{pelicula.titulo} </td>
              <td>{calcularPromedioRating(pelicula.comentarios)}</td>
              <td>
                <button type="button" className="btn-review" onClick={() => navegacion(`/pelicula/${pelicula._id}`)}> Ver reseña </button>

                <button type="button" className="btn-review" onClick={() => handleCommentClic(pelicula._id)} > Escribir reseña </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table >

    </>
  )
}

export default ListaPeliculas;