import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req, res, next) => {
    try {
        const { fullName, phone, address, avatarUrl } = req.body;
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, phone, address, avatarUrl },
            { new: true, runValidators: true }
        ).select('-password -role');

        res.status(200).json({
            message: "Cập nhật hồ sơ cá nhân thành công",
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu cũ không chính xác" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Mật khẩu mới tối thiểu 6 ký tự" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        next(error);
    }
};