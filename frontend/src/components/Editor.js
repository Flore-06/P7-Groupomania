import { Link } from "react-router-dom"

const Editor = () => {
    return (
        <section>
            <h1>Page éditeur</h1>
            <br />
            <p>Vous devez avoir reçu un rôle d'éditeur.</p>
            <div className="flexGrow">
                <Link to="/">Accueil</Link>
            </div>
        </section>
    )
}

export default Editor