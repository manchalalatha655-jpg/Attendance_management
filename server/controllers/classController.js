const Class = require('../models/Class');
const User = require('../models/User');

// Create a new class
exports.createClass = async (req, res) => {
    try {
        const { name, department, year, section } = req.body;
        const newClass = new Class({ name, department, year, section });
        await newClass.save();
        res.status(201).json({ message: 'Class created successfully', data: newClass });
    } catch (err) {
        res.status(500).json({ message: 'Error creating class', error: err.message });
    }
};

// Get all classes
exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('teachers subjects students');
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
};

// Allocate Students to Class
exports.allocateStudents = async (req, res) => {
    try {
        const { studentIds } = req.body;
        
        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ message: 'No student IDs provided' });
        }

        // Update Class: add students to the list (using $addToSet to avoid duplicates)
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { students: { $each: studentIds } } },
            { new: true }
        );

        // Update each User: set assignedClass
        await User.updateMany(
            { _id: { $in: studentIds } },
            { $set: { assignedClass: req.params.id } }
        );

        res.status(200).json({ message: 'Students allocated successfully', data: updatedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error allocating students', error: err.message });
    }
};

// Update a class
exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Class updated successfully', data: updatedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error updating class', error: err.message });
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting class', error: err.message });
    }
};

// Assign Subjects to Class
exports.assignSubjects = async (req, res) => {
    try {
        const { subjectIds } = req.body;
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { $set: { subjects: subjectIds } },
            { new: true }
        );
        res.status(200).json({ message: 'Subjects assigned successfully', data: updatedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error assigning subjects', error: err.message });
    }
};

// Assign Teacher to Class
exports.assignTeacher = async (req, res) => {
    try {
        const { teacherId, teacherIds } = req.body;
        const idsToAssign = teacherIds || (teacherId ? [teacherId] : []);

        if (idsToAssign.length === 0) {
            return res.status(400).json({ message: 'No teacher ID provided' });
        }

        // Update Class: add teachers to the list (using $addToSet to avoid duplicates)
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { teachers: { $each: idsToAssign } } },
            { new: true }
        );

        // Update each User: set assignedClass
        await User.updateMany(
            { _id: { $in: idsToAssign } },
            { $set: { assignedClass: req.params.id } }
        );

        res.status(200).json({ message: 'Teachers assigned successfully', data: updatedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error assigning teacher', error: err.message });
    }
};

// Update Timetable
exports.updateTimetable = async (req, res) => {
    try {
        const { timetable } = req.body;
        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { $set: { timetable: timetable } },
            { new: true }
        );
        res.status(200).json({ message: 'Timetable updated successfully', data: updatedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error updating timetable', error: err.message });
    }
};
