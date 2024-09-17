import axios from "axios";
import { AppContext } from "../../context/AppProvider";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const FormInicioSesion = ({ isLoginMode }) => { //si el false es modo Registro si es true es modo Login
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { state, setState } = useContext(AppContext);

  const navigate = useNavigate();

  //Conexion con la base de datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si es modo de registro, verificar que las contraseñas coincidan
    if (!isLoginMode) {
      // Modo Registro
      if (password !== confirmPassword) {
        setError("*Las contraseñas no coinciden*");
        return;
      }

      try {
        const newUser = {
          name,
          lastName,
          email,
          password,
        };
        const URL = "http://localhost:8080/user/new";
        const response = await axios.post(URL, newUser);

        // Guardar token en localStorage si es exitoso
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user)); // Asegúrate de que esto coincida
          setState({
            ...state,
            user: response.data.user,
            isAuthenticated: true,
          });
        }

        navigate("/");
      } catch (error) {
        console.log("Error en el registro", error);
      }
    } else {
      // Modo Inicio de Sesión
      try {
        const loginUser = {
          email,
          password,
        };
        const URL = "http://localhost:8080/user/login";
        const response = await axios.post(URL, loginUser);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.userFound));
        localStorage.setItem("isAuthenticated", "true");

        setState({
          ...state,
          user: response.data.userFound,
          isAuthenticated: true,
        });
        navigate("/");

      } catch (error) {
        console.log("Error en el inicio de sesión", error);
      }
    }
  };

  return (
    <div className="contenedor-sesion">
      <form onSubmit={handleSubmit}>
        <h4>{isLoginMode ? "Iniciar Sesión" : "Registrarse"}</h4>

        {/* Mostrar campos adicionales solo si es registro */}
        {!isLoginMode && (
          <>
            <div className="inputs">
              <label htmlFor="nombre">Nombre</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="apellido">Apellido</label>
              <input
                className="input"
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="inputs">
          <label htmlFor="password">Contraseña</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Campo de confirmación de contraseña solo en modo registro */}
        {!isLoginMode && (
          <div className="inputs">
            <label htmlFor="conf-password">Confirmar contraseña</label>
            <input
              className="input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-agregar">
          {isLoginMode ? "Iniciar Sesión" : "Registrarse"}
        </button>
        <button type="button" onClick={() => navigate(`/`)}>
          Cancelar
        </button>
        <p className="links-conditional">
          {isLoginMode ? (
            <>
              ¿Aún no tienes una cuenta?{" "}
              <Link to='/register'>Registrarse</Link>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <Link to='/login'>Iniciar Sesión</Link>
            </>
          )}
        </p>
      </form>
    </div >
  );
}

export default FormInicioSesion;