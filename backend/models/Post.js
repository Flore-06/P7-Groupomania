// Appel de Mongoose : permet de créer un schéma de données
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Créer un schéma de données avec les informations nécessaires pour chaque post
const postSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  /*userName: { type: String, required: true },
  userSurname: { type: String, required: true },
  publishedDate,*/
  message: { type: Schema.String, required: true },
  imageUrl: { type: Schema.String, required: false },
  likes: { type: Schema.Number },
  dislikes: { type: Schema.Number },
  usersLiked: { type: [Schema.String] },
  usersDisliked: { type: [Schema.String] },
});

// Exporter ce schéma en tant que modèle mongoose avec les propriétés de postSchema
module.exports = mongoose.model('Post', postSchema);