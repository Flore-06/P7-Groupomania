// Appel de Mongoose : permet de créer un schéma de données
const mongoose = require('mongoose');

// Créer un schéma de données avec les informations nécessaires pour chaque post
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  /*name: { type: String, required: true },*/
  /*manufacturer: { type: String, required: true },*/
  message: { type: String, required: true },
  /*mainPepper: { type: String, required: true },*/
  imageUrl: { type: String, required: false },
  /*heat: { type: Number, required: true },*/
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// Exporter ce schéma en tant que modèle mongoose avec les propriétés de postSchema
module.exports = mongoose.model('Post', postSchema);