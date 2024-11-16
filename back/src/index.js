import cors from 'cors';
import express, { json } from 'express';
import connectDb from './config/connectDb.js';
import Input from './models/Input.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

connectDb()

/**
 * Routes for the challenge
 */

// GET /
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.post('/isPalindrome', async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'Debes ingresar un texto.' });

  //const normalizedText = text.toLowerCase().replace(/[^a-z0-9]/g, '');

  const normalizedText = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  const isPalindrome = normalizedText === normalizedText.split('').reverse().join('');

  const newInput = new Input({
    text,
  });

  await newInput.save()

  return res.status(200).json({ newInput: { _id: newInput._id, text: newInput.text }, isPalindrome: isPalindrome ? 'Es Palíndromo' : 'No Es Palíndromo' });
});

app.get('/historial', async (req, res) => {
  const historial = await Input.find().select('text').sort({ createdAt: -1 })
  return res.status(200).json({ historial });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});