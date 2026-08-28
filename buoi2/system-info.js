const os = require('os');

const getSystemMetrics = () => {
    try {
        const osName = os.type();
        const platform = os.platform();
        
        const totalRamGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
        const freeRamGB = (os.freemem() / (1024 ** 3)).toFixed(2);
        
        const cpuCores = os.cpus().length;

        console.log("=== SERVER HEALTH DASHBOARD ===");
        console.log(`- Tên hệ điều hành: ${osName}`);
        console.log(`- Platform: ${platform}`);
        console.log(`- Tổng RAM: ${totalRamGB} GB`);
        console.log(`- RAM còn trống: ${freeRamGB} GB`);
        console.log(`- Số CPU cores: ${cpuCores}`);
        
       if (freeRamGB < 1.0) {
            console.warn("[WARNING] Cảnh báo: RAM trống dưới 1GB. Nguy cơ tràn bộ nhớ (OOM)!");
        }

    } catch (error) {
        console.error("[FATAL] Không thể giao tiếp với Hệ điều hành:", error);
    }
};

getSystemMetrics();