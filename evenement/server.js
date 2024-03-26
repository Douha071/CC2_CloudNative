const express = require('express');
const mongoose = require('mongoose');
const Evenement = require('./evenementModel');
const verifyToken = require('./middleware/verifyToken');

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

app.get('/details', verifyToken, async (req, res) => {
  const evenementdetails = await Evenement.find();
  res.send(evenementdetails);
});

app.post('/add', verifyToken, async (req, res) => {
  const { titre,description,date,categorie} = req.body;
  const evenement = new Evenement(req.body);
  await evenement.save();
  res.send(evenement);
});

app.listen(4000, () => {
  console.log('Evenement service running on port 4000');
});