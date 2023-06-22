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
    console.log(req.body.name);
    console.log(req.body.surname);
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
          name: req.body.name,
          surname: req.body.surname,
          imageUrl: `${req.protocol}://${req.get('host')}/images/default-user-icon.png`,
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
                        userName: user.name,
                        userSurname: user.surname,
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

 // Accéder à un user particulier
exports.getOneUser = (req, res, next) => {
    console.log(req.params.id);

    User.findOne({ _id: req.params.id })
    
      .then((user) => { res.status(200).json(user);})
      .catch((error) => res.status(400).json({ error }));
};

 // Mettre à jour un user particulier
 exports.modifyUser = (req, res, next) => {
    const name = req.body.userName;
    name.replace(/"/g, '');
    const surname = req.body.userSurname;
    surname.replace(/"/g, '');
    
    console.log(req.params.id);
    console.log(name);
    console.log(surname);
    
    let obj;

    if (req.file === undefined) {
        obj = {name: name, surname: surname};
        console.log("est passé par là");
    }

    else {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        console.log(imageUrl);
        obj = {name: name, surname: surname, imageUrl: imageUrl};
        console.log("est passé par ici");
    }
    


    User.findOne({ _id: req.params.id })
    
      .then((user) => { 
        console.log("est passé par ici");
        console.log(user._id);

        // Si id est le même : peut modifier
        console.log("est passé par là");
        User.updateOne({ _id: req.params.id}, {$set: obj})
        .then(() => res.status(200).json({message : 'User modifié !'}))
        .catch(error => res.status(401).json({ error }));
        
    })
      .catch((error) => res.status(400).json({ error }));
};

// Mettre à jour Mot de passe
exports.modifyPassword = (req, res, next) => {
    let password = req.body.password;
    console.log(password);
    let passwordconfirmation = req.body.passwordconfirmation;
    console.log(passwordconfirmation);
    
    let retour = "";
    let message = "";
    if (password != passwordconfirmation) {
        retour = "pasok";
        message = "erreur, les mots de passes ne correspondent pas"
        return res.status(200).json({message : message, password : password})
    }
    else {
        retour = "ok";
        message = "mot de passe modifié"

        User.findOne({ _id: req.params.id })
    
      .then((user) => { 
        console.log("est passé par ici");
        console.log(user._id);

        // Si id est le même : peut modifier
            console.log("est passé par là");
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                User.updateOne({ _id: req.params.id}, {$set: {password: hash}})
            .then(() => res.status(200).json({message : message, password : password}))
            .catch(error => res.status(401).json({ error }));
              })
            .catch(error => res.status(500).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
    }
}


// Supprimer un user
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id})
        .then(user => {
            // N'est pas autorisé à supprimer si id du user est différent de celui qui a créé le post
            
            
                User.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'User supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            
            
        })
        .catch( error => {
            res.status(500).json({ error });
        });
  };