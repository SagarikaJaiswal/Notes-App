const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User with the same username or email already exists",
      });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Create and sign a JWT token for the new user
    const token = jwt.sign({ username: username, password: password }, secret);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secret
    );
    res.json({ token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
};
