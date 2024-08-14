// Backend/controllers/authController.js
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "User does not exist" });
    }
  
    if (existingUser.password !== password) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    return res.json({ success: true, message: "Login successful", user: existingUser });
  } catch (err) {
 
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
