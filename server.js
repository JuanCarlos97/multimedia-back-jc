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

// Connect to database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/themes', themesRoutes);
app.use('/api/contents', contentsRoutes);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
