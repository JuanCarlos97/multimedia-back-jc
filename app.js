const cors = require('cors');
const express = require('express');
const connectDB = require('./config/database');
const usersRoutes = require('./routes/users');
const themesRoutes = require('./routes/themes');
const contentsRoutes = require('./routes/contents');

const app = express();

const allowedOrigins = [
    'http://localhost:3001', // Localhost to dev
    'https://pruebatecnica-7946d.web.app' // Production
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'La política de CORS para este sitio no permite acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use(express.json({ extended: false }));

app.use('/api/users', usersRoutes);
app.use('/api/themes', themesRoutes);
app.use('/api/contents', contentsRoutes);

app.get('/', (req, res) => res.send('API Running'));

module.exports = app;
