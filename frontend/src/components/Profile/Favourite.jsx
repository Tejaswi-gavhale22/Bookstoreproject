// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourite = () => {
	// State to store the list of favourite books
	const [favouriteBooks, setFavouriteBooks] = useState([]);

	// API headers for authentication using stored user ID and token
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
	};

	// Function to fetch favourite books from the backend
	const fetchFavouriteBooks = async () => {
		try {
			// Sending a GET request to fetch favourite books
			const response = await axios.get(
				"https://bookstoreproject-2euo.onrender.com/api/v1/get-favourite-books",
				{ headers }
			);
			// Storing the fetched favourite books in the state
			setFavouriteBooks(response.data.data);
		} catch (error) {
			// Handling any errors during the API call
			console.error("Error fetching favourite books:", error);
		}
	};

	// Fetching favourite books when the component mounts
	useEffect(() => {
		fetchFavouriteBooks();
	}, []); // Empty dependency array ensures it runs only once when the component mounts

	return (
		<>
			{favouriteBooks && favouriteBooks.length === 0 && (
				<div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center flex-col w-full">
					No Favourite Books
					<img src="./start.png" alt="star" className="h-[20vh] my-8" />
				</div>
			)}

			<div className="grid grid-cols-3 gap-4">
				{favouriteBooks &&
					favouriteBooks.map((items, i) => (
						<div key={i}>
							<BookCard data={items} favourite={true} />
						</div>
					))}
			</div>
		</>
	);
};

export default Favourite;
