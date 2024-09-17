import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppProvider";
import { useContext } from 'react';


const NavBar = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);

  //Se ejecuta al cerrar sesion 
  const processLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    setState({
      user: null,
      isAuthenticated: false,
    });

    navigate("/");
  };

  return (
    <>
      <nav className="header">
        <h1 onClick={() => navigate("/")} className='title-page'> Moldy tomatoes </h1>

        {!state.isAuthenticated && (
          <div className="link-container">
            {/* Enlaces para login y registro. Si no estas autenticado se muestran estos links */}
            <Link to='/login' className='link-sesion'>Iniciar Sesión</Link>
            <Link to='/register' className='link-sesion'> Registrarse</Link>
          </div>
        )}
        {/* Si estás autenticado (state.isAuthenticated) se muestra el boton "Cerrar Sesión". */}
        {state.isAuthenticated && (
          <>
            <div className='link-sesion' onClick={processLogout}>
              Cerrar Sesión
            </div>
          </>
        )}
      </nav>

    </>
  )
}


export default NavBar;