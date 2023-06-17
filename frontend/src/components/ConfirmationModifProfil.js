import { useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import { NavLink } from "react-router-dom";

const Profilajour = () => {
    
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    
    return (
        <main className="light-background">
            <Routes>
                <Route path="*" element={<Header/>} />
            </Routes>
            
            <section className="bg-light-grey section-bienvenue">
                <h1>Profil à jour</h1>
                <br />
                <p>Vos modifications ont été enregistrées !</p>
                
                <NavLink className="bouton-retour-page" to="/profil-user">                        
                    <li>Retour à la page Profil</li>                    
                </NavLink>
            </section>
        </main>
    )
}

export default Profilajour