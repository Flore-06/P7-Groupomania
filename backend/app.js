const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

// Appel de app : notre application
const app = express();

// Appel de path : donne accès au chemin du système des fichiers
const path = require('path');

// Appel de helmet : permet de sécuriser les entêtes http
//const helmet = require('helmet');

// Appel de dotenv : qui stocke des variables d'environnement
require('dotenv').config();



// Appel des différentes routes
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

/*app.use(helmet({
  crossOriginEmbedderPolicy: false,
  // ...
}));*/


// Connecter env à mongoose
mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Cross-Origin-Resource-Policy", "cross-orgin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
  });

  
  const whitelist = ["http://localhost:3000"]
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }
  app.use(cors(corsOptions))



app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
