import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    checkIn: Date,
    checkOut: Date,
    workingHours: { type: Number, default: 0 },
    status: { type: String, enum: ['present', 'late', 'absent', 'leave'], default: 'present' }
}, { timestamps: true });

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);