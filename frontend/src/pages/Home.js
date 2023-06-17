import Header from '../components/Header';
import CreatePost from '../components/Creation';
import PublishPost from '../components/PublishedPosts';


const Home = () => {

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