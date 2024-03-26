const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  Utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  evenement_id: { type: mongoose.Schema.Types.ObjectId, ref: 'evenement' },
});

module.exports = mongoose.model('Restaurant', inscriptionSchema);