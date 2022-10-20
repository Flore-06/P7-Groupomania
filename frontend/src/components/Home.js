import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { faRightFromBracket, faImage, faPaperPlane, faThumbsUp, faThumbsDown, faComment, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
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
            <section class="bg-light-grey">

                <div class="icon-bar">
                    <a class="active" href="/"><FontAwesomeIcon icon={faHome}/></a>
                    <a href="/editor"><FontAwesomeIcon icon={faUser}/></a>
                    <a onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/></a>
                </div>

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
                        <FontAwesomeIcon icon={faRightFromBracket} className="icone-a-droite"/>
                    </button>
                </div>
            </section>

            <section class="posts bg-light-grey">
                <div class="create-post post">
                    <form>
                        <div class="create-post__div create-post__message">
                            <div class="create-post__user-image">
                                <img 
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par défaut"
                                ></img>
                            </div>

                            <div class="create-post__text">
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
                                <FontAwesomeIcon icon={faImage} className="icone-a-droite"/>
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
                                <FontAwesomeIcon icon={faPaperPlane} className="icone-a-droite"/>
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section class="posts bg-light-grey">
                <div class="post">
                    <div>
                        <div class="post-info">
                            <div class="post-info__user">
                                <img 
                                    src="../../public/default-user-image.png"
                                    alt="icone utilisateur par défaut"
                                    class="user-default-image"
                                ></img>
                                <div class="post__name-date">
                                    <p class="user-name">Prénom Nom</p>
                                    <p class="published-date">Publié le 19/10/2022</p>
                                </div>
                                
                            </div>

                            <div class="post-info__message">
                                <p class="texte-publi">
                                    Hey voici un exemple de publication !
                                </p>
                                <img 
                                    src="../../public/reunion.jpg"
                                    alt="reunion Groupomania 19/10/2022"
                                    class="post-image"
                                ></img>

                            </div>
                        </div>
                        
                        
                        <div class="post-likes">
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <FontAwesomeIcon icon={faThumbsDown} className="icone-a-droite"/>
                        </div>

                        <div class="post-advice">
                            <div class="post-advice__buttons">
                                <label for="myLike">
                                    <FontAwesomeIcon icon={faThumbsUp} className="icone-a-gauche icone-contour"/>
                                    J'aime
                                </label>
                                <label for="myLike">
                                    <FontAwesomeIcon icon={faThumbsDown} className="icone-a-gauche icone-contour"/>
                                    Je n'aime pas
                                </label>
                                <label for="myComment">
                                    <FontAwesomeIcon icon={faComment} className="icone-a-gauche icone-contour"/>
                                    Commenter
                                </label>
                            </div>

                            <div class="post-advice__comment"  >
                                <div class="comment-info__user">
                                    <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                                    <div class="comment__name-date">
                                        <p class="comment-user-name">Prénom Nom</p>
                                        <p class="published-date">Publié le 19/10/2022</p>
                                    </div>
                                </div>
                                
                                <p class="comment-text">This is my comment</p>
                            </div>    
                            <div class="post-advice__comment"  >
                                <div class="comment-info__user">
                                    <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                                    <div class="comment__name-date">
                                        <p class="comment-user-name">Prénom Nom</p>
                                        <p class="published-date">Publié le 20/10/2022</p>
                                    </div>
                                </div>
                                
                                <p class="comment-text">Génial !</p>
                            </div>                         
                        
                        </div>
                    </div>
                </div>


                <div class="post">
                    <div>
                        <div class="post-info">
                            <div class="post-info__user">
                                <img 
                                    src="../../public/default-user-image.png"
                                    alt="icone utilisateur par défaut"
                                    class="user-default-image"
                                ></img>
                                <div class="post__name-date">
                                    <p class="user-name">Prénom Nom</p>
                                    <p class="published-date">Publié le 19/10/2022</p>
                                </div>
                                
                            </div>

                            <div class="post-info__message">
                                <p class="texte-publi">
                                    Et voilà ma deuxième publication 😀
                                </p>
                                <img 
                                    src="../../public/conference.jpg"
                                    alt="conference sur le marketing 20/10/2022"
                                    class="post-image"
                                ></img>

                            </div>
                        </div>
                        
                        
                        <div class="post-likes">
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <FontAwesomeIcon icon={faThumbsDown} className="icone-a-droite"/>
                        </div>

                        <div class="post-advice">
                            <div class="post-advice__buttons">
                                <label for="myLike">
                                    <FontAwesomeIcon icon={faThumbsUp} className="icone-a-gauche icone-contour"/>
                                    J'aime
                                </label>
                                <label for="myLike">
                                    <FontAwesomeIcon icon={faThumbsDown} className="icone-a-gauche icone-contour"/>
                                    Je n'aime pas
                                </label>
                                <label for="myComment">
                                    <FontAwesomeIcon icon={faComment} className="icone-a-gauche icone-contour"/>
                                    Commenter
                                </label>
                            </div>                       
                        
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
    )
}

export default Home