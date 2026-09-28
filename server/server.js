const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

const upload = multer({
  dest: 'uploads/'
});

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/generate', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'Image required'
    });
  }

  // Yahan baad mein image-to-video AI API connect ki ja sakti hai.
  return res.json({
    message: 'Image uploaded successfully',
    filename: req.file.filename
  });
});

app.listen(3000, () => {
  console.log('FaceSwipe AI running on http://localhost:3000');
});
