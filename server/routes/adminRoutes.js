const express = require('express');
const { getAdminStats, addDepartment, addClass, addSubject, getUsers, deleteUser, getDepartmentAnalytics, updateUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/analytics/departments', getDepartmentAnalytics);
router.put('/users/:id', updateUser);
router.post('/departments', addDepartment);
router.get('/departments', require('../controllers/adminController').getDepartments);
router.delete('/departments/:id', require('../controllers/adminController').deleteDepartment);
router.post('/classes', addClass);
router.post('/subjects', addSubject);

module.exports = router;
