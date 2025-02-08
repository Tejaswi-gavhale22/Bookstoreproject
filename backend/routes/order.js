const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
	try {
		const id = req.user.id; // Fetch user ID from middleware
		const { order } = req.body;

		if (!order || !Array.isArray(order)) {
			return res.status(400).json({ message: "Invalid order data" });
		}

		const orderIds = [];
		for (const orderData of order) {
			const newOrder = new Order({ user: id, book: orderData._id });
			const orderDataFromDb = await newOrder.save();
			orderIds.push(orderDataFromDb._id);
		}

		// Update user: Add orders and remove from cart in one go
		await User.findByIdAndUpdate(id, {
			$push: { orders: { $each: orderIds } },
			$pull: { cart: { $in: order.map((o) => o._id) } },
		});

		return res.json({
			status: "Success",
			message: "Order Placed Successfully",
		});
	} catch (error) {
		console.log("Backend Error:", error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

// //get order history of particular user
// router.get("/get-order-history", authenticateToken, async (req, res) => {
// 	try {
// 		const { id } = req.headers;
// 		console.log("Received User ID:", id);

// 		const userData = await User.findById(id).populate({
// 			path: "orders",
// 			populate: { path: "book" },
// 		});

// 		const orderData = userData.orders.reverse();
// 		return res.json({
// 			status: "Success",
// 			data: orderData,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).json({ message: "An error occurred" });
// 	}
// });

// Get all orders (Admin only)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("book")
			.populate("user")
			.sort({ createdAt: -1 });

		return res.json({
			status: "Success",
			data: orders,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

// Update order status (Admin only)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		const updatedOrder = await Order.findByIdAndUpdate(
			id,
			{ status: req.body.status },
			{ new: true }
		);

		if (!updatedOrder) {
			return res.status(404).json({ message: "Order not found" });
		}

		return res.json({
			status: "Success",
			message: "Status updated successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "An error occurred" });
	}
});

module.exports = router;
