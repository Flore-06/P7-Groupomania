import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { faImage, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import DayJS from 'react-dayjs';

import axios from '../api/axios';
const CREATE_POST_URL = '/posts';
const LOAD_USER_URL = '/auth';

const CreatePost = () => {
    
    

    const navigate = useNavigate();
    const location = useLocation();
    /*const from = location.state?.from?.pathname || "/create-post";*/
    const from = location.state?.from?.pathname || "/";

    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    
    const [userName, setUsername] = useState('');
    const [userSurname, setUsersurname] = useState('');
    const [userImg, setImgname] = useState('');
    const userId = localStorage.getItem('userId');

    const fetchUsers = async (e) => {
        try {
            
            const url = LOAD_USER_URL + '/' + userId;
            const response = await axios.get(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const user = response.data;

            console.log(user);
            setUsername(user.name.replace(/"/g, ''));
            setUsersurname(user.surname.replace(/"/g, ''));
            setImgname(user.imageUrl);


        
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers(); 
    }, []);

    useEffect(() => {

        let nomPrenom = document.getElementById('user-name-create-post').innerHTML= userName + " " + userSurname;
        console.log(nomPrenom);
        console.log(userName);
    });


    //document.getElementById('user-name-create-post').innerHTML= userName;

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image);
        
        const formData = new FormData();
        
        formData.append("userId", JSON.stringify(userId));
        //formData.append("userImg", userImageFile);
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
                            src={userImg}
                            alt="icone admin"
                            className="user-default-image"
                        ></img>
                        
                                <div className="post__name-date">
                                    <p className="user-name" id="user-name-create-post"></p>
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