// Appel de Mongoose : permet de créer un schéma de données
const mongoose = require('mongoose');

// Créer un schéma de données avec les informations nécessaires pour chaque comment
const commentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userPost: { type: String, required: true },
  message: { type: String, required: true },
});

// Exporter ce schéma en tant que modèle mongoose avec les propriétés de commentSchema
module.exports = mongoose.model('Comment', commentSchema);