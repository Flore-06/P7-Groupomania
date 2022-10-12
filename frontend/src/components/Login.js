import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section class="row">
            
            <div class="column dark-background column_image-title">
                <p class="groupomania-title">Le Réseau Social de</p>
                <img src='..\public\logo-blanc-centre-groupomania.png' alt='logo de Groupomania'></img>
            </div>

            <div class="column column_form">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 class="form-title">Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Se connecter</button>
                </form>
                <p class="form-redirection">
                    Besoin de créer un compte ?<br />
                    <span className="line">
                        <Link to="/register">S'inscrire</Link>
                    </span>
                </p>
            </div>
            
            
        </section>

    )
}

export default Login