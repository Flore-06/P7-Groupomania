import React from "react";
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Admin from '../components/Admin';

const Profil = () => {
    return (
        <>
            <Header/>
        
        
            <main className="light-background">
                <Admin />
            </main>
        </>
    );
}

export default Profil;