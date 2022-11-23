// Appel du modèle du comment
const Comment = require("../models/Comment");
// Appel du fs (filesystem) qui permet d'aller dans les fichiers
const fs = require('fs');


// Accéder à tous les comments
exports.getAllComment = (req, res, next) => {
    Comment.find()
      .then((comments) => { res.status(200).json(comments);})
      .catch((error) => res.status(400).json({ error }));
};

// Accéder à un comment particulier
exports.getOneComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
      .then((comment) => { res.status(200).json(comment);})
      .catch((error) => res.status(400).json({ error }));
};

// Créer un comment
exports.createComment = (req, res, next) => {

  console.log(req.body);
  const comment = new Comment({
      message : req.body.message,
      userId: req.body.userId,
      userName: req.body.userName,
      userSurname: req.body.userSurname,
      /*publishedDate: req.body.publishedDate,*/
  });

  // Publier un nouveau comment
  comment.save()
  .then(() => { res.status(201).json({message: 'Commentaire publié !'})})
  .catch(error => { res.status(400).json( { error })})
};