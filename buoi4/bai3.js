require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_APP_PASSWORD
    }
});

async function sendWelcomeEmail(targetEmail, userName) {
    try {
        console.log(`Đang tiến hành gửi mail tới: ${targetEmail}...`);
        
        const info = await transporter.sendMail({
            from: `"NodeMaster Enterprise" <${EMAIL_USER}>`, 
            to: targetEmail,
            subject: "Chào mừng bạn gia nhập hệ thống!",
            text: `Xin chào ${userName}, hệ thống đã ghi nhận bạn.`,
            html: `<h2>Xin chào ${userName}!</h2><p>Hệ thống đã ghi nhận bạn.</p>`
        });

        console.log(`Email gửi thành công! MessageID: ${info.messageId}`);
        return info;

    } catch (error) {
        console.error(`Lỗi khi gửi email tới ${targetEmail}:`, error.message);
        }
}

sendWelcomeEmail('tranvandong720218@gmail.com', 'Học viên Node.js');