import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import axios from '../api/axios';
const CREATE_COMMENT_URL = '/comments';



const CreateComment = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const userId = localStorage.getItem('userId');
            const userPost = props.userPost;

            const response = await axios.post(CREATE_COMMENT_URL,
                JSON.stringify({ userId, userPost, message }),
                {
                    headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'application/json'} ,
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
        
            setMessage('');
            navigate(from, { replace: true });
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <form onSubmit={handleSubmit}>
        <div className="post-advice__comment"  >
                <label htmlFor="message" className='label-comment'>
                    <textarea
                        id="message"
                        placeholder="Ecrivez un commentaire..."
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                        className="comment-text comment-textarea"
                        aria-label="Un champ de texte pour commenter"
                    ></textarea>
                </label>
                <button
                    className="create-comment__btn"
                    type="submit"
                >
                    {/*Publier*/}
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
        </div>
            
        </form>

    )
}

export default CreateComment