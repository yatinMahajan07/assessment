const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let submissions = [];

app.post('/api/submit', (req, res) => {
  const data = req.body;
  if (!data.name || !data.email || !data.age || !data.gender || !data.message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  data.id = Date.now().toString();
  submissions.push(data);
  res.status(200).json({ message: 'Form submitted successfully' });
});

app.get('/api/data', (req, res) => {
  res.status(200).json(submissions);
});

app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  submissions = submissions.filter(entry => entry.id !== id);
  res.status(200).json({ message: 'Entry deleted successfully' });
});

app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const updatedEntry = req.body;
  submissions = submissions.map(entry => entry.id === id ? { ...entry, ...updatedEntry } : entry);
  res.status(200).json({ message: 'Entry updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});