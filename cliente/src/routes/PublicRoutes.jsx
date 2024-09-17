// import { Navigate } from "react-router-dom";

// export const PublicRoutes = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? <Navigate to="/" /> : children;
// };

import { Navigate, useLocation } from "react-router-dom";

export const PublicRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Redirige solo si el usuario está autenticado y trata de acceder a /login o /register
  if (token && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" />;
  }

  // Si no está autenticado o la ruta no es /login ni /register, permite el acceso
  return children;
};


