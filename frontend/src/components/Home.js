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

    const [loadPosts, setLoadPost]=useState();

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


    /* Test pour vérifier le bon embriquement du code pour afficher les posts
    const data =[{"name":"test1"},{"name":"test2"}];
    const loadPosts = data.map((d) => <li key={d.name}>{d.name}</li>);*/


    const fetchPosts = async (e) => {
        try {
            
            const response = await axios.get(LOAD_POST_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const posts = response.data;

            setLoadPost(posts);
            //console.log(JSON.stringify(response?.data));
            console.log(posts);
        
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPosts();
      }, []);




    return (
        <main className="light-background">
            <div className="navbar">
                    <a aria-label="Home" className="active" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faHome}/></a>
                    <a aria-label="Administrateur" href="/admin" style={{width:'34%'}}><FontAwesomeIcon icon={faUser}/></a>
                    <a aria-label="Déconnexion" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faRightFromBracket}/></a>
            </div>

            <section className="bg-light-grey section-bienvenue">
                <h1>Bienvenue sur le Réseau Social de</h1>
                <img className="logo-groupomania" src='/logo-rouge-centre-groupomania.png' alt='logo de Groupomania'></img>
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

            <section className="posts bg-light-grey">

        
                {loadPosts?.map((post) => 

                    <div className="post">
                        <div>
                            <div className="post-info">
                                <div className="post-info__user">
                                    <img 
                                        src="/default-user-icon.png"
                                        alt="icone utilisateur par défaut"
                                        className="user-default-image"
                                    ></img>
                                    <div className="post__name-date">
                                        <p className="user-name">Prénom Nom</p>
                                        <p className="published-date">Publié le 19/10/2022</p>
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

                                <div className="post-info__message">
                                    
                                    <li className="texte-publi" key={post.message}>{post.message}</li>
                                    <img 
                                        src="/reunion.jpg"
                                        alt="reunion Groupomania 19/10/2022"
                                        className="post-image"
                                    ></img>

                                </div>
                            </div>
                            
                            
                            <div className="post-likes">
                            <FontAwesomeIcon icon={faThumbsUp}/>
                            <FontAwesomeIcon icon={faThumbsDown} className="icone-a-droite"/>
                            </div>

                            <div className="post-advice">
                                <div className="post-advice__buttons">
                                    <label htmlFor="myLike">
                                        <FontAwesomeIcon icon={faThumbsUp} className="icone-a-gauche icone-contour"/>
                                        J'aime
                                    </label>
                                    <label htmlFor="myLike">
                                        <FontAwesomeIcon icon={faThumbsDown} className="icone-a-gauche icone-contour"/>
                                        Je n'aime pas
                                    </label>
                                    <label htmlFor="myComment">
                                        <FontAwesomeIcon icon={faComment} className="icone-a-gauche icone-contour"/>
                                        Commenter
                                    </label>
                                </div>

                                <div className="post-advice__comment"  >
                                    <div className="comment-info__user">
                                        <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                                        <div className="comment__name-date">
                                            <p className="comment-user-name">Prénom Nom</p>
                                            <p className="published-date">Publié le 19/10/2022</p>
                                        </div>
                                    </div>
                                    
                                    <p className="comment-text">This is my comment</p>
                                </div>    
                                <div className="post-advice__comment"  >
                                    <div className="comment-info__user">
                                        <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                                        <div className="comment__name-date">
                                            <p className="comment-user-name">Prénom Nom</p>
                                            <p className="published-date">Publié le 20/10/2022</p>
                                        </div>
                                    </div>
                                    
                                    <p className="comment-text">Génial !</p>
                                </div>                         
                            
                            </div>
                        </div>                      
                    </div>

                )}
                
            </section>
        </main>
        
    );

    
}

/*Création de la fonction dropdown menu*/
function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            {/*<icon src={props.icon}></icon>*/}
            <a> {props.text} </a>
        </li>
    );
}

export default Home