import { useNavigate } from "react-router-dom";
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
                <NavLink to="/"><FontAwesomeIcon icon={faHome}/></NavLink>
                <NavLink to="/profil-user" style={{width:'34%'}}><FontAwesomeIcon icon={faUser}/></NavLink>
                <NavLink to="/login" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket}/></NavLink>
        </div>

        
    );

    
}

export default Header