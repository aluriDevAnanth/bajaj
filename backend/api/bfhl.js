const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mime = require('mime-types');

const app = express();
app.use(bodyParser.json());

const userId = 'john_doe_17091999';
const email = 'john@xyz.com';
const rollNumber = 'ABCD123';

app.get('/api/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/api/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().pop()]
    : [];

  let fileValid = false, fileMimeType = '', fileSizeKb = 0;
  if (file_b64) {
    try {
      const fileBuffer = Buffer.from(file_b64, 'base64');
      fileSizeKb = fileBuffer.length / 1024;
      fileMimeType = mime.lookup(fileBuffer);
      fileValid = !!fileMimeType;
    } catch (e) {
      fileValid = false;
    }
  }

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType || 'unknown',
    file_size_kb: fileSizeKb
  });
});

module.exports = app;
