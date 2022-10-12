import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Accueil</h1>
            <br />
            <p>Vous êtes connecté!</p>
            <br />
            <Link to="/editor">Aller à la page d'éditeur</Link>
            <br />
            <Link to="/admin">Aller à la page d'administrateur</Link>
            <br />
            <Link to="/lounge">Aller au Lounge</Link>
            <br />
            <Link to="/linkpage">Aller à la page de lien</Link>
            <div className="flexGrow">
                <button onClick={logout}>Se déconnecter</button>
            </div>
        </section>
    )
}

export default Home