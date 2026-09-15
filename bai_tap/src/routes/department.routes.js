const express = require('express');
const router = express.Router();
const {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} = require('../controllers/department.controller');
const { protect } = require('../middlewares/auth.middleware');
const { restrictTo } = require('../middlewares/role.middleware');

router.use(protect);

router.route('/')
    .get(restrictTo('admin', 'hr', 'staff'), getDepartments)
    .post(restrictTo('admin', 'hr'), createDepartment);

router.route('/:id')
    .get(restrictTo('admin', 'hr', 'staff'), getDepartmentById)
    .put(restrictTo('admin', 'hr'), updateDepartment)
    .delete(restrictTo('admin'), deleteDepartment);

module.exports = router;