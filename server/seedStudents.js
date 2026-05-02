const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('./config/db');

dotenv.config();

const seedStudents = async () => {
    try {
        await connectDB('seedStudents');
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        const students = [
            {
                name: 'Alice Smith',
                email: 'alice@gmail.com',
                password: await bcrypt.hash('alice1234', 10),
                role: 'student',
                studentId: '1001',
                year: '1st Year',
                department: 'Computer Science',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Bob Johnson',
                email: 'bob@gmail.com',
                password: await bcrypt.hash('bob12345', 10),
                role: 'student',
                studentId: '1002',
                year: '2nd Year',
                department: 'Electronics',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Charlie Brown',
                email: 'charlie@gmail.com',
                password: await bcrypt.hash('charlie123', 10),
                role: 'student',
                studentId: '1003',
                year: '3rd Year',
                department: 'Mechanical',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        // Delete existing ones to avoid duplicates if run multiple times
        await usersCollection.deleteMany({ email: { $in: students.map(s => s.email) } });
        
        await usersCollection.insertMany(students);
        console.log('Successfully seeded 3 new students!');
        
    } catch (err) {
        console.error(err);
    } finally {
        await disconnectDB('seedStudents');
    }
};

seedStudents();
