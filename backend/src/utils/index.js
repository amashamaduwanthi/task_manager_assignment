const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    // TODO: Implement auth middleware

    // 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authorization header missing or invalid'});
    }

    const token = authHeader.split(' ')[1];

    console.log('JWT Secret:', process.env.SECRET_KEY);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT verify error:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
    }

};

module.exports = authMiddleware;
