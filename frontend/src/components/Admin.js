import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";

import axios from '../api/axios';

//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOAD_USER_URL = '/auth';

const Admin = () => {

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [userImg, setImgname] = useState('');

    /*const handleChange(event) => {
        setUsername(event.currentTarget.value);
    };*/

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

            //console.log(JSON.stringify(response?.data));
            console.log(user);
            setUsername(user.surname);
            setFirstname(user.name);
            setImgname(user.image);
        
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers(); 
    }, []);

    const [image, setImage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
            
            //formData.append("userId", JSON.stringify(userId));
            //formData.append("userName", JSON.stringify(userName));
            //formData.append("userSurname", JSON.stringify(userSurname));
            /*formData.append("publishedDate", JSON.stringify(publishedDate));*/
            //formData.append("message", JSON.stringify(message));
            formData.append("image", image);
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
                        <img 
                            src="/default-user-icon.png"
                            alt="icone admin"
                            className="admin-image"
                        ></img>
                        <label htmlFor="image" className='label-image-upload'>
                            <div className="icone-new-add-file">
                            <FontAwesomeIcon icon={faPlus} className="icone-a-droite icone-new-add-file"/>
                            <FontAwesomeIcon icon={faImage} className="icone-a-droite icone-new-add-file"/>
                            </div>
                            
                            <input
                                value={userImg}
                                type="file"
                                id="image"
                                className="default-css-add-file"
                                change="onFileChange"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                        <p className="user-name" id="user-name-posted">{firstname} {username}</p>

                        <div className="form-group has-feedback">
                            <label htmlFor="username">Prénom</label>
                            <input
                            value={firstname}
                            type="text"
                            /*className={
                                errors.first_name && touched.first_name
                                ? "form-control is-invalid"
                                : "form-control"
                            }*/
                            id="prenom"
                            placeholder="Changez ici le prénom"
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
                            value={username}
                            type="text"
                            /*className={
                                errors.last_name && touched.last_name
                                ? "form-control is-invalid"
                                : "form-control"
                            }*/
                            id="nom"
                            placeholder="Changez ici le nom"
                            />
                            {/*errors.last_name && touched.last_name ? (
                            <small id="passwordHelp" class="text-danger">
                                {errors.last_name}
                            </small>
                            ) : null*/}
                        </div>
                    
                    </div>

                    {/*<label htmlFor="password">
                                            Mot de passe :
                                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={password}
                                            required
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            8 à 24 caractères<br />
                                            Doit contenir au moins une lettre majuscule et minuscule, un nombre et un caractère spécial.<br />
                                            Caractères spéciaux autorisés: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                        </p>


                                        <label htmlFor="confirm_pwd">
                                            Confirmez le mot de passe :
                                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Doit correspondre au premier mot de passe.
                    </p>*/}
                    
                    {}

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
            
                
            </section>
            

        </main>


    )
}

export default Admin