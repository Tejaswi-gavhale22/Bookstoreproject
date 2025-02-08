const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
require("dotenv").config(); // For JWT_SECRET

// Sign-Up Route
router.post("/sign-up", async (req, res) => {
	try {
		const { username, email, password, address } = req.body;

		// Validation for empty fields
		if (!username || !email || !password || !address) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// Check username length
		if (username.length < 4) {
			return res
				.status(400)
				.json({ message: "Username length should be greater than 3" });
		}

		// Check if username or email already exists
		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(400).json({ message: "Username already exists" });
		}
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: "Email already exists" });
		}

		// Check password length
		if (password.length <= 5) {
			return res
				.status(400)
				.json({ message: "Password length should be greater than 5" });
		}

		// Hash password
		const hashPass = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			username,
			email,
			password: hashPass,
			address,
		});

		await newUser.save();
		return res.status(200).json({ message: "Sign-Up Successful!" });
	} catch (error) {
		console.error("Error occurred during sign-up:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/sign-in", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if user exists
		const existingUser = await User.findOne({ username });
		if (!existingUser) {
			res.status(400).json({ message: "Invalid credentials" });
		}

		// Compare password
		await bcrypt.compare(password, existingUser.password, (err, data) => {
			if (data) {
				const authClaims = [
					{ name: existingUser.username },
					{ role: existingUser.role },
				];
				const token = jwt.sign({ authClaims }, "bookStore123", {
					expiresIn: "30d",
				});
				res.status(200).json({
					id: existingUser._id,
					role: existingUser.role,
					token: token,
				});
			} else {
				res.status(400).json({ message: "Invalid credentials" });
			}
		});
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

// Get User Information
router.get("/get-user-information", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;

		const data = await User.findById(id).select("-password");
		if (!data) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

// Update Address
router.put("/update-address", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const { address } = req.body;
		await User.findByIdAndUpdate(id, { address: address });
		return res.status(200).json({ message: "Address update successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
