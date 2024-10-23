// Backend/controllers/userController.js
const User = require('../Models/User');

// Backend/controllers/userController.js


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json({ success: true, users }); // Send back the users
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, message: `User is now ${user.isActive ? 'active' : 'inactive'}` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
