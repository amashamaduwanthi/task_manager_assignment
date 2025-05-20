const User = require('../model/User');
const Task = require('../model/Task-modal');


const dbFunctions = {
  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  createUser: async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
  },

  getUserById: async (userId) => {
    return await User.findById(userId);
  },

  updateUser: async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  deleteUser: async (userId) => {
    const result = await User.findByIdAndDelete(userId);
    return !!result;
  },
  createTask: async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
  },
  getAllTasks: async () => {
    try {

      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw new Error('Error fetching tasks from DB');
    }
  }
};

module.exports = dbFunctions;
