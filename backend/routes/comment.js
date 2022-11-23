// Appel d'express : pour créer le routeur
const express = require('express');

// Créer un routeur avec la méthode Router d'express
const router = express.Router();

// Appel le middleware d'authentification qui protège les routes
const auth = require('../middleware/auth');

// Import de la logique des routes
const commentsCtrl = require('../controllers/comments');

// Intercepter les différentes requêtes
router.get('/', /*auth,*/ commentsCtrl.getAllComment);
router.post('/', /*auth,*/ commentsCtrl.createComment);
router.get('/:id', /*auth,*/ commentsCtrl.getOneComment);
//router.put('/:id', /*auth,*/ commentsCtrl.modifyComment);
//router.delete('/:id', /*auth,*/ commentsCtrl.deleteComment);

// Exporter le routeur
module.exports = router;