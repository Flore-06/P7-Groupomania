import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Liens</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Se connecter</Link>
            <Link to="/register">S'inscrire</Link>
            <br />
            <h2>Privé</h2>
            <Link to="/">Accueil</Link>
            <Link to="/editor">Page d'éditeur</Link>
            <Link to="/admin">Page d'adminisatrateur</Link>
        </section>
    )
}

export default LinkPage