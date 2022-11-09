import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { faImage, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';
const CREATE_POST_URL = '/posts';

const CreatePost = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/create-post";

    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image);
        
        const formData = new FormData();
        
        formData.append("userId", JSON.stringify(userId));
        formData.append("message", JSON.stringify(message));
        formData.append("image", image);

        try {

            const response = await axios.post(CREATE_POST_URL,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
        
            setMessage('');
            setImage('');
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <section className="posts bg-light-grey">
                <div className="create-post post">
                    <form onSubmit={handleSubmit}>
                        <div className="post-info create-post__message">
                            <div className="post-info__user">
                                <img 
                                    src="/default-user-icon.png"
                                    alt="icone utilisateur par défaut"
                                    className="user-default-image"
                                ></img>
                                <div className="post__name-date">
                                    <p className="user-name">Prénom Nom</p>
                                </div>                                
                            </div>

                            <label htmlFor="message" className="create-post__text">
                                <textarea
                                    id="message"
                                    placeholder="Que voulez-vous partager ?"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    className="create-post__posttextarea"
                                    aria-label="Un champ de texte pour créer un post"
                                ></textarea>
                            </label>
                        </div>
                        
                        
                        <div className="create-post__div create-post__fileinput">
                            <label htmlFor="image">
                                <div className="icone-new-add-file">
                                <FontAwesomeIcon icon={faPlus} className="icone-a-droite icone-new-add-file"/>
                                <FontAwesomeIcon icon={faImage} className="icone-a-droite icone-new-add-file"/>
                                </div>
                                
                                <input
                                    type="file"
                                    id="image"
                                    className="default-css-add-file"
                                    change="onFileChange"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </label>
                            <button
                                className="create-post__btn"
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