import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

import { useState, useEffect, useRef } from "react";

import AuthContext from "../context/AuthProvider";
import { faRightFromBracket, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes, Route } from 'react-router-dom';
import CreatePost from '../components/Creation';
import PublishPost from '../components/PublishedPosts';


const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();


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

    /* Pour se déconnecter */
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        localStorage.clear();
        navigate('/login');
    }





    return (
        <main className="light-background">
            <div className="navbar">
                    <a aria-label="Home" className="active" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faHome}/></a>
                    <a aria-label="Administrateur" href="/admin" style={{width:'34%'}}><FontAwesomeIcon icon={faUser}/></a>
                    <a aria-label="Déconnexion" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faRightFromBracket}/></a>
            </div>

            <section className="bg-light-grey section-bienvenue">
                <h1>Bienvenue sur le Réseau Social de</h1>
                <img className="logo-groupomania" src='/logo-rouge-centre-groupomania.png' alt='logo de Groupomania'></img>
                <br />
                <div className="flexGrow">
                    <button onClick={logout}>
                        Se déconnecter
                        <FontAwesomeIcon icon={faRightFromBracket} className="icone-a-droite"/>
                    </button>
                </div>
            </section>

            <Routes>
                <Route path="*" element={<CreatePost />} />
            </Routes>

            

            <Routes>
                <Route path="*" element={<PublishPost />} />
            </Routes>
        
                

        </main>
        
    );

    
}

export default Home