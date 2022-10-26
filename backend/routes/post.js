// Appel d'express : pour créer le routeur
const express = require('express');

// Créer un routeur avec la méthode Router d'express
const router = express.Router();

// Appel le middleware d'authentification qui protège les routes
const auth = require('../middleware/auth');

// Appel muter pour l'ajout d'images
const multer = require('../middleware/multer-config');

// Import de la logique des routes
const postsCtrl = require('../controllers/posts');

// Intercepter les différentes requêtes
router.get('/', /*auth,*/ postsCtrl.getAllPost);
router.post('/', /*auth,*/ multer, postsCtrl.createPost);
router.get('/:id', /*auth,*/ postsCtrl.getOnePost);
router.put('/:id', /*auth,*/ multer, postsCtrl.modifyPost);
router.delete('/:id', /*auth,*/ postsCtrl.deletePost);
router.post("/:id/like", /*auth,*/ postsCtrl.likeDislikePost);

// Exporter le routeur
module.exports = router;