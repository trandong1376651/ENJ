const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

function createServiceError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
}

async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw createServiceError("Name, email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createServiceError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return sanitizeUser(user);
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw createServiceError("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createServiceError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createServiceError("Invalid email or password", 401);
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user),
  };
}

async function getCurrentUser(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createServiceError("Invalid user id");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw createServiceError("User not found", 404);
  }

  return sanitizeUser(user);
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};