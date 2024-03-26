const express = require('express');
const router = express.Router();
const inscription = require('./inscriptionModel');
const verifyToken = require('./auth-service/verifyToken');


app.post('/utilisateur', async (req,res) => {
  const { Utilisateur_id,evenement_id } = req.body;
  const userExist = await inscription.findOne({ $or: Utilisateur_id });
  if (userExist) return res.sendStatus(409);
  const user = new inscription(req.body);
  await user.save();
  res.sendStatus(201);
});
  router.post('/add', verifyToken, async (req, res) => {
    try {
      const { Utilisateur_id,evenement_id } = req.body;
      const userExist = await inscription.findOne({ $or: Utilisateur_id });
      if (userExist) return res.sendStatus(409);
      const evenementExist = await inscription.findOne({ $or: evenement_id });
      if (evenementExist) return res.sendStatus(409);
      const nouveauInscription= new inscription(req.body);
      const InscriptionEnregistre = await nouveauInscription.save();
      res.status(201).json(InscriptionEnregistre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
module.exports = router;
