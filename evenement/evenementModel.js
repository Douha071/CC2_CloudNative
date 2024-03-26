const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true, unique: true },
    lieu: { type: String },
    categorie: { type: String },
});

module.exports = mongoose.model('evenement', evenementSchema);
