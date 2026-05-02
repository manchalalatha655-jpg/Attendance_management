const mongoose = require('mongoose');

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables.');
  }
  return uri;
};

const connectDB = async (context = 'app') => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = getMongoUri();
  await mongoose.connect(uri);
  console.log(`✅ MongoDB connected (${context})`);
  return mongoose.connection;
};

const disconnectDB = async (context = 'app') => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.connection.close();
  console.log(`🔌 MongoDB disconnected (${context})`);
};

module.exports = {
  connectDB,
  disconnectDB,
};
