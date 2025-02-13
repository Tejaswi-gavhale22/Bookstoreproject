// Importing required dependencies
import axios from "axios"; // For making HTTP requests
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"; // For component state management
import { useNavigate } from "react-router-dom"; // For navigation and linking
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const LogIn = () => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const Change = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const Submit = async () => {
		try {
			if (values.username === "" || values.password === "") {
				alert("All fields are required.");
			} else {
				const response = await axios.post(
					"https://bookstoreproject-2euo.onrender.com/api/v1/sign-in",
					values
				);
				//console.log(response.data.id);
				dispatch(authActions.login());
				dispatch(authActions.changeRole(response.data.role));
				localStorage.setItem("id", response.data.id);
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("role", response.data.role);

				if (response.status === 200) {
					alert("Login successful!");
					// Correct navigate call
					navigate("/profile");
				}
			}
		} catch (error) {
			alert(error.response.data.message);
		}
	};

	return (
		<div className="h-screen bg-gray-900 flex items-center justify-center">
			<div className="bg-gray-800 rounded-lg p-6 w-80 shadow-md">
				<h2 className="text-white text-2xl font-semibold mb-4 text-center">
					Log In
				</h2>

				<div className="mb-4">
					<label htmlFor="username" className="text-gray-400 text-sm">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={values.username}
						onChange={Change}
						className="w-full mt-1 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter your username"
						required
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="text-gray-400 text-sm">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={values.password}
						onChange={Change}
						className="w-full mt-1 bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter your password"
						required
					/>
				</div>

				<button
					onClick={Submit}
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
				>
					Log In
				</button>

				<div className="mt-4 text-center text-gray-400 text-sm">Or</div>

				<div className="mt-2 text-center">
					<span className="text-gray-400 text-sm">Don’t have an account? </span>
					<a href="/signup" className="text-blue-500 hover:underline">
						Sign Up
					</a>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
