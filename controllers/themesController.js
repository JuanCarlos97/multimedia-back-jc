const Theme = require('../models/theme');

// Create a theme
exports.createTheme = async (req, res) => {
    try {
        let theme = new Theme(req.body);
        await theme.save();
        res.json(theme);
    } catch (err) {
        if (err.code === 11000) {
            // Si el código de error es 11000, significa que esta duplicado.
            return res.status(400).json({ msg: 'Tematica duplicada.' });
        }
        res.status(500).send('Error del servidor');
    }
};

// Get themes
exports.getAllThemes = async (req, res) => {
    try {
        const themes = await Theme.find();
        res.json(themes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Get a theme by ID
exports.getThemeById = async (req, res) => {
    try {
        const theme = await Theme.findById(req.params.id);

        if (!theme) {
            return res.status(404).json({ msg: 'Temática no encontrada' });
        }

        res.json(theme);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Temática no encontrada' });
        }
        res.status(500).send('Error del servidor');
    }
};

// Update a theme by ID
exports.updateTheme = async (req, res) => {
    try {
        let theme = await Theme.findById(req.params.id);

        if (!theme) {
            return res.status(404).json({ msg: 'Temática no encontrada' });
        }

        theme = await Theme.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.json(theme);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Delete a theme by ID
exports.deleteTheme = async (req, res) => {
    try {
        const theme = await Theme.findByIdAndDelete(req.params.id);

        if (!theme) {
            return res.status(404).json({ msg: 'Temática no encontrada' });
        }

        res.json({ msg: 'Temática eliminada' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Temática no encontrada' });
        }
        res.status(500).send('Error del servidor');
    }
};
