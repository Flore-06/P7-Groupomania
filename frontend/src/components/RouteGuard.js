import React from 'react';
import { Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //si non authentifié, rediriger vers page de login    
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;