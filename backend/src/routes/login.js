const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbFunctions = require('../db/dbFunctions');

// Login route
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Implement login logic
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Check user exists
    const user = await dbFunctions.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // 4. Generate JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.SECRET_KEY,
        { expiresIn: '1h' });
    console.log("Generated JWT Token:", token);
    // 5. Send response
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});
module.exports = router;