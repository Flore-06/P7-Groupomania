import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import axios from '../api/axios';

const Rating = props => {
  
  const [isLiked, updateLike] = useState(false);
  const handleLike = async() => {

    

    try {
        const userId = localStorage.getItem('userId');
        const userPost = props.userPost;

        let url = "/posts/" + userPost + "/like";
        let like = 0;

        if (!isLiked) {
          updateLike(true);
          if (like === 1) {like = 0}
          else {like = 1}
        }
        
        else {
          updateLike(false);
          if (like === -1) {like = 0}
          else {like = -1}
        };

        const response = await axios.post(url,
            JSON.stringify({ userId, userPost, like }),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
    } 
    
    catch (err) {
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
      <p>Vous {isLiked ? "aimez" : "n'aimez pas"} ce post</p>

      <hr />
    </div>
  );
};
export default Rating;