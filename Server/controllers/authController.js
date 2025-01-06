const bcrypt = require('bcryptjs');
const fs = require('fs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const usersDataPath = path.join(__dirname, '../data/users.json');
const newsDataPath = path.join(__dirname, '../data/newsData.json');

const getUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersDataPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users data:', err);
    return [];
  }
};

const getNewsFromFile = () => {
  try {
    const data = fs.readFileSync(newsDataPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users data:', err);
    return [];
  }
};

const saveUsersToFile = (users) => {
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5h' });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const users = getUsersFromFile();
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    username: name,
    email,
    password: await bcrypt.hash(password, 10),
    role: 'user',  // You can change this if you want to assign specific roles
    isActive: true,
  };

  users.push(newUser);
  saveUsersToFile(users);

  const token = generateToken(newUser.id);
  res.status(201).json({ token, user: newUser });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const users = getUsersFromFile();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.json({ token, user });
};

// Update user profile
const updateProfile = (req, res) => {
  const { username, email } = req.body;
  const userId = req.user.id;

  const users = getUsersFromFile();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.username = username || user.username;
  user.email = email || user.email;

  saveUsersToFile(users);

  res.json({ message: 'Profile updated successfully', user });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'New password and confirm password do not match' });
  }

  const users = getUsersFromFile();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  saveUsersToFile(users);

  res.json({ message: 'Password changed successfully' });
};

const getAllUsers = (req, res) => {
  const users = getUsersFromFile();

  const filteredUsers = users.filter(user => user.role !== 'admin');

  res.json(filteredUsers);
};

const getAllNews = (req, res) => {
  const news = getNewsFromFile();

  res.json(news);
};


const deleteUser = (req, res) => {
  const userId = req.params.id;

  const users = getUsersFromFile();
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  saveUsersToFile(users);

  res.json({ message: 'User deleted successfully' });
};

const editUserDetails = (req, res) => {
  const { username, email, role, isActive } = req.body;
  const userId = req.params.id;

  const users = getUsersFromFile();
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.username = username || user.username;
  user.email = email || user.email;
  user.role = role || user.role; 
  user.isActive = isActive !== undefined ? isActive : user.isActive; 

  saveUsersToFile(users);

  res.json({ message: 'User details updated successfully', user });
};


const addNews = (req, res) => {
  const { title, description, photo } = req.body; 
  if (!title || !description || !photo) {
    return res.status(400).json({ message: 'Title, description, and photo are required' });
  }

  const news = getNewsFromFile();

  const newNews = {
    id: news.length + 1, 
    title,
    description,
    photo, 
    createdAt: new Date(),
  };

  news.push(newNews);

  fs.writeFileSync(newsDataPath, JSON.stringify(news, null, 2));

  res.status(201).json({ message: 'News added successfully', news: newNews });
};


module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteUser,
  editUserDetails,
  getAllNews,
  addNews
};
