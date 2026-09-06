const express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const permit = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post('/', authMiddleware, permit('admin'), createBook);
router.put('/:id', authMiddleware, permit('admin'), updateBook);
router.delete('/:id', authMiddleware, permit('admin'), deleteBook);

module.exports = router;