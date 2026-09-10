const User = require('../models/User');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.register = catchAsync(async (req, res) => {
  const { fullName, email, password, role, status } = req.body;

  const newUser = await User.create({
    fullName,
    email,
    password,
    role,
    status
  });

  res.status(201).json({
    message: 'Đăng ký tài khoản thành công',
    data: {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    }
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Vui lòng nhập đầy đủ email và password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Email hoặc mật khẩu không đúng');
  }

  if (user.status === 'inactive') {
    res.status(403);
    throw new Error('Tài khoản đã bị khóa');
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: 'Đăng nhập thành công',
    token,
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
});

exports.getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});