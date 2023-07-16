import { useState,useEffect} from "react";
import axios from '../api/axios';
import { Routes, Route } from 'react-router-dom';

import CreateComment from "./Comment";
import PublishComment from "./PublishedComments";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LOAD_USER_URL = '/auth';


const Post = ({ post }) => {

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [liked, setLiked] = useState(post.usersLiked.includes(userId));
    const [disliked, setDisliked] = useState(post.usersDisliked.includes(userId));

    useEffect(() => {
   
        const id = localStorage.getItem('userId');
      
        if (id) {
            setUserId(id);
            getOneUser();
        }
     
    }, []);

    // Récupère l'utilisateur qui correspond à mon userId
    const getOneUser = async (e) => {
        try {
            const userId = localStorage.getItem('userId');
            const url = LOAD_USER_URL + '/' + userId;
            const response = await axios.get(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const user = response.data;
            setUser(user);
        } catch (err) {
            console.log(err);
        }
    }

    const handleLikeDislike = async (postId, like) => {
        try {
      
          const response = await axios.post(`/api/posts/${postId}/like-dislike`, {
            like,
            userId,
          });
      
          console.log(response.data.message);
          // Mettre à jour l'état ou effectue d'autres actions nécessaires suite à la mise à jour des likes/dislikes
        } catch (error) {
          console.error(error);
        }
      };
      
  
    const handleLike = () => {
      if (!liked) {
        handleLikeDislike(post._id, 1);
        setLikes(likes + 1);
        setLiked(true);
        if (disliked) {
          setDislikes(dislikes - 1);
          setDisliked(false);
        }
      } else {
        handleLikeDislike(post._id, 0);
        setLikes(likes - 1);
        setLiked(false);
      }
    };
  
    const handleDislike = () => {
      if (!disliked) {
        handleLikeDislike(post._id, -1);
        setDislikes(dislikes + 1);
        setDisliked(true);
        if (liked) {
          setLikes(likes - 1);
          setLiked(false);
        }
      } else {
        handleLikeDislike(post._id, 0);
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    };
  
    return (
      


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
                            

                                {/*dropdown menu pour effectuer des actions sur un post*/}
                                
                                { user.isAdmin === 1 || post.user[0]._id === userId ? (
                                    
                                    <DropdownMenu key={post._id} idPost={post._id} />


                                ) : null}

                            </div>

                            <div className="post-info__message">
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

                        <div className="post-advice">

                        <div className="post-advice__buttons">
                            <div class="like-dislike">
                              <p><FontAwesomeIcon icon={faThumbsUp}/> : {likes}</p>
                              <p><FontAwesomeIcon icon={faThumbsDown}/> :  {dislikes}</p>
                            </div>

                            <div class="like-dislike">
                              <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
                              <button onClick={handleDislike}>{disliked ? 'Undislike' : 'Dislike'}</button>
                            </div>
                        </div>

                            <Routes>
                                <Route path="*" element={<CreateComment userPost={post._id} />} />
                            </Routes>

                                
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


        
      
    );
  };

  export default Post;
  