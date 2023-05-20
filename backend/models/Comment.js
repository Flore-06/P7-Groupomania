// Appel de Mongoose : permet de créer un schéma de données
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Créer un schéma de données avec les informations nécessaires pour chaque comment
const commentSchema = mongoose.Schema({
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  publishedDate: { type : Date, default: Date.now },
  message: { type: String, required: true },
});

// Exporter ce schéma en tant que modèle mongoose avec les propriétés de commentSchema
module.exports = mongoose.model('Comment', commentSchema);