import Leave from '../models/Leave.js';

export const approveLeave = async (req, res, next) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

        if (leave.status !== 'pending') {
            return res.status(400).json({ message: "Không cho duyệt hoặc từ chối đơn đã được xử lý." });
        }

        leave.status = 'approved';
        await leave.save();

        return res.status(200).json({ message: "Duyệt đơn nghỉ phép thành công", data: leave });
    } catch (error) {
        next(error);
    }
};