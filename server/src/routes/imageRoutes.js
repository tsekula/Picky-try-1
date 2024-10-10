const express = require('express');
const dataStorageService = require('../services/dataStorageService');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/upload', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const file = req.files.image; // Assuming you're using a middleware like multer to handle file uploads
    
    // Process the file and create the image record
    const image = await dataStorageService.createImage(userId, {
      filename: file.originalname,
      path: file.path,
      // Add any other necessary file information
    });
    
    res.json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId !== req.user.sub) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const images = await dataStorageService.getImagesByUserId(userId);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
});

module.exports = router;
