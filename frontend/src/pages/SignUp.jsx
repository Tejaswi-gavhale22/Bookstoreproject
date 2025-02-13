// Importing required dependencies
import axios from "axios"; // For making HTTP requests
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // For component state management
import { Link, useNavigate } from "react-router-dom"; // For navigation and linking

// SignUp Component
const SignUp = () => {
	// State to hold form values
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		address: "",
	});

	// Hook for programmatic navigation
	const navigate = useNavigate();

	// Handle input field changes
	const change = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value }); // Update state dynamically
	};

	// Handle form submission
	const submit = async () => {
		try {
			// Validation: Check if any field is empty
			if (
				values.username === "" ||
				values.email === "" ||
				values.password === "" ||
				values.address === ""
			) {
				alert("All fields are required");
			} else {
				// API call to sign-up endpoint
				const response = await axios.post(
					"https://bookstoreproject-2euo.onrender.com/api/v1/sign-up", // API endpoint
					values // Data to be sent
				);
				alert(response.data.message); // Show success message
				navigate("/LogIn"); // Redirect to login page
			}
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	return (
		<div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
			{/* Card container */}
			<div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
				{/* Heading */}
				<p className="text-zinc-200 text-xl">Sign Up</p>

				<div className="mt-4">
					{/* Username field */}
					<div>
						<label htmlFor="username" className="text-zinc-400">
							Username
						</label>
						<input
							type="text"
							id="username"
							className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
							placeholder="Enter username"
							name="username"
							required
							value={values.username}
							onChange={change} // Handle input change
						/>
					</div>

					{/* Email field */}
					<div className="mb-4">
						<label htmlFor="email" className="text-gray-400 text-sm">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="w-full mt-1 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="xyz@example.com"
							name="email"
							required
							value={values.email}
							onChange={change} // Handle input change
						/>
					</div>

					{/* Password field */}
					<div className="mt-4">
						<label htmlFor="password" className="text-zinc-400">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
							placeholder="Enter password"
							name="password"
							required
							value={values.password}
							onChange={change} // Handle input change
						/>
					</div>

					{/* Address field */}
					<div className="mb-4">
						<label htmlFor="address" className="text-gray-400 text-sm">
							Address
						</label>
						<textarea
							id="address"
							className="w-full mt-1 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							rows="5"
							placeholder="Enter your address"
							name="address"
							required
							value={values.address}
							onChange={change} // Handle input change
						></textarea>
					</div>

					{/* Submit Button */}
					<div className="mt-6">
						<button
							className="w-full bg-blue-700 text-zinc-200 py-2 rounded hover:bg-blue-600 transition-all duration-300"
							onClick={submit} // Trigger form submission
						>
							Sign Up
						</button>
					</div>

					{/* Navigation to Login */}
					<div className="mt-4 text-center">
						<span className="text-zinc-400 text-sm">
							Already have an account?{" "}
							<Link to="/login" className="text-blue-500 hover:underline">
								Log In
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
