const User = require('../models/User');
const Department = require('../models/Department');
const Subject = require('../models/Subject');
const Class = require('../models/Class');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalTeachers = await User.countDocuments({ role: 'teacher' });
        const totalDepartments = await Department.countDocuments();
        const totalSubjects = await Subject.countDocuments();

        res.json({
            totalStudents,
            totalTeachers,
            totalDepartments,
            totalSubjects
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add Department
// @route   POST /api/admin/departments
// @access  Private/Admin
const addDepartment = async (req, res) => {
    try {
        const dept = await Department.create(req.body);
        res.status(201).json(dept);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get All Departments
// @route   GET /api/admin/departments
// @access  Private/Admin
const getDepartments = async (req, res) => {
    try {
        const depts = await Department.find();
        res.json(depts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete Department
// @route   DELETE /api/admin/departments/:id
// @access  Private/Admin
const deleteDepartment = async (req, res) => {
    try {
        const dept = await Department.findById(req.params.id);
        if (dept) {
            await Department.deleteOne({ _id: req.params.id });
            res.json({ message: 'Department removed' });
        } else {
            res.status(404).json({ message: 'Department not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add Class
// @route   POST /api/admin/classes
// @access  Private/Admin
const addClass = async (req, res) => {
    try {
        const cls = await Class.create(req.body);
        res.status(201).json(cls);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add Subject
// @route   POST /api/admin/subjects
// @access  Private/Admin
const addSubject = async (req, res) => {
    try {
        const sub = await Subject.create(req.body);
        res.status(201).json(sub);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get All Users with Filters
const getUsers = async (req, res) => {
    const { role, department } = req.query;
    const query = {};
    if (role) query.role = role;
    if (department) query.department = department;

    try {
        const users = await User.find(query).populate('department').select('-password');
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne({ _id: req.params.id });
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get Department Analytics
// @route   GET /api/admin/analytics/departments
// @access  Private/Admin
const getDepartmentAnalytics = async (req, res) => {
    const Attendance = require('../models/Attendance');
    try {
        const analytics = await Attendance.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'student',
                    foreignField: '_id', // Wait, attendance has student ref, student has department ref.
                    // Actually attendance has class and subject, class has department.
                    from: 'classes',
                    localField: 'class',
                    foreignField: '_id',
                    as: 'class_info'
                }
            },
            { $unwind: '$class_info' },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'class_info.department',
                    foreignField: '_id',
                    as: 'dept_info'
                }
            },
            { $unwind: '$dept_info' },
            {
                $group: {
                    _id: '$dept_info.name',
                    present: { $sum: { $cond: [{ $eq: ['$status', 'Present'] }, 1, 0] } },
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    name: '$_id',
                    percentage: { $multiply: [{ $divide: ['$present', '$total'] }, 100] }
                }
            }
        ]);
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    getAdminStats, 
    addDepartment, 
    getDepartments,
    deleteDepartment,
    addClass, 
    addSubject, 
    getUsers, 
    deleteUser, 
    getDepartmentAnalytics, 
    updateUser 
};

