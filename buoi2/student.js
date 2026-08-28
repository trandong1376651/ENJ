const getAverage = (scores) => {
    if (!Array.isArray(scores) || scores.length === 0) return 0;
    
    const sum = scores.reduce((total, current) => total + current, 0);
    return sum / scores.length;
};

const getRank = (average) => {
    if (average >= 8.0) return "Giỏi";
    if (average >= 6.5) return "Khá";
    if (average >= 5.0) return "Trung bình";
    return "Yếu";
};

const printReport = (student) => {
    try {
        if (!student || !student.scores) throw new Error("Dữ liệu học viên không hợp lệ");
        
        const average = getAverage(student.scores);
        const rank = getRank(average);
        
        console.log(`[REPORT] Học viên: ${student.name.padEnd(15)} | Điểm TB: ${average.toFixed(2)} | Xếp loại: ${rank}`);
    } catch (error) {
        console.error(`[ERROR] Lỗi khi xử lý báo cáo:`, error.message);
    }
};

module.exports = {
    getAverage,
    getRank,
    printReport
};