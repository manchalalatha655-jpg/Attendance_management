const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Mark Attendance
exports.markAttendance = async (req, res) => {
    try {
        const { students, subjectId, classId, date } = req.body;
        const teacherId = req.user._id;

        const attendance = new Attendance({
            teacher: teacherId,
            class: classId,
            subject: subjectId,
            date: date || new Date(),
            students: students.map(s => ({
                student: s.studentId,
                status: s.status
            }))
        });

        await attendance.save();
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error marking attendance', error: err.message });
    }
};

// Get Teacher Assignments (Class and Subjects)
exports.getTeacherAssignments = async (req, res) => {
    try {
        const teacher = await User.findById(req.user._id)
            .populate({
                path: 'assignedClass',
                select: 'name department'
            })
            .populate('subjects');
        
        res.status(200).json({
            class: teacher.assignedClass,
            subjects: teacher.subjects
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching assignments', error: err.message });
    }
};

// Get Teacher Reports
exports.getTeacherReports = async (req, res) => {
    try {
        const reports = await Attendance.find({ teacher: req.user._id })
            .populate('class')
            .populate('subject');
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reports', error: err.message });
    }
};
