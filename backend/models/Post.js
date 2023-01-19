// Appel de Mongoose : permet de créer un schéma de données
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Créer un schéma de données avec les informations nécessaires pour chaque post
const postSchema = mongoose.Schema({
  /*user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],*/
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  /*userName: { type: String, required: true },
  userSurname: { type: String, required: true },
  publishedDate,*/
  message: { type: String, required: true },
  imageUrl: { type: String, required: false },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// Exporter ce schéma en tant que modèle mongoose avec les propriétés de postSchema
module.exports = mongoose.model('Post', postSchema);