import { useState, useEffect } from "react";
import axios from '../api/axios';
import Modal from 'react-modal';

import Post from "./Post";

const LOAD_POST_URL = '/posts';

Modal.setAppElement('body');



const PublishPost = () => {

    // Au chargement de la page ... (use effect)
    useEffect(() => {
        // Récupère tous les posts publiés
        fetchPosts();

    }, []);

    
    // Usestate = au changement d'état...
    const [loadPosts, setLoadPost]=useState();
    const fetchPosts = async (e) => {
        const token = localStorage.getItem('token');
        //token permet de récupérer les élémetns sécurisés
        try {
            const response = await axios.get(LOAD_POST_URL,
                {
                    headers: {"Authorization" : `Bearer ${token}`} ,
                    withCredentials: true
                }
            );

            const posts = response.data.posts;
            setLoadPost(posts);
            console.log(posts);
        } 
        
        catch (err) {
            console.log(err);
        }
    }


    return (
        <section className="posts bg-light-grey">
            {loadPosts?.map((post) =>
            
                <Post key={post._id} post={post} />
            
            )}

        </section>
    )
}

export default PublishPost