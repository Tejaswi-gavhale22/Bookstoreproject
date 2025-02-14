//

require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
	try {
		console.log("MongoDB URI:", process.env.URI);
		await mongoose.connect(process.env.URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to Database");
	} catch (error) {
		console.log(" MongoDB Connection Error:", error);
	}
};
connection();
