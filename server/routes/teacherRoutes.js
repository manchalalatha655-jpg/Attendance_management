const express = require('express');
const { markAttendance, getTeacherReports, getTeacherAssignments } = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('teacher'));

router.post('/attendance', markAttendance);
router.get('/reports', getTeacherReports);
router.get('/assignments', getTeacherAssignments);

module.exports = router;
