const User = require('../model/User');

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
  }
};

module.exports = dbFunctions;
