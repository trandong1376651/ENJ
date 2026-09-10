import Employee from '../models/Employee.js';
import Department from '../models/Department.js';
import Position from '../models/Position.js';

export const getEmployees = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, keyword, departmentId, positionId, status, gender, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        const query = {};

        if (keyword) {
            query.$or = [
                { employeeCode: { $regex: keyword, $options: 'i' } },
                { fullName: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } },
                { phone: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (departmentId) query.departmentId = departmentId;
        if (positionId) query.positionId = positionId;
        if (status) query.status = status;
        if (gender) query.gender = gender;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const sort = {};
        if (['fullName', 'salary', 'startDate', 'createdAt'].includes(sortBy)) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }

        const [employees, totalItems] = await Promise.all([
            Employee.find(query)
                .populate('departmentId', 'name code')
                .populate('positionId', 'name code')
                .populate('managerId', 'fullName employeeCode')
                .sort(sort)
                .skip(skip)
                .limit(limitNum)
                .lean(),
            Employee.countDocuments(query)
        ]);

        return res.status(200).json({
            message: "Lấy danh sách nhân viên thành công",
            data: employees,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalItems,
                totalPages: Math.ceil(totalItems / limitNum)
            }
        });
    } catch (error) {
        next(error);
    }
};

export const softDeleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { status: 'inactive' },
            { new: true }
        );
        if (!employee) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
        return res.status(200).json({ message: "Xóa mềm nhân viên thành công", data: employee });
    } catch (error) {
        next(error);
    }
};

export const checkDepartmentBeforeDelete = async (req, res, next) => {
    const count = await Employee.countDocuments({ departmentId: req.params.id, status: 'active' });
    if (count > 0) {
        return res.status(400).json({ message: "Không cho xóa phòng ban nếu vẫn còn nhân viên active." });
    }
    next();
};