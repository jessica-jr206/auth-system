const express = require('express');
const { registerUser, loginUser, updateProfile, changePassword, getAllUsers, deleteUser, editUserDetails, getAllNews, addNews } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { protectAdmin } = require('../middlewares/roleMiddleware');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

router.post('/login', loginUser);

router.get('/news', getAllNews);

router.post('/add-news', protect, addNews);

router.get('/admin', protect, protectAdmin, (req, res) => {
  res.send('Admin content');
});

router.put('/update-profile', protect, updateProfile);

router.put('/change-password', protect, changePassword);

router.use(protect, protectAdmin);

router.get('/users', getAllUsers);

router.delete('/delete-user/:id', deleteUser);

router.put('/edit-user/:id', editUserDetails);

module.exports = router;
