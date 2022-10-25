import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

        <section class="row">
            
            <div class="column dark-image-background column_image-title">
                <p class="groupomania-title">Le Réseau Social de</p>
                <img class="logo-groupomania-1-2" src='/logo-blanc-centre-groupomania.png' alt='logo de Groupomania'></img>
            </div>

            <div class="column column_form">
                <h1 class="form-title">Publier</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="message">Message :</label>
                    <textarea
                        id="message"
                        placeholder="Que voulez-vous partager ?"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                    />

                    <button>Publier</button>
                </form>
                
            </div>
            
            
        </section>

    )
}

export default CreatePost