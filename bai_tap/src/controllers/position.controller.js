const Position = require('../models/Position');
const catchAsync = require('../utils/catchAsync');

exports.getPositions = catchAsync(async (req, res) => {
    const positions = await Position.find({ isDeleted: false });
    res.status(200).json({ success: true, count: positions.length, data: positions });
});

exports.getPositionById = catchAsync(async (req, res) => {
    const position = await Position.findOne({ _id: req.params.id, isDeleted: false });
    if (!position) {
        res.status(404);
        throw new Error('Không tìm thấy chức vụ');
    }
    res.status(200).json({ success: true, data: position });
});

exports.createPosition = catchAsync(async (req, res) => {
    const { name, code, description, baseSalary, status } = req.body;
    const position = await Position.create({ name, code, description, baseSalary, status });
    res.status(201).json({ message: 'Thêm chức vụ thành công', data: position });
});

exports.updatePosition = catchAsync(async (req, res) => {
    const position = await Position.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        req.body,
        { new: true, runValidators: true }
    );
    if (!position) {
        res.status(404);
        throw new Error('Không tìm thấy chức vụ để cập nhật');
    }
    res.status(200).json({ message: 'Cập nhật chức vụ thành công', data: position });
});

exports.deletePosition = catchAsync(async (req, res) => {
    const position = await Position.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
    if (!position) {
        res.status(404);
        throw new Error('Không tìm thấy chức vụ để xóa');
    }
    res.status(200).json({ message: 'Xóa mềm chức vụ thành công' });
});