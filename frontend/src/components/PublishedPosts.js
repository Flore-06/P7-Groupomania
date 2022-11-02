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
        {loadPosts.map((post) => 

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
                            
                            <li class="texte-publi" key={post.message}>{post.message}</li>
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

        )}
    )
}

export default PublishPost