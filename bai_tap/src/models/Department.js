const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name không được rỗng'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'code không được rỗng'],
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: 'status chỉ nhận một trong các giá trị: active, inactive'
    },
    default: 'active'
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false 
  }
}, { timestamps: true });

departmentSchema.index({ code: 1 });

module.exports = mongoose.model('Department', departmentSchema);