const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Get notifications for logged in user
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        const notifications = [];
        
        // If user is a student, check for low attendance
        if (req.user.role === 'student') {
            const studentId = req.user._id;
            
            // This is a simplified calculation for the demo
            // In a real app, you'd aggregate subject-wise stats
            const attendance = await Attendance.find({ student: studentId });
            const total = attendance.length;
            const present = attendance.filter(a => a.status === 'Present').length;
            const percentage = total > 0 ? (present / total) * 100 : 100;

            if (percentage < 75) {
                notifications.push({
                    type: 'warning',
                    message: `Low Attendance Alert: Your current attendance is ${percentage.toFixed(1)}%. Please contact your HOD.`,
                    date: new Date()
                });
            }
        }

        // Add general system notifications
        notifications.push({
            type: 'info',
            message: 'Welcome to the Student Attendance Management System v2.1',
            date: new Date()
        });

        res.json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getNotifications };
