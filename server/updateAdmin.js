const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('./config/db');

dotenv.config();

const updateAdmin = async () => {
    try {
        await connectDB('updateAdmin');
        const db = require('mongoose').connection.db;
        const usersCollection = db.collection('users');

        // Hash the new password
        const hashedPassword = await bcrypt.hash('admin@2006', 10);

        // Update the admin account
        const result = await usersCollection.updateOne(
            { email: 'admin@vemu.org' },
            { $set: { password: hashedPassword } }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated the admin password to admin@2006!');
        } else {
            console.log('Admin account not found. Creating one...');
            await usersCollection.insertOne({
                name: 'System Admin',
                email: 'admin@vemu.org',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('Successfully created the admin account!');
        }

    } catch (err) {
        console.error(err);
    } finally {
        await disconnectDB('updateAdmin');
    }
};

updateAdmin();
