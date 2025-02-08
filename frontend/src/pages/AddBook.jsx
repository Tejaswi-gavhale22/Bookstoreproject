// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
	// Using useState hook to manage form data
	const [Data, setData] = useState({
		url: "",
		title: "",
		author: "",
		price: "",
		desc: "",
		language: "",
	});

	// Setting headers for authorization
	const headers = {
		id: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
	};

	// Updating state when input fields change
	const change = (e) => {
		const { name, value } = e.target;
		setData({ ...Data, [name]: value });
	};

	// Submitting form data to backend API
	const submit = async () => {
		try {
			// Show error if any field is empty
			if (Object.values(Data).some((field) => field === "")) {
				alert("All fields are required");
			} else {
				// Sending request to API
				const response = await axios.post(
					"http://localhost:1000/api/v1/add-book",
					Data,
					{ headers }
				);

				// Resetting form data
				setData({
					url: "",
					title: "",
					author: "",
					price: "",
					desc: "",
					language: "",
				});

				alert(response.data.message);
			}
		} catch (error) {
			alert(error.response?.data?.message || "Something went wrong");
		}
	};

	return (
		<div className="h-[100%] p-0 md:p-4">
			<h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
				Add Book
			</h1>

			<div className="p-4 bg-zinc-800 rounded">
				{/* Input field for Book Image URL */}
				<label className="text-zinc-400">Image</label>
				<input
					type="text"
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					placeholder="URL of image"
					name="url"
					value={Data.url}
					onChange={change}
				/>

				{/* Input field for Book Title */}
				<label className="text-zinc-400 mt-4 block">Title</label>
				<input
					type="text"
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					placeholder="title of book"
					name="title"
					value={Data.title}
					onChange={change}
				/>

				{/* Input field for Book Author */}
				<label className="text-zinc-400 mt-4 block">Author</label>
				<input
					type="text"
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					placeholder="author of book"
					name="author"
					value={Data.author}
					onChange={change}
				/>

				{/* Input fields for Language & Price */}
				<div className="mt-4 flex gap-4">
					<div className="w-3/6">
						<label className="text-zinc-400">Language</label>
						<input
							type="text"
							className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
							placeholder="language of book"
							name="language"
							value={Data.language}
							onChange={change}
						/>
					</div>
					<div className="w-3/6">
						<label className="text-zinc-400">Price</label>
						<input
							type="number"
							className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
							placeholder="price of book"
							name="price"
							value={Data.price}
							onChange={change}
						/>
					</div>
				</div>

				{/* Input field for Book Description */}
				<label className="text-zinc-400 mt-4 block">Description</label>
				<textarea
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					rows="5"
					name="desc"
					placeholder="description of book"
					value={Data.desc}
					onChange={change}
				></textarea>

				{/* Submit Button */}
				<button
					className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
					onClick={submit}
				>
					Add Book
				</button>
			</div>
		</div>
	);
};

export default AddBook;
