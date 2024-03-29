const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const User = require('../models/User');
const Comment = require('../models/Comment');

// Appel du modèle du post
const Post = require("../models/Post");
// Appel du fs (filesystem) qui permet d'aller dans les fichiers
const fs = require('fs');


// Accéder à tous les posts
exports.getAllPost = (req, res, next) => {

  /* Trier les posts du plus récent au moins récent */
  Post.find().sort({ publishedDate: -1 })
.populate('user') // Récupérer les utilisateurs liés aux posts
.populate({
  path: 'comments', // Récupérer les commentaires liés aux posts
  populate: {
    path: 'user', // Récupérer les utilisateurs liés aux commentaires
    model: 'User'
  }
})
        .then((posts) => {
        
          res.status(200).json({posts});
        })
      
    .catch((error) => res.status(400).json({ error }));
    // Récupérer tous les posts avec les utilisateurs et les commentaires associés

};

// Accéder à un post particulier
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
      .then((post) => { 
        console.log(post);
        res.status(200).json(post);})
      .catch((error) => res.status(400).json({ error }));
};

// Créer un post
exports.createPost = (req, res, next) => {

  const message = req.body.message.slice(1,-1);
  const name = req.body.userName.slice(1,-1);
  const surname = req.body.userSurname.slice(1,-1);
  const userid = req.body.userId.replace(/"/g, '');
  
  let obj;

  console.log("---"+req.body.userId+"---");
  console.log(userid);
  console.log(message);
  console.log(req.body.message);
  console.log(name);
  console.log(surname);

  
  const objectId = new ObjectId(userid); 

    if (req.file === undefined) {
        obj = {
          message : message,
          imageUrl: "none",
          user: objectId,
          likes: 0,
          dislikes: 0,
          usersLiked: [' '],
          usersdisLiked: [' '],};
        console.log("console.log objectId");
        console.log(objectId);
    }

    else {
        const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        
        obj = {message : message,
          imageUrl: image,
          user: objectId,
          likes: 0,
          dislikes: 0,
          usersLiked: [' '],
          usersdisLiked: [' '],};
    }
  
      console.log(req.params.id);
      console.log(req.body);
      
      const post = new Post(obj);
    
      // Publier un nouveau post
      post.save()
      .then(post => { 
        // Ajouter l'identifiant du nouveau post au champ posts de l'utilisateur
        return User.findOneAndUpdate({ _id: objectId }, { $push: { posts: post._id } });
          
        })
      .then(() => {
        Post.find().sort({ createdAt: -1 }).populate('user')       
        .then((userPost) => res.status(200).json(userPost))
        .catch(error => res.status(401).json({ error }));
      })
      .catch(err => { res.status(400).json( { err })});
        

};

// Modifier un post
exports.modifyPost = (req, res, next) => {

  Post.findOne({_id: req.params.id})
      .then((post) => {
          // N'est pas autorisé à modifier si id du user est différent de celui qui a créé le post
          
          Post.updateOne({ _id: req.params.id}, {
            $set: {
                message: req.body.message,
            }})
          .then(() => {console.log('est passééé');console.log(req.body.message);res.status(200).json({message : 'Post modifié !'})})
          .catch(error => res.status(401).json({ error }));
    
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
  const postId = req.params.id;
  Post.findOne({ _id: req.params.id})
      .then(post => {
          // N'est pas autorisé à supprimer si id du user est différent de celui qui a créé le post
          
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({_id: req.params.id})
                  .then(() => Comment.deleteMany({ post: postId}))
                  .then(() => { res.status(200).json({message: 'Post supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
          
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