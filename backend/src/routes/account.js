const express = require('express');
const router = express.Router();
const dbFunctions = require('../db/dbFunctions');
const authMiddleware = require('../utils/index');

// Get account details
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. User info not found.' });
    }

    //  Fetch full user details from DB using user.id
    const fullUser = await dbFunctions.getUserById(user.id);
    if (!fullUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Account data retrieved successfully',
      user: {
        id: fullUser._id,
        email: fullUser.email,
        name: fullUser.name,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account', error: error.message });
  }
});

module.exports = router;
