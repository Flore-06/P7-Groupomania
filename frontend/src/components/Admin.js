import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";

import axios from '../api/axios';

//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOAD_USER_URL = '/auth';
const ADMIN_UPDATE_USER_INFOS_URL = '/auth/infos';
const ADMIN_UPDATE_USER_PASSWORD_URL = '/auth/password';

const Admin = () => {

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

    // CE QUE J'AI VOULU RETIRER
    //const [image, setImage] = useState('');

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
            
                // Redirect to confirmation page
                window.location.href = '/confirmation';
                
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


    return (
        <main className="light-background">
            <Routes>
                <Route path="*" element={<Header/>} />
            </Routes>

            
            

            <section className="bg-light-grey section-bienvenue">
                <h1 className="form-title">Page administrateur</h1>
                
                <form onSubmit={handleSubmit} className="admin-form">
                    
                    <div className="card-body">
                    <input type="hidden" name="id" /*value={values._id}*/ />
                        {/*
                        // CE QUE J'AI VOULU METTRE
                            userImg !== "none" && 
                                <img 
                                src={userImg}
                                alt="admin"
                                className="admin-image"
                            ></img>     
    */}

                        <img 
                            src={userImg}
                            alt="icone admin"
                            className="admin-image"
                        ></img>
                        <label htmlFor="image" className='label-image-upload'>
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

                                // CE QUE J'AI VOULU METTRE
                                //onChange={(e) => setImgadmin(e.target.files[0])}
                            />
                        </label>
                        <p className="user-name" id="user-name-posted">{firstname} {username}</p>

                        <div className="form-group has-feedback">
                            <label htmlFor="username">Prénom</label>
                            <input
                            value={firstname || ''}
                            type="text"
                            /*className={
                                errors.first_name && touched.first_name
                                ? "form-control is-invalid"
                                : "form-control"
                            }*/
                            id="prenom"
                            placeholder="Changez ici le prénom"
                            onChange={(e) => setFirstname(e.target.value)}
                            />
                            {/*errors.first_name && touched.first_name ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.first_name}
                            </small>
                            ) : null*/}
                        </div>

                        <div className="form-group has-feedback">
                            <label htmlFor="last_name">Nom</label>
                            <input
                            //onChange={handleChange}
                            value={username || ''}
                            type="text"
                            /*className={
                                errors.last_name && touched.last_name
                                ? "form-control is-invalid"
                                : "form-control"
                            }*/
                            id="nom"
                            placeholder="Changez ici le nom"
                            onChange={(e) => setUsername(e.target.value)}
                            />
                            {/*errors.last_name && touched.last_name ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.last_name}
                            </small>
                            ) : null*/}
                        </div>
                    
                    </div>
                    <div className="card-footer">
                    <button
                        style={{margin: '20px 0px'}}
                        type="submit"
                        //disabled={isSubmitting}
                        className="btn btn-block btn-primary"
                    >
                        Mettre à jour
                    </button>
                    </div>
                    </form>

                    <form onSubmit={handleSubmitPassword} className="admin-form">

                    <label htmlFor="password">
                                            Mot de passe :
                                            {/*<FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />*/}
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            
                    
                                        />

                                        {/*<p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            8 à 24 caractères<br />
                                            Doit contenir au moins une lettre majuscule et minuscule, un nombre et un caractère spécial.<br />
                                            Caractères spéciaux autorisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>*/}


                                        <label htmlFor="confirm_pwd">
                                            Confirmez le mot de passe :
                                            {/*<FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />*/}
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            value = {passwordconfirmation}
                                            required
                                            aria-describedby="confirmnote"
                                
                                        />
                                        {/*<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Doit correspondre au premier mot de passe.
                    </p>*/}
                    
                    
                    <p>
                        {messagePassword}
                    </p>

                    <div className="card-footer">
                    <button
                        style={{margin: '20px 0px'}}
                        type="submit"
                        //disabled={isSubmitting}
                        className="btn btn-block btn-primary"
                    >
                        Mettre à jour le mot de passe
                    </button>
                    </div>

      </form>
            
                
            </section>
            

        </main>


    )
}

export default Admin