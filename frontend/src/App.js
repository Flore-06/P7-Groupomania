import Register from './components/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Profil from './pages/Profil';
import Profilajour from './components/ConfirmationModifProfil';
import Missing from './pages/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import CreatePost from './components/Creation';
import PublishPost from './components/PublishedPosts';
import CreateComment from './components/Comment';
import PublishComment from './components/PublishedComments';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="header" element={<Header />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="publish-post" element={<PublishPost />} />
        <Route path="create-comment" element={<CreateComment />} />
        <Route path="publish-comment" element={<PublishComment />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        
        <Route path="profil-user" element={<Profil />} />
        <Route path="confirmation-modification-profil" element={<Profilajour />} />

        {/* we want to protect these routes */}
        <Route path="/" element={<Home />} />

        {/*<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;