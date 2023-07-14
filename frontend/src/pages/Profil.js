import React from "react";
import Header from '../components/Header';
import ProfilUser from '../components/ProfilUser';

const Profil = () => {
    return (
        <>
            <Header/>
        
            <main className="light-background">
                <ProfilUser />
            </main>
        </>
    );
}

export default Profil;