const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contentPermissions: {
        images: { type: Boolean, default: false },
        videos: { type: Boolean, default: false },
        texts: { type: Boolean, default: false }
    },
    accessPermissions: {
        read: [{ type: String, enum: ['admin', 'reader', 'creator'] }],
        write: [{ type: String, enum: ['admin', 'creator'] }]
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Theme', ThemeSchema);
