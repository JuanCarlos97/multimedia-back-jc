const express = require('express');
const router = express.Router();
const contentsController = require('../controllers/contentsController');
const auth = require('../middleware/authMiddleware');

// Create
router.post('/', auth, contentsController.addContent);

// Get all contents
// router.get('/', auth, contentsController.getAllContents);

// Get content by ID
router.get('/:id', auth, contentsController.getContentById);

// Update content by ID
router.put('/:id', auth, contentsController.updateContent);

// Delete content by ID
router.delete('/:id', auth, contentsController.deleteContent);

// Search content by theme
router.get('/theme/:themeId', auth, contentsController.findByTheme);

// Search content by name
router.get('/', contentsController.searchByName);

// Search content by type
router.get('/type/:type', auth, contentsController.findByType);

module.exports = router;
