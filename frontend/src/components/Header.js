import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../context/AuthProvider";
import { faRightFromBracket, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Header = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    /* Pour se déconnecter */
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        localStorage.clear();
        navigate('/login');
    }


    return (
        <div className="navbar">
                {/*<a aria-label="Home" className="active" href="/" style={{width:'33%'}}><FontAwesomeIcon icon={faHome}/></a>*/}
                <NavLink className="active" to="/">                        <li>Accueil</li>                    </NavLink>
                <a aria-label="Administrateur" href="/profil-user" style={{width:'34%'}}><FontAwesomeIcon icon={faUser}/></a>
                <a aria-label="Déconnexion" href="/login" onClick={logout} style={{width:'33%'}}><FontAwesomeIcon icon={faRightFromBracket}/></a>
        </div>
        
    );

    
}

export default Header