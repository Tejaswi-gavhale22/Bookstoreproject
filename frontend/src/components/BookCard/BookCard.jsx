// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
	// API headers for authentication
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
		bookid: data._id,
	};

	// Function to remove book from favourites
	const handleRemoveBook = async () => {
		try {
			const response = await axios.put(
				"https://bookstoreproject-2euo.onrender.com/api/v1/remove-book-to-favourite",
				{},
				{ headers }
			);
			alert(response.data.message);
		} catch (error) {
			console.error("Error removing book from favourites:", error);
		}
	};

	return (
		<div className="bg-zinc-800 rounded p-4 flex flex-col">
			<Link to={`/view-book-details/${data._id}`}>
				<div className="bg-zinc-900 rounded flex items-center justify-center ">
					<img src={data.url} alt={data.title} className="h-[25vh]" />
				</div>
				<h2 className="mt-4 text-xl text-zinc-50 font-semibold">
					{data.title}
				</h2>
				<p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
				<p className="mt-2 text-zinc-200 font-semibold text-xl">
					₹ {data.price}
				</p>
			</Link>

			{favourite && (
				<button
					className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
					onClick={handleRemoveBook}
				>
					Remove from Favourite
				</button>
			)}
		</div>
	);
};

// PropTypes validation
BookCard.propTypes = {
	data: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}).isRequired,
	favourite: PropTypes.bool,
	removeBook: PropTypes.func,
};

export default BookCard;
