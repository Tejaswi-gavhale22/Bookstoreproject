const router = require("express").Router();
const User = require("../models/user"); // Ensure this is the correct path
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book --admin only
router.post("/add-book", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers; // Check if user is admin
		const user = await User.findById(id);

		if (user.role !== "admin") {
			// Only admins can add books
			return res.status(400).json({ message: "You do not have admin access" });
		}

		const book = new Book({
			url: req.body.url,
			title: req.body.title,
			author: req.body.author,
			price: req.body.price,
			desc: req.body.desc,
			language: req.body.language,
		});
		await book.save();
		res.status(200).json({ message: "Book added successfully" });
	} catch (error) {
		console.error("Error adding book:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Update book
// Update book
router.put("/update-book/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		// Ensure the ID exists before trying to update
		const book = await Book.findById(id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		// Update the book with the provided details
		await Book.findByIdAndUpdate(
			id,
			{
				url: req.body.url,
				title: req.body.title,
				author: req.body.author,
				price: req.body.price,
				desc: req.body.desc,
				language: req.body.language,
			},
			{ new: true }
		); // 'new' returns the updated document

		return res.status(200).json({
			message: "Book updated successfully!",
		});
	} catch (error) {
		console.log("Error updating book:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

// Delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
	try {
		const { bookid } = req.headers;
		await Book.findByIdAndDelete(bookid);
		return res.status(200).json({
			message: "Book deleted successfully!",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

// Get all books
router.get("/get-all-books", async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 });
		return res.json({
			status: "Success",
			data: books,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

// Get recently added books (Limit 4)
router.get("/get-recent-books", async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 }).limit(4);
		return res.json({
			status: "Success",
			data: books,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

// Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
		return res.json({
			status: "Success",
			data: book,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

module.exports = router;
