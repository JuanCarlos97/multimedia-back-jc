const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // We get the header token
    const token = req.header('x-auth-token');

    // Check if there is no token
    if (!token) {
        return res.status(401).json({ msg: 'Autorización denegada' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
