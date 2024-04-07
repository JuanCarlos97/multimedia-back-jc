const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video', 'text'],
        required: true
    },
    url: {
        type: String, // Used for images and videos
        required: function () { return this.type !== 'text'; }
    },
    text: {
        type: String, // Used for text documents
        required: function () { return this.type === 'text'; }
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    credits: String, // Creator username or alias
}, { timestamps: true });

module.exports = mongoose.model('Content', ContentSchema);
