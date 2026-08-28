const { printReport } = require('./student.js');

const students = [
    { name: "Nguyen Van A", scores: [8, 9, 8.5] },
    { name: "Tran Thi B", scores: [6, 7, 6.5] },
    { name: "Le Van C", scores: [4, 5, 3] },
    { name: "Lỗi Data D", scores: null } 
];

console.log("=== HỆ THỐNG XỬ LÝ BÁO CÁO HỌC VIÊN ===");
students.forEach(student => printReport(student));