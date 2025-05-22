import express from 'express';

const router = express.Router();
let formData = [];

router.post('/submit', (req, res) => {
  const data = req.body;
  if (!data || !data.fullName || !data.email) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  formData.push(data);
  res.status(200).json({ message: 'Form submitted successfully' });
});

router.get('/data', (req, res) => {
  res.status(200).json(formData);
});

export default router;