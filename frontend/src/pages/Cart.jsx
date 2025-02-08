// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const navigate = useNavigate();
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	// Headers for API requests
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
	};

	// Fetch user's cart from API
	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await axios.get(
					"http://localhost:1000/api/v1/get-user-cart",
					{ headers }
				);
				setCart(res.data.data);
			} catch (error) {
				console.error("Error fetching cart:", error);
			}
		};
		fetch();
	}, []); // Removed cart dependency to prevent infinite API calls

	// Function to place order
	const placeOrder = async () => {
		try {
			const response = await axios.post(
				`http://localhost:1000/api/v1/place-order`,
				{ order: cart }, // Order details
				{ headers }
			);
			alert(response.data.message);
			navigate("/profile/orderHistory");
		} catch (error) {
			console.error("Error placing order:", error);
			console.log("Error response:", error.response); // Yeh line add karo
			alert("Order placement failed. Please try again.");
		}
	};

	// Function to delete item from cart
	const deleteItem = async (bookId) => {
		try {
			const response = await axios.put(
				`http://localhost:1000/api/v1/remove-from-cart/${bookId}`,
				{},
				{ headers }
			);
			alert(response.data.message);
			// Update cart after deletion
			setCart(cart.filter((item) => item._id !== bookId));
		} catch (error) {
			console.error("Error deleting item:", error);
		}
	};

	// Calculate total price
	useEffect(() => {
		let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
		setTotal(totalPrice);
	}, [cart]);

	return (
		<div className="bg-zinc-900 px-12 h-screen py-8">
			{!cart && (
				<div className="w-full h-[100%] flex items-center justify-center">
					<Loader />
				</div>
			)}
			{cart.length === 0 && (
				<div className="h-screen flex items-center justify-center flex-col">
					<h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
						Empty Cart
					</h1>
					<img src="/empty-Cart.png" alt="Empty Cart" className="lg:h-[50vh]" />
				</div>
			)}
			{cart.length > 0 && (
				<>
					<h1 className="text-5xl font-semibold text-zinc-500 mb-8">
						Your Cart
					</h1>
					{cart.map((item, i) => (
						<div
							key={i}
							className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
						>
							<img
								src={item.url}
								alt="/"
								className="h-[20vh] md:h-[10vh] object-cover"
							/>
							<div className="w-full md:w-auto">
								<h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
									{item.title}
								</h1>
								<p className="text-normal text-zinc-300 mt-2 hidden lg:block">
									{item.desc.slice(0, 100)}...
								</p>
								<p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
									{item.desc.slice(0, 65)}...
								</p>
								<p className="text-normal text-zinc-300 mt-2 block md:hidden">
									{item.desc.slice(0, 100)}...
								</p>
							</div>
							<div className="flex mt-4 w-full md:w-auto items-center justify-between">
								<h2 className="text-zinc-100 text-3xl font-semibold flex">
									₹ {item.price}
								</h2>
								<button
									className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
									onClick={() => deleteItem(item._id)}
								>
									<AiFillDelete />
								</button>
							</div>
						</div>
					))}
					{cart && cart.length > 0 && (
						<div className="mt-4 w-full flex items-center justify-end">
							<div className="p-4 bg-zinc-800 rounded">
								<h1 className="text-3xl text-zinc-200 font-semibold">
									Total Amount
								</h1>
								<div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
									<h2>{cart.length} books</h2> <h2>{total}</h2>
								</div>
								<div className="w-[100% ] mt-3">
									<button
										className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
										onClick={placeOrder}
									>
										Place your order
									</button>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Cart;
