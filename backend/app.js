const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
require("./connection/connection"); // MongoDB connection
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

// Configure CORS
app.use(
	cors({
		origin: "http://localhost:5173", // Frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
		credentials: true, // If cookies are being used
	})
);

app.use(express.json());

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Creating port
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
