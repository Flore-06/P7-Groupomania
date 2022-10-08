// Appel de bcrypt : algorythme de hachage
const bcrypt = require('bcrypt');

// Appel de jwt : jeton d'identification communiqué entre serveur/client
const jwt = require('jsonwebtoken');

// Appel du modèle User
const User = require('../models/User');

// Appel du passwordValidator : demande des mots de passe complexes
var passwordValidator = require('password-validator');



// Enregistrer de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    // Create a schema
    var schema = new passwordValidator();

    // Schema properties
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


    // Inscription faite si propriétés respectées
    if (schema.validate(req.body.password) == true) {
        bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    }
    
    // Génère une erreur si propriétés du mot de passe non respectées
    else {
        return res.status(400).json({ error: 'Format du mot de passe non respecté! Doit contenir 8 à 100 caractères, min 1 capitale, min 1 minuscule, min 2 chiffres' })
    }
            
};


// Identification/login d'un user
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };