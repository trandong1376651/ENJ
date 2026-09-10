import express from 'express';
import {
    checkIn,
    checkOut,
    getAllAttendances,
    getMyAttendance,
    getEmployeeAttendance
} from '../controllers/attendance.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/check-in', authorize('admin', 'hr', 'staff'), checkIn);
router.post('/check-out', authorize('admin', 'hr', 'staff'), checkOut);

router.get('/me', authorize('admin', 'hr', 'staff'), getMyAttendance);
router.get('/employee/:employeeId', authorize('admin', 'hr'), getEmployeeAttendance);
router.get('/', authorize('admin', 'hr'), getAllAttendances);

export default router;