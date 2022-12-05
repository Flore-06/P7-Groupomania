import { useState, useEffect } from 'react';
import Users from './Users';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';


const Admin = () => {


    return (
        <main className="light-background">
            <Routes>
                <Route path="*" element={<Header/>} />
            </Routes>

            <section className="bg-light-grey section-bienvenue">
                <h1>Page administrateur</h1>
                <br />
                <Users />
            </section>

        </main>


    )
}

export default Admin