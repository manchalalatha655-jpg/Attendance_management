/**
 * Server Entry Point for Render Deployment
 * This file acts as the main entry point for the backend server
 * 
 * For Render deployment, use:
 * - Build Command: npm install
 * - Start Command: npm start
 * - Root Directory: . (root of the project)
 */

require('dotenv').config();

const { connectDB } = require('./server/config/db');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 10000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Import routes from server folder
const authRoutes = require('./server/routes/authRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const teacherRoutes = require('./server/routes/teacherRoutes');
const studentRoutes = require('./server/routes/studentRoutes');
const classRoutes = require('./server/routes/classRoutes');
const adminTeacherRoutes = require('./server/routes/adminTeacherRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/teachers-manage', adminTeacherRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/notifications', require('./server/routes/notificationRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('Attendance Management System API is running...');
});

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server only after DB is connected
connectDB('server')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
