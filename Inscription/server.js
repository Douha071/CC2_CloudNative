const express = require('express');
const router = express.Router();
const inscription = require('./inscriptionModel');
const User = require('./auth-service/UtilisateurModel');
const Evenement = require('./evenement/evenementModel');
const verifyToken = require('./auth-service/verifyToken');



router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post('/inscription', async (req, res) => {
  const user = await User.findById(req.body.user);
  const event = await Evenement.findById(req.body.event);

  if (!user || !event) {
    return res.status(400).json({ error: 'User or event not found' });
  }

  const inscription = new inscription({
    user: user._id,
    event: event._id,
  });
  await inscription.save();
  res.json(inscription);
});
module.exports = router;
