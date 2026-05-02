const express = require('express');
const { getStudentAttendance, markByQR } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('student'));

router.get('/attendance', getStudentAttendance);
router.post('/attendance/qr', markByQR);

module.exports = router;
