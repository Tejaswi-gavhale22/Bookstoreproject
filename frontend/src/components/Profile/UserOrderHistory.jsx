// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Loader from "../Loader/Loader";

// const UserOrderHistory = () => {
// 	const [orderHistory, setOrderHistory] = useState([]); // Initialize as empty array
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		// const fetchOrderHistory = async () => {
// 		// 	try {
// 		// 		const token = localStorage.getItem("token");

// 		// 		const userId = localStorage.getItem("id");

// 		// 		if (!token || !userId) {
// 		// 			setError("Authentication failed. Please log in again.");
// 		// 			setLoading(false);
// 		// 			return;
// 		// 		}

// 		// 		const headers = {
// 		// 			userId: userId,
// 		// 			authorization: `Bearer ${token}`,
// 		// 		};

// 		// 		const response = await axios.get(
// 		// 			"http://localhost:1000/api/v1/get-order-history",
// 		// 			{ headers }
// 		// 		);

// 		// 		console.log("API Response:", response.data);

// 		// 		if (response.data.success && Array.isArray(response.data.data)) {
// 		// 			setOrderHistory(response.data.data);
// 		// 		} else {
// 		// 			setError("Invalid response from server.");
// 		// 		}
// 		// 	} catch (error) {
// 		// 		console.error("Error fetching order history", error);
// 		// 		setError("Failed to fetch order history. Please try again.");
// 		// 	} finally {
// 		// 		setLoading(false);
// 		// 	}
// 		// };

// 		// fetchOrderHistory();
// 	}, []);

// 	if (loading) {
// 		return (
// 			<div className="flex items-center justify-center h-[100vh]">
// 				<Loader />
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className="h-[80vh] flex flex-col items-center justify-center text-red-500">
// 				<h1 className="text-2xl font-semibold">{error}</h1>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="h-[100%] p-4 text-zinc-100">
// 			{orderHistory.length === 0 ? (
// 				<div className="h-[80vh] flex flex-col items-center justify-center">
// 					<h1 className="text-5xl font-semibold text-zinc-500 mb-8">
// 						No Order History
// 					</h1>
// 					<img src="order.png" alt="No orders" className="h-[20vh] mb-8" />
// 				</div>
// 			) : (
// 				<>
// 					<h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
// 						Your Order History
// 					</h1>

// 					{/* Table header */}
// 					<div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
// 						<div className="w-[3%] text-center">Sr.</div>
// 						<div className="w-[22%]">Books</div>
// 						<div className="w-[45%]">Description</div>
// 						<div className="w-[9%]">Price</div>
// 						<div className="w-[16%]">Status</div>
// 						<div className="w-none md:w-[5%] hidden md:block">Mode</div>
// 					</div>

// 					{/* Display list of orders */}
// 					{orderHistory.map((item, i) => (
// 						<div
// 							key={i}
// 							className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
// 						>
// 							<div className="w-[3%] text-center">{i + 1}</div>
// 							<div className="w-[22%]">
// 								<Link
// 									to={`/view-book-details/${item.book_id}`}
// 									className="hover:text-blue-300"
// 								>
// 									{item.book?.title || "Unknown Title"}
// 								</Link>
// 							</div>
// 							<div className="w-[45%]">
// 								<h1>{item.book?.desc?.slice(0, 50) || "No description"}...</h1>
// 							</div>
// 							<div className="w-[9%]">{item.book?.price || "N/A"}</div>

// 							{/* Order status with dynamic color */}
// 							<div className="w-[16%] font-semibold">
// 								<span
// 									className={
// 										item.status === "Order placed"
// 											? "text-yellow-500"
// 											: item.status === "Canceled"
// 											? "text-red-500"
// 											: "text-green-500"
// 									}
// 								>
// 									{item.status}
// 								</span>
// 							</div>

// 							<div className="max-w-none md:w-[5%] hidden md:block">
// 								<h1 className="text-sm text-zinc-400">COD</h1>
// 							</div>
// 						</div>
// 					))}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default UserOrderHistory;
