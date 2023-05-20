const {ObjectId} = require('mongodb');

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

  console.log("console.log req.body.userId");
  console.log(req.body.userId);
  console.log("console.log req.body.userPost");
  console.log(req.body.userPost);

  const userid = req.body.userId.replace(/"/g, '');
  const userobjectId = new ObjectId(userid);
  const postid = req.body.userPost.replace(/"/g, '');
  const postobjectId = new ObjectId(postid); 
  console.log("console.log userobjectId");
  console.log(userobjectId);
  console.log("console.log postobjectId");
  console.log(postobjectId);


  console.log(req.body);
  const comment = new Comment({
      message : req.body.message,
      user: userobjectId,
      post: postobjectId,
  });

  // Publier un nouveau comment
  comment.save()
  .then(comment => { 
    // Ajouter l'identifiant du nouveau post au champ posts de l'utilisateur
    console.log("console.log comment._id");
    console.log(comment._id);
    //User.findOneAndUpdate({ _id: userobjectId }, { $push: { comments: comment._id } });
    Post.findOneAndUpdate({ _id: postobjectId }, { $push: { comments: comment._id } });
    })
  .then(() => { res.status(201).json({message: 'Commentaire publié !'})})
  .catch(error => { res.status(400).json( { error })})
};