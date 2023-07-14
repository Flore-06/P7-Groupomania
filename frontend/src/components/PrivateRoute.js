import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ path, element }) => {
  //Vérifie si token authentifié
  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    return <Outlet /> ;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
