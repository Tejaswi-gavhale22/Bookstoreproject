// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
	// Links array containing titles and corresponding routes
	const links = [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "All Books",
			link: "/all-books",
		},
		{
			title: "Cart",
			link: "/cart",
		},
		{
			title: "Profile",
			link: "/profile",
		},
		{
			title: "Admin Profile",

			link: "/profile",
		},
	];

	// Redux state to check if the user is logged in and to retrieve the user role
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const role = useSelector((state) => state.auth.role);

	// Create a copy of the links array so we can modify it as needed
	let filteredLinks = [...links];

	// If the user is not logged in, remove links that should only be visible for logged in users
	if (!isLoggedIn) {
		// Remove Cart, Profile, and Admin Profile links (indexes 2, 3, and 4)
		filteredLinks.splice(2, 3);
	}

	// If logged in and role is "user", remove the Admin Profile link
	if (isLoggedIn && role === "user") {
		filteredLinks = filteredLinks.filter(
			(link) => link.title !== "Admin Profile"
		);
	}

	// If logged in and role is "admin", remove the regular Profile link
	if (isLoggedIn && role === "admin") {
		filteredLinks = filteredLinks.filter((link) => link.title !== "Profile");
	}

	// State to manage the visibility of the mobile menu
	const [mobileNav, setMobileNav] = useState("hidden");

	// Common button styles to avoid repetition
	const buttonStyles =
		"px-4 py-1 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300";

	return (
		<>
			{/* Navbar container */}
			<nav className="z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
				{/* Logo section */}
				<Link to="/" className="flex items-center">
					<img
						className="h-10 me-4"
						src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
						alt="logo"
					/>
					<h1 className="text-2xl font-semibold">BookHeaven</h1>
				</Link>

				{/* Navigation links and buttons */}
				<div className="nav-links-BookHeaven block md:flex items-center gap-4">
					{/* Desktop navigation links */}
					<div className="hidden md:flex gap-4">
						{filteredLinks.map((item, i) =>
							item.title === "Profile" || item.title === "Admin Profile" ? (
								<Link
									to={item.link}
									className={`border border-blue-500 ${buttonStyles}`}
									key={i}
								>
									{item.title}
								</Link>
							) : (
								<Link
									to={item.link}
									className="hover:text-blue-500 transition-all duration-300"
									key={i}
								>
									{item.title}
								</Link>
							)
						)}
					</div>

					{/* Login and SignUp buttons for desktop view */}
					{!isLoggedIn && (
						<div className="hidden md:flex gap-4">
							<Link
								to="/LogIn"
								className={`border border-blue-500 ${buttonStyles}`}
							>
								LogIn
							</Link>
							<Link to="/SignUp" className={`bg-blue-500 ${buttonStyles}`}>
								SignUp
							</Link>
						</div>
					)}

					{/* Hamburger menu button for mobile view */}
					<button
						className="block md:hidden text-white text-2xl hover:text-zinc-400"
						onClick={() =>
							setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"))
						}
						aria-label="Toggle Navigation Menu"
					>
						<FaGripLines />
					</button>
				</div>
			</nav>

			{/* Mobile navigation menu */}
			<div
				className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-50 flex flex-col items-center justify-center`}
			>
				{/* Navigation links for mobile menu */}
				{filteredLinks.map((item, i) => (
					<Link
						to={item.link}
						className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300"
						key={i}
						onClick={() => setMobileNav("hidden")}
					>
						{item.title}
					</Link>
				))}

				{/* Login and SignUp buttons for mobile menu */}
				{!isLoggedIn && (
					<>
						<Link
							to="/LogIn"
							className={`px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
							onClick={() => setMobileNav("hidden")}
						>
							LogIn
						</Link>
						<Link
							to="/SignUp"
							className={`px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
							onClick={() => setMobileNav("hidden")}
						>
							SignUp
						</Link>
					</>
				)}
			</div>
		</>
	);
};

export default Navbar;
