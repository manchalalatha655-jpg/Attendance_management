const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Add a new teacher
exports.addTeacher = async (req, res) => {
    try {
        const { name, email, phone, department, qualification, password } = req.body;
        
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Teacher with this email already exists' });
        }

        const teacher = new User({
            name,
            email,
            phone,
            department,
            qualification,
            password, // Password hashing is handled by User model pre-save hook
            role: 'teacher'
        });

        await teacher.save();
        res.status(201).json({ message: 'Teacher added successfully', data: teacher });
    } catch (err) {
        res.status(500).json({ message: 'Error adding teacher', error: err.message });
    }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' })
            .populate('department')
            .populate('subjects')
            .populate('assignedClass');
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teachers', error: err.message });
    }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
    try {
        const updatedTeacher = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Teacher updated successfully', data: updatedTeacher });
    } catch (err) {
        res.status(500).json({ message: 'Error updating teacher', error: err.message });
    }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting teacher', error: err.message });
    }
};

// Assign Subjects
exports.assignSubjects = async (req, res) => {
    try {
        const { subjectIds } = req.body;
        const updatedTeacher = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { subjects: subjectIds } },
            { new: true }
        );
        res.status(200).json({ message: 'Subjects assigned successfully', data: updatedTeacher });
    } catch (err) {
        res.status(500).json({ message: 'Error assigning subjects', error: err.message });
    }
};

// Assign Classes
exports.assignClasses = async (req, res) => {
    try {
        const { classId } = req.body;
        const teacherId = req.params.id;

        // Update Teacher: set assignedClass
        const updatedTeacher = await User.findByIdAndUpdate(
            teacherId,
            { $set: { assignedClass: classId } },
            { new: true }
        );

        // Update Class: add teacher to the list (using $addToSet to avoid duplicates)
        if (classId) {
            const Class = require('../models/Class');
            await Class.findByIdAndUpdate(
                classId,
                { $addToSet: { teachers: teacherId } }
            );
        }

        res.status(200).json({ message: 'Class assigned successfully', data: updatedTeacher });
    } catch (err) {
        res.status(500).json({ message: 'Error assigning class', error: err.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
};
