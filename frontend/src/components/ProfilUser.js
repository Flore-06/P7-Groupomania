import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";
import axios from '../api/axios';

const LOAD_USER_URL = '/auth';
const DELETE_USER_URL = '/auth/delete';
const ADMIN_UPDATE_USER_INFOS_URL = '/auth/infos';
const ADMIN_UPDATE_USER_PASSWORD_URL = '/auth/password';

const ProfilUser = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [userImg, setImgname] = useState('');
    const [userImageFile, setImageFile] = useState('');
    const [messagePassword, setMessagePassword] = useState('');

    const fetchUsers = async (e) => {
        try {
            const userId = localStorage.getItem('userId');
            const url = LOAD_USER_URL + '/' + userId;
            const response = await axios.get(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const user = response.data;

            console.log(user);
            setUsername(user.surname.replace(/"/g, ''));
            setFirstname(user.name.replace(/"/g, ''));
            setImgname(user.imageUrl);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers(); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userId = localStorage.getItem('userId');
        const url = ADMIN_UPDATE_USER_INFOS_URL + '/' + userId;
        const formData = new FormData();
            
        formData.append("userId", JSON.stringify(userId));
        formData.append("userName", JSON.stringify(firstname));
        formData.append("userSurname", JSON.stringify(username));
        formData.append("image", userImageFile);
        
        console.log(Object.fromEntries(formData));

        try {

            const response = await axios.post(url,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(userImg);
        
            // Redirige vers la page de confirmation de modification de profil
            window.location.href = '/confirmation-modification-profil';
            
        } catch (err) {
            console.log(err);
        }
    }

    function handleImageChange(event) {
        setImageFile(event.target.files[0]);
      }

    const [password, setPassword] = useState('');
    const [passwordconfirmation, setPasswordConfirmation] = useState('');
    const  handleSubmitPassword = async (e) => {
        e.preventDefault();
    
        const userId = localStorage.getItem('userId');
        const url = ADMIN_UPDATE_USER_PASSWORD_URL + '/' + userId;

        try {
            const response = await axios.post(url,
                JSON.stringify({ password, passwordconfirmation }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setMessagePassword(response?.data.message);
            setPassword("");
            setPasswordConfirmation("");
            
        } catch (err) {
            console.log(err);
        }
    }

    const deleteUser = async () => {

        const token = localStorage.getItem('token');
        try {
            const userId = localStorage.getItem('userId');
            const url = DELETE_USER_URL + "/" + userId;
            await axios.post(url,
                {
                    headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'application/json'} ,
                    withCredentials: true
                }
            )
            .then(() => {
                
                localStorage.clear();
                // Redirige vers login page
                navigate('/login');
            });
    

            
        } 
        
        catch (err) {
            console.log(err);
        }
    }

    return (
        <main className="light-background"> 

            <section className="bg-light-grey section-bienvenue">
                <h1 className="form-title">Page de profil</h1>
                
                <form onSubmit={handleSubmit} className="admin-form">
                    
                    <div className="user-info">
                        <input type="hidden" name="id" />

                        <img 
                            src={userImg}
                            alt="icone admin"
                            className="admin-image"
                        ></img>
                        <label htmlFor="image" className='label-image-upload' aria-label="Un champ pour modifier la photo de profil">
                            <div className="icone-new-add-file">
                            <FontAwesomeIcon icon={faPlus} className="icone-a-droite icone-new-add-file"/>
                            <FontAwesomeIcon icon={faImage} className="icone-a-droite icone-new-add-file"/>
                            </div>
                            
                            <input
                                type="file"
                                id="image"
                                className="default-css-add-file"
                                change="onFileChange"
                                onChange={handleImageChange}
                            />
                        </label>
                        <p className="user-name" id="user-name-posted">{firstname} {username}</p>

                    </div>

                    
                    <div className="user-modify-info">
                        <div className="form-group has-feedback">
                            <label htmlFor="username">Prénom</label>
                            <input
                            value={firstname || ''}
                            type="text"
                            id="prenom"
                            placeholder="Changez ici le prénom"
                            aria-label="Un champ de texte pour modifier le prénom"
                            onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>

                        <div className="form-group has-feedback">
                            <label htmlFor="last_name">Nom</label>
                            <input
                            value={username || ''}
                            type="text"
                            id="nom"
                            placeholder="Changez ici le nom"
                            aria-label="Un champ de texte pour modifier le nom"
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <button
                            style={{margin: '20px 0px'}}
                            type="submit"
                            className="btn btn-block btn-primary"
                        >
                            Mettre à jour
                        </button>
                    </div>
                </form>

                <form onSubmit={handleSubmitPassword} className="admin-form">
    
                    <label htmlFor="password">
                        Mot de passe :
                    </label>
                    
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <label htmlFor="confirm_pwd">
                        Confirmez le mot de passe :
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        value = {passwordconfirmation}
                        required
                        
                    />
                
                    <p>
                        {messagePassword}
                    </p>

                    <div className="user-modify-info">
                        <button
                            style={{margin: '20px 0px'}}
                            type="submit"
                            className="btn btn-block btn-primary"
                        >
                            Mettre à jour le mot de passe
                        </button>
                    </div>

                </form>  

                <button
                        style={{margin: '20px 0px'}}
                        type="submit"
                        onClick={() => deleteUser()}
                        className="btn btn-block btn-primary btn-supprimer"
                    >
                        Supprimer mon compte
                    </button>

            </section>

        </main>


    )
}

export default ProfilUser