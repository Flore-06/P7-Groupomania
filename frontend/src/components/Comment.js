import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import axios from '../api/axios';
const CREATE_COMMENT_URL = '/comment';

const CreateComment = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/create-comment";

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = localStorage.getItem('userId');
            const userPost = localStorage.getItem('userPost');

            const response = await axios.post(CREATE_COMMENT_URL,
                JSON.stringify({ userId, userPost, message }),
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
                    className="create-post__btn"
                    type="submit"
                >
                    Publier
                    <FontAwesomeIcon icon={faPaperPlane} className="icone-a-droite"/>
                </button>
        </div>
            
        </form>

    )
}

export default CreateComment