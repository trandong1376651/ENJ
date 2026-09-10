import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
    return jwt.sign(
        {
            id: payload._id,
            employeeCode: payload.employeeCode,
            role: payload.role || 'staff',
            departmentId: payload.departmentId
        },
        process.env.JWT_SECRET || 'SUPER_SECRET_KEY_NODE_MASTER',
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};