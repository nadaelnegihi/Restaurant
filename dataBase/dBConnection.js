const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.dbURI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to database', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

module.exports = connectDB;
