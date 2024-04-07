const Content = require('../models/content');
const Theme = require('../models/theme');

// Create
exports.addContent = async (req, res) => {
    try {
        const newContent = new Content({
            ...req.body,
            user: req.user.id,
        });
        const savedContent = await newContent.save();
        res.json(savedContent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Get all contents
exports.getAllContents = async (req, res) => {
    try {
        const contents = await Content.find().populate('theme user', '-password').sort({ createdAt: -1 });
        res.json(contents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Get content by ID
exports.getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id).populate('theme user', '-password');

        if (!content) {
            return res.status(404).json({ msg: 'Contenido no encontrado' });
        }

        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Update content by ID
exports.updateContent = async (req, res) => {
    try {
        let content = await Content.findById(req.params.id);

        if (!content) {
            return res.status(404).json({ msg: 'Contenido no encontrado' });
        }

        content = await Content.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(content);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Delete content by ID
exports.deleteContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);

        if (!content) {
            return res.status(404).json({ msg: 'Contenido no encontrado' });
        }

        res.json({ msg: 'Contenido eliminado' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Contenido no encontrado' });
        }
        res.status(500).send('Error del servidor');
    }
};

// Search content by theme
exports.findByTheme = async (req, res) => {
    try {
        const contents = await Content.find({ theme: req.params.themeId }).sort({ createdAt: -1 });
        res.json(contents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};

// Search content by name, url, or credits
exports.searchByName = async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};

        if (name) {
            query = {
                $or: [
                    { url: { $regex: name, $options: 'i' } },
                    { text: { $regex: name, $options: 'i' } },
                    { credits: { $regex: name, $options: 'i' } }
                ]
            };
        }

        const contents = await Content.find(query).populate('theme', 'name').sort({ createdAt: -1 });

        res.json(contents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};


// Search content by type
exports.findByType = async (req, res) => {
    try {
        const contents = await Content.find({ type: req.params.type }).sort({ createdAt: -1 });
        res.json(contents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
