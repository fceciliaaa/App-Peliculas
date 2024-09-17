import './App.css'
import axios from 'axios';
import AppProvider from '../../context/AppProvider';
import { PublicRoutes } from '../../routes/PublicRoutes';
import { PrivateRoutes } from '../../routes/PrivateRoutes';
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ListaPeliculas from '../ListaPeliculas/ListaPeliculas';
import FormPelicula from '../FormPelicula/FormPelicula';
import ComentariosPelicula from '../ComentariosPelicula/ComentariosPelicula';
import FormComentarioNuevo from '../FormComentarioNuevo/FormComentarioNuevo';
import FormInicioSesion from '../FormInicioSesion/FormInicioSesion';
import NavBar from '../NavBar/NavBar';

const App = () => {
  const [listaPeliculas, setListaPeliculas] = useState([]);

  //Cargar la lista de peliculas
  useEffect(() => {
    const verLista = async () => {
      const url = 'http://localhost:8080/pelicula'
      const respuesta = await axios.get(url);
      setListaPeliculas(respuesta.data)
    }
    verLista();
  }, []);

  //Actualizar la lista de peliculas despues de agregar una nueva
  const actualizarLista = (nuevaPelicula) => {
    setListaPeliculas([...listaPeliculas, nuevaPelicula])
  }

  //Eliminar pelicula de la lista
  const eliminarPeliculaDeLista = (_id) => {
    const listaTemporal = listaPeliculas.filter(pelicula => pelicula._id !== _id);
    setListaPeliculas(listaTemporal);
  }

  //Actualizar una pelicula despues de modificarla
  const actualizarPelicula = (peliculaActualizada) => {
    const listaActualizada = listaPeliculas.map(pelicula =>
      pelicula._id === peliculaActualizada._id ? peliculaActualizada : pelicula
    )
    setListaPeliculas(listaActualizada);
  }

  return (
    <>
      <AppProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={
            <div className='contenedor'>
              <div className='sub-contenedor'>
                <h3> Peliculas </h3>
                <Link to='/nueva/pelicula' className="link-btn" > Agregar nueva pelicula </Link>
              </div>
              <ListaPeliculas listaPeliculas={listaPeliculas} />
            </div>
          }
          />
          <Route path='/nueva/pelicula' element={
            <PrivateRoutes>
              < FormPelicula actualizarLista={actualizarLista} />
            </PrivateRoutes>
          } />
          <Route path='/pelicula/:id' element={
            <PublicRoutes>
              < ComentariosPelicula listaPeliculas={listaPeliculas} setListaPeliculas={setListaPeliculas} eliminarPeliculaDeLista={eliminarPeliculaDeLista} />
            </PublicRoutes>
          } />
          <Route path='/pelicula/:id/comentario' element={
            <PrivateRoutes>
              < FormComentarioNuevo actualizarPelicula={actualizarPelicula} listaPeliculas={listaPeliculas} />
            </PrivateRoutes>
          } />
          <Route path='/login' element={
            <PublicRoutes>
              < FormInicioSesion isLoginMode={true} />
            </PublicRoutes>
          } />
          <Route path='/register' element={
            <PublicRoutes>
              < FormInicioSesion isLoginMode={false} />
            </PublicRoutes>
          } />
        </Routes>
      </AppProvider>
    </>
  )
}

export default App;
