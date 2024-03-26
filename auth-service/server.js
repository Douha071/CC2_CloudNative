const express = require('express');
const mongoose = require('mongoose');
const User = require('./UtilisateurModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/CC2_CloudNative', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());


router.post('/addUtilisateur', async (req, res) => {
  const { nom, email, login, mdp } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(mdp, 10);
  const user = new User({ nom, email, login, mdp: hashedPassword });
  await user.save();
const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  res.json({ user, token });
});


router.post('/connect', async (req, res) => {
  const { login, mdp } = req.body;
  const user = await User.findOne({ login });
  if (!user) {
    return res.status(400).json({ error: 'Invalid login or password' });
  }
  const isMatch = await bcrypt.compare(mdp, user.mdp);

  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid login or password' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  res.json({ user, token });
});

app.listen(3000, () => {
  console.log('Auth service running on port 3000');
});