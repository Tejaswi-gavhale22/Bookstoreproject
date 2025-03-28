require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/connection"); // MongoDB connection
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
const path = require("path");

// Configure CORS
app.use(
	cors({
		origin: "https://bookstoreproject-2euo.onrender.com", // Frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
		credentials: true, // If cookies are being used
	})
);

const _dirname = path.resolve();

app.use(express.json());

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
	res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Creating port
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
