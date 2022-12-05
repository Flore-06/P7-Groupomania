import { useState, useEffect, useRef } from "react";
/*import { useNavigate, useLocation } from 'react-router-dom';*/
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';

const LOAD_COMMENT_URL = '/comments';

const PublishComment = () => {

    /*const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/publish-post";*/

    const [loadComments, setLoadComment]=useState();
    const fetchComments = async (e) => {
        try {
            
            const response = await axios.get(LOAD_COMMENT_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const comments = response.data;

            setLoadComment(comments);
            //console.log(JSON.stringify(response?.data));
            console.log(comments);
        
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchComments();
      }, []);

 

    return (
        <div>
            {loadComments?.map((comment) => 

                <div className="advice__comment"  >
                    <div className="comment-info__user">
                        <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                        <div className="comment__name-date">
                            <p className="comment-user-name">Prénom Nom</p>
                        </div>
                    </div>
                    <p className="comment-text">{comment.message}</p>
                </div>
            )}

        
            {/*<div className="post-advice__comment"  >
                <div className="comment-info__user">
                    <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                    <div className="comment__name-date">
                        <p className="comment-user-name">Prénom Nom</p>
                    </div>
                </div>
                <p className="comment-text">This is my comment</p>
            </div>    

            <div className="post-advice__comment"  >
                <div className="comment-info__user">
                    <FontAwesomeIcon icon={faUser} className="icone-a-gauche icone-contour"/>
                    <div className="comment__name-date">
                        <p className="comment-user-name">Prénom Nom</p>
                    </div>
                </div>
                <p className="comment-text">Génial !</p>
            </div>*/}
        </div>

    )
}

export default PublishComment