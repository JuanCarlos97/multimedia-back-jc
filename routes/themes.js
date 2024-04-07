const express = require('express');
const router = express.Router();
const themesController = require('../controllers/themesController');
const auth = require('../middleware/authMiddleware');

// Create
router.post('/', auth, themesController.createTheme);

// Get all themes
router.get('/', auth, themesController.getAllThemes);

// Get a theme by ID
router.get('/:id', auth, themesController.getThemeById);

// Update a theme by ID
router.put('/:id', auth, themesController.updateTheme);

// Delete a theme by ID
router.delete('/:id', auth, themesController.deleteTheme);

module.exports = router;
