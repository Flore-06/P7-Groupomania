import { useState, useEffect, useRef } from "react";
/*import { useNavigate, useLocation } from 'react-router-dom';*/
import { faThumbsUp, faThumbsDown, faComment, faUser, faEllipsisH, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';
import { Routes, Route } from 'react-router-dom';
import CreateComment from "./Comment";
import PublishComment from "./PublishedComments";
import Rating from "./Rating";

const LOAD_POST_URL = '/posts';


const PublishPost = () => {

    /*const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/publish-post";*/

    /*let userNamePost = localStorage.getItem('userNamePost');
    let userSurnamePost = localStorage.getItem('userSurnamePost');

    useEffect(() => {

        let nomPrenom = document.getElementById('user-name-posted').innerHTML= userNamePost + " " + userSurnamePost;
        console.log(nomPrenom);
    });*/

    const [loadPosts, setLoadPost]=useState();


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

    return (
        <section className="posts bg-light-grey">
            {loadPosts?.map((post) => 

                <div className="post">
                    <div>
                        <div className="post-info">
                            <div className="post-info__user">
                                <img 
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par d??faut"
                                    className="user-default-image"
                                ></img>
                                <div className="post__name-date">
                                    <p className="user-name" id="user-name-posted">{post.userName} {post.userSurname}</p>
                                    <p className="published-date">Publi?? le 19/10/2022</p>
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
                                
                                {/*<li className="texte-publi" key={post.message}>{post.message}</li>*/}
                                <p className="texte-publi">{post.message}</p>
                                <img 
                                    src={post.imageUrl}
                                    alt="??v??nement"
                                    className="post-image"
                                ></img>

                            </div>
                        </div>
                        
                        
                        <div className="post-likes">
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <FontAwesomeIcon icon={faThumbsDown} className="icone-a-droite"/>
                        </div>

                        <Routes>
                            <Route path="*" element={<Rating userPost={post._id} />} />
                        </Routes>  

                        <div className="post-advice">
                            <div className="post-advice__buttons">
                                <label htmlFor="myLike" className="advice-buttons">
                                    <FontAwesomeIcon icon={faThumbsUp} className="icone-a-gauche icone-contour"/>
                                    J'aime
                                </label>
                                <label htmlFor="myLike" className="advice-buttons">
                                    <FontAwesomeIcon icon={faThumbsDown} className="icone-a-gauche icone-contour"/>
                                    Je n'aime pas
                                </label>
                                <label htmlFor="myComment" className="advice-buttons">
                                    <FontAwesomeIcon icon={faComment} className="icone-a-gauche icone-contour"/>
                                    Commenter
                                </label>
                            </div>

                            <Routes>
                                <Route path="*" element={<CreateComment userPost={post._id} />} />
                            </Routes>

                            <Routes>
                                <Route path="*" element={<PublishComment />} />
                            </Routes>                   
                        
                        </div>
                    </div>                      
                </div>

            )}
        </section>

    )
}

/*Cr??ation de la fonction dropdown menu*/
function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            {/*<icon src={props.icon}></icon>*/}
            <a> {props.text} </a>
        </li>
    );
}

export default PublishPost