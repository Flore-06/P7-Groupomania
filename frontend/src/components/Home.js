import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { faRightFromBracket, faImage, faPaperPlane, faThumbsUp, faThumbsDown, faComment, faUser, faHome, faEllipsisH, faPlus } from "@fortawesome/free-solid-svg-icons";
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
                    <a aria-label="Home" class="active" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faHome}/></a>
                    <a aria-label="Administrateur" href="/editor" style={{width:'34%'}}><FontAwesomeIcon icon={faUser}/></a>
                    <a aria-label="Déconnexion" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faRightFromBracket}/></a>
                </div>

                <h1>Bienvenue sur le Réseau Social de</h1>
                <img class="logo-groupomania" src='/logo-blanc-centre-groupomania.png' alt='logo de Groupomania'></img>
                <br />
                <Link to="/editor">Aller à la page d'éditeur</Link>
                <br />
                <Link to="/admin">Aller à la page d'administrateur</Link>
                <br />
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
                        <div class="post-info create-post__message">
                            <div class="post-info__user">
                                <img 
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par défaut"
                                    class="user-default-image"
                                ></img>
                                <div class="post__name-date">
                                    <p class="user-name">Prénom Nom</p>
                                </div>                                
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
                            <label for="myImage">
                                <div class="icone-new-add-file">
                                <FontAwesomeIcon icon={faPlus} className="icone-a-droite icone-new-add-file"/>
                                <FontAwesomeIcon icon={faImage} className="icone-a-droite icone-new-add-file"/>
                                </div>
                                
                                <input
                                    type="file"
                                    id="myImage"
                                    class="default-css-add-file"
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
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par défaut"
                                    class="user-default-image"
                                ></img>
                                <div class="post__name-date">
                                    <p class="user-name">Prénom Nom</p>
                                    <p class="published-date">Publié le 19/10/2022</p>
                                </div>
                                
                                <FontAwesomeIcon
                                    icon={faEllipsisH}
                                    className="icone-params-posts"
                                    aria-label="Actions pour cette publication"
                                    aria-haspopup="menu"
                                />
                            </div>

                            <div class="post-info__message">
                                <p class="texte-publi">
                                    Hey voici un exemple de publication !
                                </p>
                                <img 
                                    src="/reunion.jpg"
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
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par défaut"
                                    class="user-default-image"
                                ></img>
                                <div class="post__name-date">
                                    <p class="user-name">Prénom Nom</p>
                                    <p class="published-date">Publié le 19/10/2022</p>
                                </div>
                                
                                <FontAwesomeIcon icon={faEllipsisH} className="icone-params-posts"/>
                            </div>

                            <div class="post-info__message">
                                <p class="texte-publi">
                                    Et voilà ma deuxième publication 😀
                                </p>
                                <img 
                                    src="/conference.jpg"
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