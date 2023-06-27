const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`🟢🟢🟢 Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`🔴🔴🔴 Database Connection Error: ${error}`);
  }
};

module.exports = connectDB;
