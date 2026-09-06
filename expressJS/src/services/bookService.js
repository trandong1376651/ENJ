const mongoose = require("mongoose");
const Book = require("../models/Book");

function createServiceError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createServiceError("Invalid book id");
  }
}

async function addBook(data, currentUser) {
  return Book.create({
    title: data.title,
    author: data.author,
    category: data.category,
    available: data.available,
    createdBy: currentUser.userId,
  });
}

async function listBooks(query = {}) {
  const filter = {};

  if (query.category) {
    filter.category = query.category;
  }

  return Book.find(filter).populate("createdBy", "name email role");
}

async function findBook(id) {
  validateObjectId(id);

  const book = await Book.findById(id).populate("createdBy", "name email role");
  if (!book) {
    throw createServiceError("Book not found", 404);
  }

  return book;
}

async function editBook(id, body) {
  validateObjectId(id);

  const allowedFields = ["title", "author", "category", "available"];
  const updateData = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw createServiceError("No valid fields to update");
  }

  const book = await Book.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  }).populate("createdBy", "name email role");

  if (!book) {
    throw createServiceError("Book not found", 404);
  }

  return book;
}

async function removeBook(id) {
  validateObjectId(id);

  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw createServiceError("Book not found", 404);
  }

  return { message: "Book deleted" };
}

module.exports = {
  addBook,
  listBooks,
  findBook,
  editBook,
  removeBook,
};