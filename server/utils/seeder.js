const dotenv = require('dotenv');
const User = require('../models/User');
const Department = require('../models/Department');
const Class = require('../models/Class');
const Subject = require('../models/Subject');
const { connectDB, disconnectDB } = require('../config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB('utils/seeder');
        // Clear existing data
        await User.deleteMany();
        await Department.deleteMany();
        await Class.deleteMany();
        await Subject.deleteMany();

        // Create Department
        const dept = await Department.create({
            name: 'Computer Science',
            description: 'Department of Computer Science and Engineering'
        });

        // Create Class
        const cls = await Class.create({
            name: 'CS-101',
            department: dept.name,
            year: '2nd',
            section: 'A'
        });

        // Create Subject
        const sub = await Subject.create({
            name: 'Web Development',
            code: 'CS101',
            department: dept._id
        });

        // Create Admin
await User.create({
            name: 'Latha Admin',
            email: 'admin001@vemu.org',
            password: 'latha@2006',
            role: 'admin',
            adminId: 'ADM001'
        });

        // Create Teacher
await User.create({
            name: 'John Smith',
            email: 't101@vemu.org',
            password: 'password123',
            role: 'teacher',
            department: dept.name,
            assignedClass: cls._id,
            subjects: [sub._id],
            employeeId: 'EMP101'
        });

        // Create Student
await User.create({
            name: 'Jane Doe',
            email: 's2023cs01@vemu.org',
            password: 'password123',
            role: 'student',
            department: dept.name,
            assignedClass: cls._id,
            studentId: 'STU123',
            year: 'Year 2'
        });

        // Create HOD
        await User.create({
            name: 'Dr. Rajesh Kumar',
            email: 'hod123@vemu.org',
            password: 'hodpass123',
            role: 'hod',
            department: dept.name
        });

        console.log('✅ Demo Data Seeded Successfully');
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exitCode = 1;
    } finally {
        await disconnectDB('utils/seeder');
        process.exit();
    }
};

seedData();
