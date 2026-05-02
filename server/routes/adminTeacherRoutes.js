const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/adminTeacherController');

// All routes are protected and for admin
router.post('/', teacherController.addTeacher);
router.get('/', teacherController.getAllTeachers);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

router.post('/:id/subjects', teacherController.assignSubjects);
router.post('/:id/classes', teacherController.assignClasses);
router.post('/:id/reset-password', teacherController.resetPassword);

module.exports = router;
