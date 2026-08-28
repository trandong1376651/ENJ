const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const courses = [
    { id: 1, name: "HTML & CSS", price: 1500000 },
    { id: 2, name: "JavaScript", price: 2500000 },
    { id: 3, name: "Node.js", price: 3000000 }
];

let totalRequests = 0;

app.use((req, res, next) => {
    totalRequests++;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Total: ${totalRequests}`);
    next(); 
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const renderHTML = (title, body) => `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body><div class="container">${body}</div></body>
    </html>
`;

app.get('/', (req, res) => {
    res.send(renderHTML('Trang Chủ', `
        <h1>Chào mừng đến với NodeMaster Academy</h1>
        <p><a href="/courses" class="btn">Xem danh sách khóa học</a></p>
    `));
});

app.get('/courses', (req, res) => {
    const listHtml = courses.map(c => `
        <li>
            <strong>${c.name}</strong> - ${c.price.toLocaleString('vi-VN')} VND 
            <a href="/courses/${c.id}">[Xem chi tiết]</a>
        </li>
    `).join('');

    res.send(renderHTML('Danh Sách Khóa Học', `
        <h1>Các khóa học hiện tại</h1>
        <ul>${listHtml}</ul>
        <p><a href="/register" class="btn">Đăng ký ngay</a></p>
    `));
});

app.get('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send(renderHTML('Lỗi 404', '<h2>Khóa học không tồn tại!</h2><a href="/courses">Quay lại</a>'));
    }

    res.send(renderHTML('Chi Tiết Khóa Học', `
        <h1>Khóa học: ${course.name}</h1>
        <h2>Giá: ${course.price.toLocaleString('vi-VN')} VND</h2>
        <p><a href="/register" class="btn">Đăng ký khóa này</a></p>
    `));
});

app.get('/register', (req, res) => {
    const optionsHtml = courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    res.send(renderHTML('Đăng Ký Khóa Học', `
        <h1>Form Đăng Ký</h1>
        <form action="/register" method="POST">
            <div class="form-group">
                <label>Họ và Tên:</label>
                <input type="text" name="name" required placeholder="Nhập tên của bạn...">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required placeholder="example@gmail.com">
            </div>
            <div class="form-group">
                <label>Chọn khóa học:</label>
                <select name="courseId">${optionsHtml}</select>
            </div>
            <button type="submit" class="btn">Gửi Đăng Ký</button>
        </form>
    `));
});

app.post('/register', (req, res) => {
    const { name, email, courseId } = req.body;

    if (!name || !email || !courseId) {
        return res.status(400).send(renderHTML('Lỗi Dữ Liệu', '<h2>Vui lòng điền đầy đủ thông tin!</h2><a href="/register">Quay lại</a>'));
    }

    const course = courses.find(c => c.id === parseInt(courseId, 10));

    res.send(renderHTML('Đăng Ký Thành Công', `
        <h1 style="color: green;">Đăng ký thành công!</h1>
        <p>Cảm ơn <strong>${name}</strong> (${email}).</p>
        <p>Bạn đã đăng ký khóa <strong>${course ? course.name : 'Không xác định'}</strong>.</p>
        <a href="/" class="btn">Về trang chủ</a>
    `));
});

app.get('/stats', (req, res) => {
    res.send(renderHTML('Thống Kê Hệ Thống', `
        <h1>Dashboard Thống Kê</h1>
        <p>Tổng số request đã xử lý: <strong>${totalRequests}</strong></p>
    `));
});

app.use((req, res) => {
    res.status(404).send(renderHTML('404 Not Found', '<h1>404 - Đường dẫn không tồn tại!</h1>'));
});

app.listen(PORT, () => {
    console.log(`🚀 NodeMaster Enterprise Server đang chạy tại: http://localhost:${PORT}`);
});