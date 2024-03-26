const express = require('express');
const mongoose = require('mongoose');
const Evenement = require('./evenementModel');
const verifyToken = require('./auth-service/verifyToken');

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


router.post('/addEvent', async (req, res) => {
  const { titre, description, date,lieu, categorie } = req.body;
  const existingEvent = await Evenement.findOne({ date });

  if (existingEvent) {
    return res.status(400).json({ error: 'Event already exists' });
  }
  const event = new Evenement({
  titre,description,date,categorie,
  });
  await event.save();
  res.json(event);
});


router.get('/event/:id', async (req, res) => {
  const event = await Evenement.findById(req.params.id);
  res.json(event);
});

app.listen(4000, () => {
  console.log('Evenement service running on port 4000');
});
