import { useState, useEffect, useRef } from "react";
import axios from '../api/axios';


const DeletePost = props => {



    const [deletePosts, setDeletePost]=useState();
    const deletePosts = async (e) => {
        try {
            const userId = localStorage.getItem('userId');
            const id = props.userPost;
            const DELETE_POST_URL = '/posts/' + userPost;
            const response = await axios.delete(DELETE_POST_URL,
                JSON.stringify({ userId, id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

        } catch {

        }
    }


}