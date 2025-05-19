const express = require('express');
const router = express.Router();
const dbFunctions = require('../db/dbFunctions.js');

// Update User Route
router.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await dbFunctions.updateUser(userId, updateData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete User Route
router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const isDeleted = await dbFunctions.deleteUser(userId);

        if (!isDeleted) {
            return res.status(404).json({ message: 'User not found or already deleted' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;
