const express = require('express');
const router = express.Router();
const {
    getPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
} = require('../controllers/position.controller');
const { protect } = require('../middlewares/auth.middleware');
const { restrictTo } = require('../middlewares/role.middleware');

router.use(protect);

router.route('/')
    .get(restrictTo('admin', 'hr', 'staff'), getPositions)
    .post(restrictTo('admin', 'hr'), createPosition);

router.route('/:id')
    .get(restrictTo('admin', 'hr', 'staff'), getPositionById)
    .put(restrictTo('admin', 'hr'), updatePosition)
    .delete(restrictTo('admin'), deletePosition);

module.exports = router;