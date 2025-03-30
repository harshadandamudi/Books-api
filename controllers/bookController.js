const { Book, validateBook } = require('../models/book');
const mongoose = require('mongoose'); 

// to get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// to get a specific book by its ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// to create a new book
const addBook = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding new book:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// to update an existing book
const updateBook = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
     const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

// to delete a book by its ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
