import React from 'react';
import {Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Register from './components/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import Profil from './pages/Profil';
import Profilajour from './components/ConfirmationModifProfil';
import Missing from './pages/Missing';

import CreatePost from './components/Creation';
import PublishPost from './components/PublishedPosts';
import CreateComment from './components/Comment';
import PublishComment from './components/PublishedComments';

const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />


      <Route exact path='/' element={<PrivateRoute/>}>
        <Route exact path='/' element={<Home/>}/>
      </Route>

      
    
      <Route path="create-post" element={<CreatePost />} />
      <Route path="publish-post" element={<PublishPost />} />
      <Route path="create-comment" element={<CreateComment />} />
      <Route path="publish-comment" element={<PublishComment />} />

      

      <Route path="profil-user" element={<Profil />} />
      <Route
        path="confirmation-modification-profil"
        element={<Profilajour />}
      />


      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};

export default App;
