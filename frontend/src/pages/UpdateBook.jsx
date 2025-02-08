// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
	const [Data, setData] = useState({
		url: "",
		title: "",
		author: "",
		price: "",
		desc: "",
		language: "",
	});

	const { id } = useParams();
	const navigate = useNavigate();

	const headers = {
		userid: localStorage.getItem("id"),
		authorization: `Bearer ${localStorage.getItem("token")}`,
		bookid: id,
	};

	const change = (e) => {
		const { name, value } = e.target;
		setData({ ...Data, [name]: value });
	};
	const submit = async (e) => {
		e.preventDefault();
		console.log("Submit button clicked!");

		try {
			if (Object.values(Data).some((field) => field === "")) {
				alert("All fields are required");
				return;
			}

			console.log("Sending update request to API...");
			const response = await axios.put(
				`http://localhost:1000/api/v1/update-book/${id}`,
				Data,
				{ headers }
			);

			console.log("Response received:", response.data);
			navigate(`/view-book-details/${id}`);
		} catch (error) {
			console.error(
				"Error updating book:",
				error.response?.data || error.message || error
			);
			alert(error.response?.data?.message || "Something went wrong");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("Fetching book details...");
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

	return (
		<div className="bg-zinc-900 h-[100%] p-0 md:p-4">
			<h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
				Update Book
			</h1>

			<form onSubmit={submit} className="p-4 bg-zinc-800 rounded">
				<label className="text-zinc-400">Image</label>
				<input
					type="text"
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					placeholder="URL of image"
					name="url"
					value={Data.url}
					onChange={change}
				/>

				<label className="text-zinc-400 mt-4 block">Title</label>
				<input
					type="text"
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					placeholder="Title of book"
					name="title"
					value={Data.title}
					onChange={change}
				/>

				<label className="text-zinc-400 mt-4 block">Author</label>
				<input
					type="text"
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					placeholder="Author of book"
					name="author"
					value={Data.author}
					onChange={change}
				/>

				<div className="mt-4 flex gap-4">
					<div className="w-3/6">
						<label className="text-zinc-400">Language</label>
						<input
							type="text"
							className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
							placeholder="Language of book"
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
							placeholder="Price of book"
							name="price"
							value={Data.price}
							onChange={change}
						/>
					</div>
				</div>

				<label className="text-zinc-400 mt-4 block">Description</label>
				<textarea
					className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
					rows="5"
					name="desc"
					placeholder="Description of book"
					value={Data.desc}
					onChange={change}
				></textarea>

				<button
					type="submit"
					className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
				>
					Update Book
				</button>
			</form>
		</div>
	);
};

export default UpdateBook;
