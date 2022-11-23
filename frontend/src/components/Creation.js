import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { faImage, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DayJS from 'react-dayjs';

import axios from '../api/axios';
const CREATE_POST_URL = '/posts';

const CreatePost = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/create-post";

    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    const userId = localStorage.getItem('userId');
    /*let userName = JSON.parse(localStorage.getItem('username'));*/
    let userName = localStorage.getItem('userName');
    let userSurname = localStorage.getItem('userSurname');
    console.log("est passé par là");
    console.log(userName);

    useEffect(() => {

        let nomPrenom = document.getElementById('user-name-create-post').innerHTML= userName + " " + userSurname;
        console.log(nomPrenom);
    });


    //document.getElementById('user-name-create-post').innerHTML= userName;

    /*let publishedDate = DayJS().format();*/

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image);
        
        const formData = new FormData();
        
        formData.append("userId", JSON.stringify(userId));
        formData.append("userName", JSON.stringify(userName));
        formData.append("userSurname", JSON.stringify(userSurname));
        /*formData.append("publishedDate", JSON.stringify(publishedDate));*/
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
                                    <p className="user-name" id="user-name-create-post">Prénom Nom</p>
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
                            <label htmlFor="image" className='label-image-upload'>
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