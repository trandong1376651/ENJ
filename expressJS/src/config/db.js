const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DATABASE_NAME,
    serverSelectionTimeoutMS: 5000,
  });

  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
}

module.exports = connectDB;