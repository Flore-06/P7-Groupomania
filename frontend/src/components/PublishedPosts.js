import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { faRightFromBracket, faThumbsUp, faThumbsDown, faComment, faUser, faHome, faEllipsisH, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';

const PublishPost = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/publish-post";

    return (
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
    )
}

export default PublishPost