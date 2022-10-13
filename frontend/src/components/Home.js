import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { faRightFromBracket, faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <main class="light-background">
            <section>
                <h1>Accueil</h1>
                <br />
                <p>Vous êtes connecté !</p>
                <br />
                <Link to="/editor">Aller à la page d'éditeur</Link>
                <br />
                <Link to="/admin">Aller à la page d'administrateur</Link>
                <br />
                <Link to="/lounge">Aller au Lounge</Link>
                <br />
                <Link to="/linkpage">Aller à la page de lien</Link>
                <div className="flexGrow">
                    <button onClick={logout}>
                        Se déconnecter
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                </div>
            </section>

            <section class="create-post post">
                <form>
                    <div class="create-post__div">
						<div class="create-post__user-image">
                            <img 
                                src="../../public/default-user-image.png"
                                alt="icone utilisateur par défaut"
                            ></img>
                        </div>

                        <div class="create-post__message">
                            <textarea
                                class="create-post__posttextarea"
                                v-model="myText"
                                placeholder="Que voulez-vous partager ?"
                                aria-label="Un champ de texte pour créer un post"
                            ></textarea>
                        </div>
					</div>
					
					
					<div class="create-post__div create-post__fileinput">
						<label for="myImage"
							>Télécharger un fichier
							<FontAwesomeIcon icon={faImage} />
							<input
								type="file"
								id="myImage"
								change="onFileChange"
							/>
						</label>
						<button
							class="create-post__btn"
							type="submit"
						>
							Publier
                            <FontAwesomeIcon icon={faPaperPlane} />
						</button>
					</div>
				</form>
            </section>
        </main>
        
    )
}

export default Home