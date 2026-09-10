const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const departmentRoutes = require('./routes/department.routes');
const positionRoutes = require('./routes/position.routes');

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/positions', positionRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: `Đường dẫn ${req.originalUrl} không tồn tại trên Server` });
});

app.use(errorHandler);

module.exports = app;