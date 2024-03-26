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

app.post('/add', verifyToken, async (req, res) => {
  const { nom,email,login,mdp} = req.body;
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.post('/connecter', async (req, res) => {
  const { login, mdp } = req.body;
  const user = await User.findOne({ login });
  if (!user) return res.sendStatus(401);
  if (!user.comparePassword(mdp)) return res.sendStatus(401);
  const token = user.createToken();
  res.send(token);
});

app.listen(3000, () => {
  console.log('Auth service running on port 3000');
});