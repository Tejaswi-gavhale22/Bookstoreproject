const jwt = require("jsonwebtoken");

//this code use for only authenticated ya only verified users can access the API

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) {
		return res.status(401).json({ message: "Authentication token required" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res
				.status(403)
				.json({ message: "Token expired. Please signIn again" });
		}

		req.user = user;
		next();
	});
};

module.exports = { authenticateToken };
