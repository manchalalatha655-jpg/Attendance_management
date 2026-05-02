const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('./config/db');

dotenv.config();

const seedHODs = async () => {
    try {
        await connectDB('seedHODs');
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        const hods = [
            {
                name: 'HOD CSE',
                email: 'hodcse@vemu.org',
                password: await bcrypt.hash('hodcse@2006', 10),
                role: 'hod',
                department: 'Computer Science',
                hodId: 'HOD-CSE-01',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'HOD ECE',
                email: 'hodece@vemu.org',
                password: await bcrypt.hash('hodece@2006', 10),
                role: 'hod',
                department: 'Electronics',
                hodId: 'HOD-ECE-01',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'HOD MECH',
                email: 'hodmech@vemu.org',
                password: await bcrypt.hash('hodmech@2006', 10),
                role: 'hod',
                department: 'Mechanical',
                hodId: 'HOD-MECH-01',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'HOD CIVIL',
                email: 'hodcivil@vemu.org',
                password: await bcrypt.hash('hodcivil@2006', 10),
                role: 'hod',
                department: 'Civil',
                hodId: 'HOD-CIVIL-01',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        // Delete any existing accounts with these emails to prevent duplicates
        await usersCollection.deleteMany({ email: { $in: hods.map(h => h.email) } });
        
        await usersCollection.insertMany(hods);
        console.log('Successfully created all department HOD accounts!');
        
    } catch (err) {
        console.error(err);
    } finally {
        await disconnectDB('seedHODs');
    }
};

seedHODs();
