const Department = require('../models/Department');
const catchAsync = require('../utils/catchAsync');

exports.getDepartments = catchAsync(async (req, res) => {
    const departments = await Department.find({ isDeleted: false });
    res.status(200).json({ success: true, count: departments.length, data: departments });
});

exports.getDepartmentById = catchAsync(async (req, res) => {
    const department = await Department.findOne({ _id: req.params.id, isDeleted: false });
    if (!department) {
        res.status(404);
        throw new Error('Không tìm thấy phòng ban');
    }
    res.status(200).json({ success: true, data: department });
});

exports.createDepartment = catchAsync(async (req, res) => {
    const { name, code, description, status } = req.body;
    const department = await Department.create({ name, code, description, status });
    res.status(201).json({ message: 'Thêm phòng ban thành công', data: department });
});

exports.updateDepartment = catchAsync(async (req, res) => {
    const department = await Department.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        req.body,
        { new: true, runValidators: true }
    );
    if (!department) {
        res.status(404);
        throw new Error('Không tìm thấy phòng ban để cập nhật');
    }
    res.status(200).json({ message: 'Cập nhật phòng ban thành công', data: department });
});

exports.deleteDepartment = catchAsync(async (req, res) => {
    const department = await Department.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
    if (!department) {
        res.status(404);
        throw new Error('Không tìm thấy phòng ban để xóa');
    }
    res.status(200).json({ message: 'Xóa mềm phòng ban thành công' });
});