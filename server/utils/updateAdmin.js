const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const { connectDB, disconnectDB } = require('../config/db');

dotenv.config();

const updateAdmin = async () => {
    try {
        await connectDB('utils/updateAdmin');
        // Check if old admin exists
        const oldAdmin = await User.findOne({ role: 'admin' });
        
        if (oldAdmin) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash('latha@2006', 10);
            
            // Update email, name, and password
            await User.findByIdAndUpdate(oldAdmin._id, {
                name: 'Latha',
                email: 'latha@vemu.org',
                password: hashedPassword
            });
            console.log(`✅ Admin updated: latha@vemu.org / latha@2006`);
        } else {
            // Create new admin if none exists
            await User.create({
                name: 'Latha',
                email: 'latha@vemu.org',
                password: 'latha@2006',
                role: 'admin'
            });
            console.log('✅ New admin created: latha@vemu.org / latha@2006');
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exitCode = 1;
    } finally {
        await disconnectDB('utils/updateAdmin');
        process.exit();
    }
};

updateAdmin();
