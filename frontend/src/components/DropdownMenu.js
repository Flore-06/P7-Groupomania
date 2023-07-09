import { useState, useEffect, useRef } from "react";
import Modal from 'react-modal';
import axios from '../api/axios';
import { Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH} from "@fortawesome/free-solid-svg-icons";


const LOAD_POST_URL = '/posts';
const UPDATE_POST_URL = '/posts';


const customStyles = {
    content: {
      width: '55%',
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

const DropdownMenu = (idPost) => {

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

        try {
            const url = LOAD_POST_URL + "/" + idPost;
            const response = await axios.post(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const post = response.data;
            console.log(post);

            setTextModal(post.message);
            setIdPostModal(post._id);
        } 
        
        catch (err) {
            console.log(err);
        }

        setIsOpenModal(true);
    }

    const deletePost = async (idPost) => {
        const token = localStorage.getItem('token');
        
        try {
            const url = LOAD_POST_URL + "/" + idPost;
            await axios.delete(url,
                {
                headers: {"Authorization" : `Bearer ${token}`} ,
                withCredentials: true
                }
            );
            window.location.reload(false);
        }
        
        catch (err) {
            console.log(err);
        }
    }


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
        <div>
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' key={post._id} onClick={()=>{setOpen(!open)}}>
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

            <Modal
                isOpen={modalIsOpen}
                //onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                //className="modal-modifier-post"
                contentLabel="Example Modal"
            >
                <div>Vous pouvez modifier ci-dessous</div>
                <form onSubmit={handleSubmit}>
                    <textarea
                    className="input-post-modifier"
                        id="message"
                        onChange={(e) => setTextModal(e.target.value)}
                        value={textModal}>
                    </textarea>
                    <div className="boutons-annuler-modifier-post">
                        <button onClick={closeModal}>Annuler</button>
                        <button className="create-post__btn" type="submit">
                            Enregistrer mes modifications
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    )
}

export default DropdownMenu

