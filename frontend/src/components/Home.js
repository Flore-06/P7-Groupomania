import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

import { useState, useEffect, useRef } from "react";

import AuthContext from "../context/AuthProvider";
import { faRightFromBracket, faThumbsUp, faThumbsDown, faComment, faUser, faHome, faEllipsisH, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes, Route } from 'react-router-dom';
import CreatePost from '../components/Creation';


import axios from '../api/axios';
const LOAD_POST_URL = '/posts';


const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    

    /*Pour fermer le Dropdown menu*/
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    useEffect(() => {
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
                console.log(menuRef.current);
            }
        };
        document.addEventListener("mousedown", handler);
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });

    /* Pour se déconnecter */
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }


    /* Test pour vérifier le bon embriquement du code pour afficher les posts*/
    const data =[{"name":"test1"},{"name":"test2"}];
    const loadPosts = data.map((d) => <li key={d.name}>{d.name}</li>);


    /*const loadPosts = async (e) => {
        try {
            const response = await axios.post(LOAD_POST_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
        
        } catch (err) {
            console.log(err);
        }
    }*/

    return (
        <main class="light-background">
            <div class="navbar">
                    <a aria-label="Home" class="active" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faHome}/></a>
                    <a aria-label="Administrateur" href="/admin" style={{width:'34%'}}><FontAwesomeIcon icon={faUser}/></a>
                    <a aria-label="Déconnexion" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faRightFromBracket}/></a>
            </div>

            <section class="bg-light-grey section-bienvenue">
                <h1>Bienvenue sur le Réseau Social de</h1>
                <img class="logo-groupomania" src='/logo-rouge-centre-groupomania.png' alt='logo de Groupomania'></img>
                <br />
                <div className="flexGrow">
                    <button onClick={logout}>
                        Se déconnecter
                        <FontAwesomeIcon icon={faRightFromBracket} className="icone-a-droite"/>
                    </button>
                </div>
            </section>

            <Routes>
                <Route path="*" element={<CreatePost />} />
            </Routes>

            <section class="posts bg-light-grey">
                <div>
                    {loadPosts}
                </div>

                <p ngIf="!loading && posts.length <= 0">
                    Aucun post publié !
                </p>


                <div class="post" ngIf="!loading && posts.length  > 0">
                    <div>
                        <div class="post-info">
                            <div class="post-info__user">
                                <img 
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par défaut"
                                    class="user-default-image"
                                ></img>
                                <div class="post__name-date">
                                    <p class="user-name">Prénom Nom {/*{ user.name, user.surname }*/}</p>
                                    <p class="published-date">Publié le 19/10/2022</p>
                                </div>
                            

                                {/*dropdown menu pour effectuer des actions sur un post*/}
                                <div className='menu-container' ref={menuRef}>
                                    <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                                        <FontAwesomeIcon
                                            icon={faEllipsisH}
                                            className="icone-params-posts"
                                            aria-label="Actions pour cette publication"
                                        />
                                    </div>

                                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                                        <ul>
                                            <DropdownItem icon = {faPenToSquare} text = {"Modifier le post"}/>
                                            <DropdownItem icon = {faTrash} text = {"Supprimer le post"}/>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div class="post-info__message">
                                <p class="texte-publi">
                                    {/*{ post.message }*/}
                                </p>
                                
                                <img 
                                    src="post.imageUrl"
                                    alt="Êvènement de la publication"
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
                                        <p class="comment-user-name">Prénom Nom {/*{ user.name, user.surname }*/}</p>
                                        <p class="published-date">Publié le 19/10/2022</p>
                                    </div>
                                </div>
                                
                                <p class="comment-text">Les commentaires sont ici</p>
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
                            

                                {/*dropdown menu pour effectuer des actions sur un post*/}
                                <div className='menu-container' ref={menuRef}>
                                    <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                                        <FontAwesomeIcon
                                            icon={faEllipsisH}
                                            className="icone-params-posts"
                                            aria-label="Actions pour cette publication"
                                        />
                                    </div>

                                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                                        <ul>
                                            <DropdownItem icon = {faPenToSquare} text = {"Modifier le post"}/>
                                            <DropdownItem icon = {faTrash} text = {"Supprimer le post"}/>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div class="post-info__message">
                                <p class="texte-publi">
                                    Hey voici un modèle de publication !
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
            </section>
        </main>
        
    );

    
}

/*Création de la fonction dropdown menu*/
function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            <icon src={props.icon}></icon>
            <a> {props.text} </a>
        </li>
    );
}

export default Home