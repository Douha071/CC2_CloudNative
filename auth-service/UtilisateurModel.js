const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UtilisateurSchema = new mongoose.Schema({
  nom: String,
  email: String,
  login: String,
  mdp: String,
});

UtilisateurSchema.pre('save', async function (next) {
  if (!this.isModified('mdp')) return next();
  const salt = await bcrypt.genSalt(10);
  this.mdp = await bcrypt.hash(this.mdp, salt);
  next();
});

UtilisateurSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.mdp);
};

UtilisateurSchema.methods.createToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      nom: this.nom,
    },
    process.env.SECRET_KEY
  );
};

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);