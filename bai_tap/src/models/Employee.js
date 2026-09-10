import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    employeeCode: {
        type: String,
        required: [true, 'employeeCode không được rỗng'],
        unique: true,
        trim: true
    },
    fullName: { type: String, required: [true, 'fullName không được rỗng'], trim: true },
    email: {
        type: String,
        required: [true, 'email bắt buộc'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng'],
        lowercase: true
    },
    phone: { type: String, required: [true, 'phone không được rỗng'] },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    dateOfBirth: Date,
    address: String,
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    positionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    salary: { type: Number, min: [0, 'Lương phải lớn hơn hoặc bằng 0'] },
    startDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['probation', 'active', 'inactive', 'resigned'],
        default: 'probation'
    }
}, { timestamps: true });

employeeSchema.index({ fullName: 'text', employeeCode: 'text', email: 'text', phone: 'text' });
employeeSchema.index({ departmentId: 1, positionId: 1, status: 1 });

export default mongoose.model('Employee', employeeSchema);