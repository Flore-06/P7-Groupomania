import { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

/*import { useNavigate, useLocation } from 'react-router-dom';*/
import { faThumbsUp, faThumbsDown, faComment, faEllipsisH, faPenToSquare, faTrash, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from '../api/axios';
import { Routes, Route } from 'react-router-dom';
import CreateComment from "./Comment";
import PublishComment from "./PublishedComments";
import Rating from "./Rating";


const LOAD_POST_URL = '/posts';
const UPDATE_POST_URL = '/posts';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body');






const PublishPost = () => {

    const [loadPosts, setLoadPost]=useState();
    const fetchPosts = async (e) => {
        try {
            
            const response = await axios.get(LOAD_POST_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const posts = response.data.posts;

            setLoadPost(posts);
            //console.log(JSON.stringify(response?.data));
            console.log(posts);
        
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPosts();
      }, []);


    

    /*Pour fermer le Dropdown menu*/
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    useEffect(() => {
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
                console.log(menuRef.current);
            }
        };
        document.addEventListener("mousedown", handler);
        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });



    const [modalIsOpen, setIsOpenModal] = useState(false);
    
    const [textModal, setTextModal ] = useState("");
    const [idPostModal, setIdPostModal ] = useState("");

    const openModal = async (idPost) => {
        console.log("est passé par iciii")
        try {
            const url = LOAD_POST_URL + "/" + idPost;
            const response = await axios.get(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const post = response.data;
            console.log(post);

            setTextModal(post.message);
            setIdPostModal(post._id);
        
        } catch (err) {
            console.log(err);
        }
        setIsOpenModal(true);
    }

    const deletePost = async (idPost) => {
        
        try {
            const url = LOAD_POST_URL + "/" + idPost;
            await axios.delete(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    }

    /*function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }*/

    function closeModal() {
        setIsOpenModal(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        formData.append("message", JSON.stringify(textModal));
        
    
        try {
            const url = UPDATE_POST_URL + "/" +idPostModal;
            await axios.put(url,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
        
            setTextModal('');
            setIdPostModal('');
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <section className="posts bg-light-grey">
            {loadPosts?.map((post) =>
            

                <div className="post">
                    <div>
                        <div className="post-info">
                            <div className="post-info__user">
                                <img 
                                    src={post.user[0].imageUrl}
                                    alt="icone utilisateur"
                                    className="user-default-image"
                                ></img>
                                <div className="post__name-date">
                                    <p className="user-name" id="user-name-posted">{post.user[0].name} {post.user[0].surname}</p>
                                    <p className="published-date">Publié le {new Date(post.publishedDate).toLocaleDateString("fr")} {new Date(post.publishedDate).getUTCHours()}</p>
                                </div>
                            

                                {/*dropdown menu pour effectuer des actions sur un post*/}
                                <div className='menu-container' ref={menuRef}>
                                    <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                                        <FontAwesomeIcon
                                            icon={faEllipsisH}
                                            className="icone-params-posts"
                                            aria-label="Actions pour cette publication"
                                        />
                                    </div>

                                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                                        <ul>
                                            <button className="option-post" key={post._id} onClick={() => openModal(post._id)}>Modifier le post</button>
                                            <button className="option-post" key={post._id} onClick={() => deletePost(post._id)}>Supprimer le post</button>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="post-info__message">
                                
                                {/*<li className="texte-publi" key={post.message}>{post.message}</li>*/}
                                <p className="texte-publi">{post.message}</p>
                                
                                
                                {
                                post.imageUrl !== "none" && 
                                    <img 
                                    src={post.imageUrl}
                                    alt="évènement"
                                    className="post-image"
                                ></img>
                                
                                }
                                


                            </div>
                        </div>
                        
                        
                        {/*<div className="post-likes">
                        <FontAwesomeIcon icon={faThumbsUp}/>
                        <FontAwesomeIcon icon={faThumbsDown} className="icone-a-droite"/>
                            </div>*/}

                        <Routes>
                            <Route path="*" element={<Rating userPost={post._id} />} />
                        </Routes>  

                        <div className="post-advice">
                            <div className="post-advice__buttons">
                                <label htmlFor="myLike" className="advice-buttons">
                                    <FontAwesomeIcon icon={faThumbsUp} className="icone-a-gauche icone-contour"/>
                                    J'aime
                                </label>
                                <label htmlFor="myLike" className="advice-buttons">
                                    <FontAwesomeIcon icon={faThumbsDown} className="icone-a-gauche icone-contour"/>
                                    Je n'aime pas
                                </label>
                                <label htmlFor="myComment" className="advice-buttons">
                                    <FontAwesomeIcon icon={faComment} className="icone-a-gauche icone-contour"/>
                                    Commenter
                                </label>
                            </div>

                            <Routes>
                                <Route path="*" element={<CreateComment userPost={post._id} />} />
                            </Routes>

            
                            
                                
                            {/*post.comments?.map((comment) => (
                                <Routes>
                                <Route path="*" element={<PublishComment comment={comment} />} />
                                </Routes>   
                            ))*/}
                                
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <Routes>
                                    <Route path="*" element={<PublishComment comment={comment} />} />
                                    </Routes>
                                ))
                            ) : (
                                <p className="message-aucun-com">Aucun commentaire à afficher.</p>
                            )}

                            
                            
                                            
                        
                        </div>
                    </div>                      
                </div>
            
            )}

        <Modal
            isOpen={modalIsOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}
            <button onClick={closeModal}>close</button>
            <div>I am a modal</div>
            <form onSubmit={handleSubmit}>
                <textarea
                    id="message"
                    onChange={(e) => setTextModal(e.target.value)}
                    value={textModal}>
                </textarea>

                <button className="create-post__btn" type="submit">
                    Publier
                    <FontAwesomeIcon icon={faPaperPlane} className="icone-a-droite"/>
                </button>
            
            </form>
        </Modal>

        </section>

        

    )
}

/*Création de la fonction dropdown menu*/
function DropdownItem(props){
    return(
        <li className = 'dropdownItem'>
            {/*<icon src={props.icon}></icon>*/}
            <a href="#"> {props.text} </a>
        </li>
    );
}

export default PublishPost