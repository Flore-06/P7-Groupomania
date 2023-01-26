const mongoose = require('mongoose');
const User = require('../models/User');

// Appel du modèle du post
const Post = require("../models/Post");
// Appel du fs (filesystem) qui permet d'aller dans les fichiers
const fs = require('fs');


// Accéder à toutes les posts
exports.getAllPost = (req, res, next) => {
  User.find()
    .then((user) => {
      Post.find()
        .then((posts) => {
          res.status(200).json({user, posts});
        })
      })
    .catch((error) => res.status(400).json({ error }));

  /*Post.find()
    .then((posts) => {
      User.find()
      .then((user) => {
        res.status(200).json(posts);})
      })
      res.status(200).json(posts);})
    .catch((error) => res.status(400).json({ error }));*/
};

// Accéder à un post particulier
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then((post) => { res.status(200).json(post);})
      .catch((error) => res.status(400).json({ error }));
};

// Créer un post
exports.createPost = (req, res, next) => {
  let image = "none";
  console.log(req.body.email);
  
  
      /*const postObject = JSON.parse(req.body.post);
      delete postObject._id;
      delete postObject._userId;
      console.log(postObject);*/
      console.log(req.body);
      const post = new Post({
          message : req.body.message,
          imageUrl: image,
          userId: req.body.userId,
          /*userName: req.body.userName,
          userSurname: req.body.userSurname,
          publishedDate: req.body.publishedDate,*/
          likes: 0,
          dislikes: 0,
          usersLiked: [' '],
          usersdisLiked: [' '],
      });
    
      // Publier un nouveau post
      post.save()
      .then(() => { res.status(201).json({message: 'Post publié !'})})
      .catch(error => { res.status(400).json( { error })})

  
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
  const postObject = req.file ? {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete postObject._userId;
  Post.findOne({_id: req.params.id})
      .then((post) => {
          // N'est pas autorisé à modifier si id du user est différent de celui qui a créé le post
          if (post.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } 
          // Si id est le même : peut modifier
          else {
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Post modifié !'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id})
      .then(post => {
          // N'est pas autorisé à supprimer si id du user est différent de celui qui a créé le post
          if (post.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } 
          // Si id est le même : peut supprimer
          else {
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Post supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

// Aimer ou ne pas aimer un post
exports.likeDislikePost = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let postId = req.params.id
    
    switch (like) {
      // Ajout d'un like
      case 1 :
          Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
            .then(() => res.status(200).json({ message: `J'aime` }))
            .catch((error) => res.status(400).json({ error }))
              
        break;
      
      // Post sans avis
      case 0 :
          Post.findOne({ _id: postId })
             .then((post) => {
              // Enlever son like
              if (post.usersLiked.includes(userId)) { 
                Post.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                  .then(() => res.status(200).json({ message: `Neutre` }))
                  .catch((error) => res.status(400).json({ error }))
              }

              // Enlever son dislike
              if (post.usersDisliked.includes(userId)) { 
                Post.updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                  .then(() => res.status(200).json({ message: `Neutre` }))
                  .catch((error) => res.status(400).json({ error }))
              }
            })
            .catch((error) => res.status(404).json({ error }))
        break;
  
      // Ajout d'un dislike
      case -1 :
          Post.updateOne({ _id: postId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
            .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
            .catch((error) => res.status(400).json({ error }))
        break;
        
        default:
          console.log(error);
    }
  }