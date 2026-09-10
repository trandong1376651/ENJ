import Attendance from '../models/Attendance.js';

const getStartOfDay = (date = new Date()) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

export const checkIn = async (req, res, next) => {
    try {
        const employeeId = req.user.employeeId || req.body.employeeId;
        const today = getStartOfDay();

        const existing = await Attendance.findOne({ employeeId, date: today });
        if (existing) {
            return res.status(400).json({ message: "Một nhân viên chỉ được check-in một lần trong một ngày." });
        }

        const now = new Date();
        const status = now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 30) ? 'late' : 'present';

        const attendance = await Attendance.create({
            employeeId,
            date: today,
            checkIn: now,
            status
        });

        return res.status(201).json({
            message: "Check-in thành công",
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};

export const checkOut = async (req, res, next) => {
    try {
        const employeeId = req.user.employeeId || req.body.employeeId;
        const today = getStartOfDay();

        const attendance = await Attendance.findOne({ employeeId, date: today });

        if (!attendance || !attendance.checkIn) {
            return res.status(400).json({ message: "Không được check-out nếu chưa check-in." });
        }

        if (attendance.checkOut) {
            return res.status(400).json({ message: "Không được check-out nhiều lần trong cùng một ngày." });
        }

        const now = new Date();
        const diffMs = now - new Date(attendance.checkIn);
        const workingHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));

        attendance.checkOut = now;
        attendance.workingHours = workingHours;
        await attendance.save();

        return res.status(200).json({
            message: "Check-out thành công",
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};