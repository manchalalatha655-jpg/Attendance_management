const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('./config/db');

dotenv.config();

connectDB('updateEmail')
  .then(async () => {
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check if the user exists
    const result = await usersCollection.updateOne(
      { email: 'admin001@vemu.org' },
      { $set: { email: 'admin@vemu.org' } }
    );
    
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);
    
    await disconnectDB('updateEmail');
  })
  .catch(err => {
    console.error('Error connecting to DB:', err);
    process.exit(1);
  });
