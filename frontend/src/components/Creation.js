import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { faImage, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';
const CREATE_POST_URL = '/api/posts';

const CreatePost = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/create-post";

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(CREATE_POST_URL,
                JSON.stringify({ message }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
        
            setMessage('');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <section class="posts bg-light-grey">
                <div class="create-post post">
                    <form onSubmit={handleSubmit}>
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

                            <label htmlFor="message" class="create-post__text">
                                <textarea
                                    id="message"
                                    placeholder="Que voulez-vous partager ?"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    class="create-post__posttextarea"
                                    placeholder="Que voulez-vous partager ?"
                                    aria-label="Un champ de texte pour créer un post"
                                ></textarea>
                            </label>
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

 

    )
}

export default CreatePost