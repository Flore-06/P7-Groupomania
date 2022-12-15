import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import axios from '../api/axios';

const LIKE_DISLIKE_URL = '/:id/like';

const Rating = props => {
  
  const [isLiked, updateLike] = useState(false);
  const handleLike = async() => {

    if (!isLiked) {
      updateLike(true);
      let like = 1;
      
    } else {
      updateLike(false);
      let like = -1;
      
    }

    try {
        const userId = localStorage.getItem('userId');
        const userPost = props.userPost;


        const response = await axios.post(LIKE_DISLIKE_URL,
            JSON.stringify({ userId, userPost, like }),
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

  };
  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          paddingTop: 10
         }}
      >
        <button
          onClick={handleLike}
          disabled={isLiked}
          >
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ paddingRight: 5 }}
          />
        </button>
        <button
          onClick={handleLike}
          disabled={!isLiked}
          >
          <FontAwesomeIcon
            icon={faThumbsDown}
            style={{ paddingLeft: 5 }}
            />
        </button>
      </div>
      <p>You {isLiked ? "liked" : "disliked"} </p>

      <hr />
    </div>
  );
};
export default Rating;