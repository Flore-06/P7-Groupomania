import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

            const response = await axios.post(CREATE_COMMENT_URL,
                JSON.stringify({ userId, message }),
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
            <div className="comment-info__user">
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
            </div>
        </div>
            
        </form>

    )
}

export default CreateComment