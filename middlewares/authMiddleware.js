const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
};

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const { role } = req.user;
        if (allowedRoles.includes(role)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = {
    verifyToken,
    verifyRoles
};
