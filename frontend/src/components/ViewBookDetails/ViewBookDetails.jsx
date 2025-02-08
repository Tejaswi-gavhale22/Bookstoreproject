// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
	// Extracting book ID from the URL parameters
	const { id } = useParams();

	// State to store book details
	const navigate = useNavigate();
	const [Data, setData] = useState(null);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const role = useSelector((state) => state.auth.role);

	// Fetch book details when the component loads
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:1000/api/v1/get-book-by-id/${id}`
				);
				setData(response.data.data);
			} catch (error) {
				console.error("Error fetching book details:", error);
			}
		};
		fetchData();
	}, [id]);

	// Headers for API requests
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
		bookid: id,
	};

	// Function to add book to favourites
	const handleFavourite = async () => {
		try {
			const response = await axios.put(
				"http://localhost:1000/api/v1/add-book-to-favourite",
				{},
				{ headers }
			);
			alert(response.data.message);
		} catch (error) {
			console.error("Error adding to favourite:", error);
		}
	};

	// Function to add book to cart
	const handleCart = async () => {
		try {
			const response = await axios.put(
				"http://localhost:1000/api/v1//add-to-cart",
				{},
				{ headers }
			);
			alert(response.data.message);
		} catch (error) {
			console.error("Error adding to cart:", error);
		}
	};

	//function to delete book
	const deleteBook = async () => {
		const response = await axios.delete(
			"http://localhost:1000/api/v1/delete-book",
			{ headers }
		);
		alert(response.data.message);
		navigate("/all-books");
	};
	return (
		<>
			{Data ? (
				<div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
					<div className="w-full lg:w-3/6">
						<div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
							<img
								src={Data.url}
								alt="Book Cover"
								className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
							/>
							{isLoggedIn && role === "user" && (
								<div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
									<button
										className="text-white rounded lg:rounded-full text-3xl p-3 bg-red-600 flex items-center justify-center"
										onClick={handleFavourite}
									>
										<FaHeart />{" "}
										<span className="ms-4 block lg:hidden"> Favourite</span>
									</button>
									<button
										className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-blue-600 flex items-center justify-center"
										onClick={handleCart}
									>
										<FaShoppingCart />{" "}
										<span className="ms-4 block lg:hidden"> Add to cart</span>
									</button>
								</div>
							)}
							{isLoggedIn && role === "admin" && (
								<div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0">
									<Link
										to={`/updateBook/${id}`}
										className="text-black rounded lg:rounded-full text-3xl p-3 flex items-center bg-white justify-center"
									>
										<FaEdit />{" "}
										<span className="ms-4 block lg:hidden">Edit</span>
									</Link>
									<button
										className="text-red-600 rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-white flex items-center justify-center"
										onClick={deleteBook}
									>
										<MdOutlineDeleteOutline />{" "}
										<span className="ms-4 block lg:hidden">Delete</span>
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="p-4 w-full lg:w-3/6">
						<h1 className="text-4xl text-zinc-300 font-semibold">
							{Data.title}
						</h1>
						<p className="text-zinc-400 mt-1"> by {Data.author}</p>
						<p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
						<p className="flex mt-4 items-center justify-start text-zinc-400">
							<GrLanguage className="me-3" /> {Data.language}
						</p>
						<p className="mt-4 text-zinc-100 text-3xl font-semibold">
							Price : ₹ {Data.price}
						</p>
					</div>
				</div>
			) : (
				<p className="text-white text-center mt-8">Loading book details...</p>
			)}
		</>
	);
};

export default ViewBookDetails;
