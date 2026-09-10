exports.errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Lỗi hệ thống Server';

    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} đã tồn tại trong hệ thống`;
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Dữ liệu ID '${err.value}' không hợp lệ`;
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};