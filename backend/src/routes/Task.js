const dbFunctions = require('../db/dbFunctions.js');
const express = require('express');
const router = express.Router();


router.post('/createTask', async (req, res) => {
    try {
        const { title, description, deadline, assignedTo, status } = req.body;


        if (!title || !deadline || !assignedTo) {
            return res.status(400).json({ message: "Title, deadline, and assignedTo are required." });
        }



        const addNewTask = await dbFunctions.createTask({
            title,
            description,
            deadline,
            assignedTo,
            status,
            }

        );


        return res.status(201).json(addNewTask);
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get('/getAllTasks', async (req, res) => {
    try {
        const tasks = await dbFunctions.getAllTasks();
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})
module.exports = router;