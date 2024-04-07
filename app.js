const cors = require('cors');
const express = require('express');
const connectDB = require('./config/database');
const usersRoutes = require('./routes/users');
const themesRoutes = require('./routes/themes');
const contentsRoutes = require('./routes/contents');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001'
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
