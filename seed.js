const mongoose = require('mongoose');
const User = require('./models/user');
const connectDB = require('./config/database');
const bcrypt = require('bcryptjs');

// Users to create
const userTest = {
    username: "UsuarioPrueba",
    email: "test@example.com",
    password: "test1234*",
    role: "admin"
};

const userAdmin = {
    username: "UsuarioAdmin",
    email: "admin@example.com",
    password: "Admin1234*",
    role: "admin"
};

const seedDB = async () => {
    await connectDB();

    try {
        await User.deleteMany({});

        await User.create(userTest);
        await User.create(userAdmin);

        console.log('Datos de prueba insertados en la base de datos.');
    } catch (error) {
        console.error('Error insertando datos de prueba:', error);
    } finally {
        await mongoose.connection.close();
    }
};

seedDB();
