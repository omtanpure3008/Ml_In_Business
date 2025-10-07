const { User, validateUser } = require('../models/UserModel.js');
const bcrypt = require('bcrypt');


// Login logic goes here...

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required', status: false });
  }

  // const error = validateUser({ email, password });

  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message, status: false });
  // }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email', status: false });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password', status: false });
  }

  // Login successful
  res.status(200).json({ message: 'Login successful', status: true, user: { name: user.name, email: user.email } });
};


// Handle Register logic goes here...

const handleRegister = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required', status: false });
  }

  const error = validateUser({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message, status: false });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists', status: false });
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Further registration logic goes here (e.g., hashing password, saving user to DB)
  const newUser = new User({ name, email, password: hashedPassword });
  console.log('Registering user:', newUser);
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully', status: true });
};

module.exports = {
  handleLogin,
  handleRegister
};