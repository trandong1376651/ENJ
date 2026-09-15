import Employee from '../models/Employee.js';
import Department from '../models/Department.js';
import Position from '../models/Position.js';

export const getOverview = async (req, res, next) => {
    try {
        const [
            totalEmployees,
            activeEmployees,
            probationEmployees,
            resignedEmployees,
            totalDepartments,
            totalPositions
        ] = await Promise.all([
            Employee.countDocuments({ isDeleted: false }),
            Employee.countDocuments({ status: 'active', isDeleted: false }),
            Employee.countDocuments({ status: 'probation', isDeleted: false }),
            Employee.countDocuments({ status: 'resigned', isDeleted: false }),
            Department.countDocuments({ isDeleted: false }),
            Position.countDocuments({ isDeleted: false })
        ]);

        res.status(200).json({
            message: "Lấy thống kê tổng quan thành công",
            data: {
                totalEmployees,
                activeEmployees,
                probationEmployees,
                resignedEmployees,
                totalDepartments,
                totalPositions
            }
        });
    } catch (error) {
        next(error);
    }
};