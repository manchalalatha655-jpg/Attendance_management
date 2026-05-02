const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Get student attendance stats
// @route   GET /api/student/attendance
// @access  Private/Student
const getStudentAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.user._id })
            .populate('subject', 'name code')
            .populate('teacher', 'name')
            .sort('-date');

        // Calculate stats
        const subjects = {};
        attendance.forEach(record => {
            const subId = record.subject._id.toString();
            if (!subjects[subId]) {
                subjects[subId] = { name: record.subject.name, present: 0, total: 0 };
            }
            subjects[subId].total++;
            if (record.status === 'Present') subjects[subId].present++;
        });

        const stats = Object.keys(subjects).map(id => ({
            subjectId: id,
            ...subjects[id],
            percentage: (subjects[id].present / subjects[id].total * 100).toFixed(2)
        }));

        res.json({ attendance, stats });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Mark attendance via QR Scan
// @route   POST /api/student/attendance/qr
// @access  Private/Student
const markByQR = async (req, res) => {
    const { classId, subjectId } = req.body;
    try {
        const attendance = await Attendance.create({
            student: req.user._id,
            status: 'Present',
            subject: subjectId,
            class: classId,
            date: new Date()
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getStudentAttendance, markByQR };
