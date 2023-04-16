import { useState, useEffect, useRef } from "react";

import AuthContext from "../context/AuthProvider";

import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import CreatePost from '../components/Creation';
import PublishPost from '../components/PublishedPosts';


const Home = () => {


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




    return (
        <>
            <Header/>
        
            <main className="light-background">

                <section className="bg-light-grey section-bienvenue">
                    <h1>Bienvenue sur le Réseau Social de</h1>
                    <img className="logo-groupomania" src='/logo-rouge-centre-groupomania.png' alt='logo de Groupomania'></img>
                </section>

                <CreatePost />

                <PublishPost />
            
                    

            </main>
        </>
        
    );

    
}

export default Home