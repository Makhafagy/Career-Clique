// middleware/authMiddleware.js

const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) return res.status(403).json({ error: 'Forbidden' })
    req.user = decodedToken
    next()
  })
}

module.exports = { authenticateToken }
