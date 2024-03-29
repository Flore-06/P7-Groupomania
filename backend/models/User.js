// Appele de Mongoose : 
const mongoose = require('mongoose');

// Appel de Mongoose uniqueValidator
const uniqueValidator = require('mongoose-unique-validator');


// Créer un schéma Mongoose pour se connecter
const userSchema = mongoose.Schema({
  isAdmin: { type: Number, required: true, default:0 },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  imageUrl: {type: String, required: false},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Appliquer l'uniqueValidator au userSchema
userSchema.plugin(uniqueValidator);

// Exporter le schéma de connexion
module.exports = mongoose.model('User', userSchema);