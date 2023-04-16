import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Cette page ne semble pas exister.</p>
            <div className="flexGrow">
                <Link to="/">Page d'accueil</Link>
            </div>
        </article>
    )
}

export default Missing