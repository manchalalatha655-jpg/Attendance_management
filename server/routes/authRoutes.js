const express = require('express');
const { 
    register, login, getMe, changePassword, 
    forgotPassword, resetPassword,
    registerValidation, passwordValidation 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/change-password', protect, passwordValidation, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resettoken', resetPassword);

module.exports = router;
