const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const kurssit = require('./kurssit.json');
let nextId = Object.keys(kurssit).reduce((max, id) => Math.max(max, parseInt(id)), 0) + 1;

app.use(bodyParser.json());

app.get('/api/kurssit', (req, res) => {
  res.json(kurssit);
});

app.get('/api/kurssit/:id', (req, res) => {
  const id = req.params.id;
  const kurssi = kurssit[id];
  if (kurssi) {
    res.json(kurssi);
  } else {
    res.status(404).send('Kurssia ei löytynyt');
  }
});

app.post('/api/kurssit', (req, res) => {
  const kurssi = req.body;
  const id = nextId.toString();
  nextId++;
  kurssit[id] = kurssi;
  res.json({ id: id });
});

app.put('/api/kurssit/:id', (req, res) => {
  const id = req.params.id;
  const kurssi = req.body;
  if (kurssit[id]) {
    kurssit[id] = kurssi;
    res.json(kurssi);
  } else {
    res.status(404).send('Kurssia ei löytynyt');
  }
});

app.delete('/api/kurssit/:id', (req, res) => {
  const id = req.params.id;
  if (kurssit[id]) {
    kurssit[id].nimi = '(Tämä kurssi on suoritettu.)';
    res.json(kurssit[id]);
  } else {
    res.status(404).send('Kurssia ei löytynyt');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
