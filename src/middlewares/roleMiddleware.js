function permit(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: "Không tìm thấy thông tin xác thực hoặc quyền hạn!"
            });
        }

        const { role } = req.user;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: "Truy cập bị từ chối! Bạn không có quyền thực hiện hành động này."
            });
        }

        next();
    };
}

module.exports = permit;