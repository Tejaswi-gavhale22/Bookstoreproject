const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User", // Assuming you have a User model
		},
		book: {
			type: mongoose.Types.ObjectId,
			ref: "Book", // Correct reference to the Book model
		},
		status: {
			type: String,
			default: "Order Placed",
			enum: ["Order Placed", "Out for delivery", "Delivered", "Canceled"], // Fixed enum list
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema); // Model name in capital (Order)
