import express from 'express';
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    softDeleteEmployee
} from '../controllers/employee.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', authorize('admin', 'hr', 'staff'), getEmployees);
router.get('/:id', authorize('admin', 'hr', 'staff'), getEmployeeById);

router.post('/', authorize('admin', 'hr'), createEmployee);
router.put('/:id', authorize('admin', 'hr'), updateEmployee);

router.delete('/:id', authorize('admin'), softDeleteEmployee);

export default router;