const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const registerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    body('email')
        .notEmpty().withMessage('Email required')
        .isEmail().withMessage('Please use a valid email address')
        .normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role').isIn(['admin', 'hod', 'teacher', 'student', 'librarian']).withMessage('Invalid role'),
    validateRequest
];

const passwordValidation = [
    body('old').notEmpty().withMessage('Current password is required'),
    body('new').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
    validateRequest
];

const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || 'vemu_academic_portal_default_secret_2024';
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                token: generateToken(user._id),
                department: user.department,
            });
        } else {
            res.status(401).json({ message: 'Invalid username/email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Private/Admin
const register = async (req, res) => {
    const { name, email, password, role, department, studentId, assignedClass, subjects, year, employeeId, adminId, accessCode, phone, username } = req.body;
    try {
    // Enhanced Admin verification - change code in production
    const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || '5566';
    if (role === 'admin' && accessCode !== ADMIN_ACCESS_CODE) {
        return res.status(403).json({ message: 'Invalid Admin Access Code. Contact existing administrator for verification.' });
    }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        if (username) {
            const usernameExists = await User.findOne({ username: username.toLowerCase().trim() });
            if (usernameExists) return res.status(400).json({ message: 'Username already taken' });
        }

        const user = await User.create({
            name, email, password, role, department, studentId, assignedClass, subjects, year, employeeId, adminId, phone, username
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('department subjects assignedClass');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
    const { old, new: newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const isMatch = await user.comparePassword(old);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that email' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // In a real app, send email here. For now, we return the token
        res.json({ 
            message: 'Password reset link generated (SIMULATED EMAIL)',
            resetToken: resetToken // Only returning for demonstration
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password/:resettoken
// @access  Public
const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.json({ message: 'Password reset successful. You can now login.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login, register, getMe, changePassword, forgotPassword, resetPassword, registerValidation, passwordValidation };
