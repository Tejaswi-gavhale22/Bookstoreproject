// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
	const [allOrders, setAllOrders] = useState([]); // Stores all orders
	const [selectedOrderIndex, setSelectedOrderIndex] = useState(-1); // Tracks which order's status is being changed
	const [statusValue, setStatusValue] = useState(""); // Stores selected status value
	const [userModalVisibility, setUserModalVisibility] = useState("hidden"); // Controls visibility of user details modal
	const [userData, setUserData] = useState(null); // Stores user details data

	// Memoize the headers object to prevent unnecessary re-renders
	const headers = useMemo(
		() => ({
			id: localStorage.getItem("id"), // User ID from local storage
			authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization token from local storage
		}),
		[]
	); // Empty dependency array ensures it is only created once

	// Fetch all orders when component mounts
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(
					"https://bookstoreproject-2euo.onrender.com/api/v1/get-all-orders",
					{ headers } // Include headers for authorization
				);
				setAllOrders(response.data.data); // Store orders in state
			} catch (error) {
				console.error("Error fetching orders:", error); // Log any errors
			}
		};
		fetchOrders();
	}, [headers]); // Now, useEffect will only re-run if 'headers' changes

	// Handle dropdown selection change
	const handleStatusChange = (e) => {
		setStatusValue(e.target.value); // Update selected status value
	};

	// Submit updated order status to the API
	const updateOrderStatus = async (index) => {
		try {
			const orderId = allOrders[index]._id; // Get order ID
			const response = await axios.put(
				`http://localhost:1000/api/v1/update-status/${orderId}`,
				{ status: statusValue }, // Send selected status value
				{ headers } // Include headers for authorization
			);
			alert(response.data.message); // Show success message

			// Update local state to reflect the new status immediately
			const updatedOrders = [...allOrders];
			updatedOrders[index].status = statusValue; // Update the order status
			setAllOrders(updatedOrders); // Update orders state

			setSelectedOrderIndex(-1); // Reset dropdown selection
			setStatusValue(""); // Clear the status value
		} catch (error) {
			console.error("Error updating status:", error); // Log any errors
		}
	};

	return (
		<>
			{/* Show loader if orders are not loaded */}
			{!allOrders.length && (
				<div className="h-[100%] flex items-center justify-center">
					<Loader />
				</div>
			)}

			{/* Display orders if data is available */}
			{allOrders.length > 0 && (
				<div className="h-[100%] p-0 md:px text-zinc-100 mb-8">
					<h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
						All Orders
					</h1>

					{/* Table header */}
					<div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
						<div className="w-[3%]">
							<h1 className="text-center">Sr.</h1>
						</div>
						<div className="w-[22%]">
							<h1>Books</h1>
						</div>
						<div className="w-[45%]">
							<h1>Description</h1>
						</div>
						<div className="w-[9%]">
							<h1>Price</h1>
						</div>
						<div className="w-[16%]">
							<h1>Status</h1>
						</div>
						<div className="md:w-[5%]">
							<h1>
								<FaUserLarge />
							</h1>
						</div>
					</div>

					{/* Display each order */}
					{allOrders.map((order, index) => (
						<div
							key={order._id}
							className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
						>
							<div className="w-[3%] text-center">{index + 1}</div>
							<div className="w-[40%] md:w-[22%]">
								<Link
									to={`/view-book-details/${order.book._id}`}
									className="hover:text-blue-300"
								>
									{order.book.title}
								</Link>
							</div>
							<div className="w-0 md:w-[45%] hidden md:block">
								<h1>{order.book.desc.slice(0, 50)}...</h1>
							</div>
							<div className="w-[17%] md:w-[9%]">
								<h1>₹{order.book.price}</h1>
							</div>
							<div className="w-[30%] md:w-[16%]">
								<h1 className="font-semibold">
									<button
										className="hover:scale-105 transition-all duration-300"
										onClick={() => setSelectedOrderIndex(index)} // Show status dropdown when clicked
									>
										{/* Display the order status with corresponding color */}
										{order.status === "Order placed" ? (
											<div className="text-yellow-500">{order.status}</div>
										) : order.status === "Canceled" ? (
											<div className="text-red-500">{order.status}</div>
										) : (
											<div className="text-green-500">{order.status}</div>
										)}
									</button>
									{/* Show status change dropdown if the order is selected */}
									{selectedOrderIndex === index && (
										<div className="flex mt-4">
											<select
												className="bg-gray-800"
												onChange={handleStatusChange}
												value={statusValue}
											>
												{/* Status options */}
												{[
													"Order placed",
													"Out for delivery",
													"Delivered",
													"Canceled",
												].map((statusOption, i) => (
													<option value={statusOption} key={i}>
														{statusOption}
													</option>
												))}
											</select>
											<button
												className="text-green-500 hover:text-pink-600 mx-2"
												onClick={() => updateOrderStatus(index)} // Update the order status
											>
												<FaCheck />
											</button>
										</div>
									)}
								</h1>
							</div>
							<div className="w-[10%] md:w-[5%]">
								<button
									className="text-xl hover:text-orange-500"
									onClick={() => {
										setUserData(order.user); // Set user data for modal
										setUserModalVisibility("fixed"); // Show user modal
									}}
								>
									<IoOpenOutline />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Display user details modal */}
			{userModalVisibility === "fixed" && userData && (
				<SeeUserData
					userDivData={userData} // Pass user data to modal component
					userDiv={userModalVisibility} // Control visibility of modal
					setUserDiv={setUserModalVisibility} // Function to hide modal
				/>
			)}
		</>
	);
};

export default AllOrders;
