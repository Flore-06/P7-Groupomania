import { useState, useEffect, useRef } from "react";
/*import { useNavigate, useLocation } from 'react-router-dom';*/
import { faThumbsUp, faThumbsDown, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';
import { Routes, Route } from 'react-router-dom';
import CreateComment from "./Comment";
import PublishComment from "./PublishedComments";
import Rating from "./Rating";
import DropdownMenuPost from "./DropdownMenuPost";

const LOAD_POST_URL = '/posts';


const PublishPost = () => {

    const [loadPosts, setLoadPost]=useState();
    const fetchPosts = async (e) => {
        try {
            
            const response = await axios.get(LOAD_POST_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const posts = response.data.posts;

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
        <section className="posts bg-light-grey">
            {loadPosts?.map((post) =>
            

                <div className="post">
                    <div>
                        <div className="post-info">
                            <div className="post-info__user">
                                <img 
                                    src={post.user[0].imageUrl}
                                    alt="icone utilisateur"
                                    className="user-default-image"
                                ></img>
                                <div className="post__name-date">
                                    <p className="user-name" id="user-name-posted">{post.user[0].name} {post.user[0].surname}</p>
                                    <p className="published-date">Publié le {new Date(post.publishedDate).toLocaleDateString("fr")} {new Date(post.publishedDate).getUTCHours()}</p>
                                </div>
                            
                                {<DropdownMenuPost userPost={post._id} />}
                                

                            </div>

                            <div className="post-info__message">
                                
                                {/*<li className="texte-publi" key={post.message}>{post.message}</li>*/}
                                <p className="texte-publi">{post.message}</p>
                                
                                
                                {
                                post.imageUrl !== "none" && 
                                    <img 
                                    src={post.imageUrl}
                                    alt="évènement"
                                    className="post-image"
                                ></img>
                                
                                }
                                


                            </div>
                        </div>
                        
                        
                        {/*<div className="post-likes">
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <FontAwesomeIcon icon={faThumbsDown} className="icone-a-droite"/>
                            </div>*/}

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

            
                            
                                
                            {/*post.comments?.map((comment) => (
                                <Routes>
                                <Route path="*" element={<PublishComment comment={comment} />} />
                                </Routes>   
                            ))*/}
                                
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <Routes>
                                    <Route path="*" element={<PublishComment comment={comment} />} />
                                    </Routes>
                                ))
                            ) : (
                                <p className="message-aucun-com">Aucun commentaire à afficher.</p>
                            )}

                            
                            
                                            
                        
                        </div>
                    </div>                      
                </div>
            
            )}
        </section>

    )
}



export default PublishPost