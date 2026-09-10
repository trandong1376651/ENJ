import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    leaveType: { type: String, enum: ['annual', 'sick', 'unpaid'], required: true },
    startDate: { type: Date, required: true },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) { return v >= this.startDate; },
            message: 'endDate phải lớn hơn hoặc bằng startDate'
        }
    },
    reason: { type: String, required: [true, 'reason không được rỗng'] },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

leaveSchema.index({ employeeId: 1, status: 1 });

export default mongoose.model('Leave', leaveSchema);