// Appel d'express
const express = require('express');

// Appel le middleware d'authentification qui protège les routes
const auth = require('../middleware/auth');

// Appel du routeur
const router = express.Router();

// Appel muter pour l'ajout d'images
const multer = require('../middleware/multer-config');

// Import de la logique des routes
const userCtrl = require('../controllers/user');

// Intercepter les différentes requêtes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', /*auth,*/ userCtrl.getOneUser);
router.post('/infos/:id', multer, userCtrl.modifyUser );

// Exporter le routeur
module.exports = router;