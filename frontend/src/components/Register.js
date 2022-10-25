import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";

const NAME_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const SURNAME_REGEX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'auth/signup';

const Register = () => {
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [surname, setSurname] = useState('');
    const [validSurname, setValidSurname] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        surnameRef.current.focus();
    }, [])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(NAME_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidEmail(SURNAME_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, surname, email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ name, surname, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setName('');
            setSurname('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email already used');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section class="row">
                    <h1>Succès !</h1>
                    <p>
                        <a href="/login">Connexion</a>
                    </p>
                </section>
            ) : (
                <section class="row">
                    <div class="column dark-image-background column_image-title">
                        <p class="groupomania-title">Le Réseau Social de</p>
                        <img class="logo-groupomania-1-2" src='logo-blanc-centre-groupomania.png' alt='logo de Groupomania'></img>
                    </div>

                    <div class="column column_form">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 class="form-title">Inscription</h1>
                        <form onSubmit={handleSubmit}>
                            
                            <label htmlFor="name">
                                Prénom :
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="name"
                                ref={nameRef}
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                value={text}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="namenote"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                            <p id="namenote" className={nameFocus && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Le Prénom doit contenir que des lettres.
                            </p>

                            <label htmlFor="surname">
                                Nom :
                                <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validSurname || !surname ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="surname"
                                ref={surnameRef}
                                autoComplete="off"
                                onChange={(e) => setSurname(e.target.value)}
                                value={text}
                                required
                                aria-invalid={validSurname ? "false" : "true"}
                                aria-describedby="surnamenote"
                                onFocus={() => setSurnameFocus(true)}
                                onBlur={() => setSurnameFocus(false)}
                            />
                            <p id="surnamenote" className={surnameFocus && !validSurname ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Le Nom doit contenir que des lettres.
                            </p>

                            <label htmlFor="email">
                                Email :
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                L'identifiant de messagerie doit contenir le @.<br />
                                Il doit y avoir au moins un caractère avant et après le @.<br />
                                Il doit y avoir au moins deux caractères après . (point).
                            </p>


                            <label htmlFor="password">
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
                            </p>

                            <button disabled={!validEmail || !validPwd || !validMatch ? true : false} style={{margin: '20px 0px'}}>S'inscrire</button>
                        </form>
                        <p class="form-redirection">
                            Déjà inscrit ?<br />
                            <span className="line">
                                <Link to="/">Connectez-vous</Link>
                            </span>
                        </p>
                    </div>
                    
                </section>
            )}
        </>
    )
}

export default Register