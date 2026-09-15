import express from 'express';
import {
    createLeave,
    getAllLeaves,
    getMyLeaves,
    getLeaveById,
    approveLeave,
    rejectLeave
} from '../controllers/leave.controller.js';
import { authenticate, authorize, checkLeaveOwnerOrAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', authorize('admin', 'hr', 'staff'), createLeave);

router.get('/me', authorize('admin', 'hr', 'staff'), getMyLeaves);
router.get('/', authorize('admin', 'hr'), getAllLeaves);

router.get('/:id', authorize('admin', 'hr', 'staff'), checkLeaveOwnerOrAdmin, getLeaveById);

router.patch('/:id/approve', authorize('admin', 'hr'), approveLeave);
router.patch('/:id/reject', authorize('admin', 'hr'), rejectLeave);

export default router;