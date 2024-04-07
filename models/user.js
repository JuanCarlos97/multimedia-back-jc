const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Schema to User
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'reader', 'creator'],
        default: 'reader'
    }
}, {
    timestamps: true // We add createdAt and updatedAt
});

// Mongoose middleware to hash password before saving user
UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    // new password
    user.password = hash;
    next();
});


module.exports = mongoose.model('User', UserSchema);
