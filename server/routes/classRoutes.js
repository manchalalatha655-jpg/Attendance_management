const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// All routes are protected and for admin (middleware can be added here)
router.post('/', classController.createClass);
router.get('/', classController.getClasses);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

router.post('/:id/subjects', classController.assignSubjects);
router.post('/:id/assign-teacher', classController.assignTeacher);
router.post('/:id/students', classController.allocateStudents);
router.post('/:id/timetable', classController.updateTimetable);

module.exports = router;
