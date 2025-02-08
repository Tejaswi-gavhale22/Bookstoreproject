// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Logout icon
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data = {} }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const role = useSelector((state) => state.auth.role);

	const handleLogout = () => {
		dispatch(authActions.logout());
		dispatch(authActions.changeRole("user"));
		localStorage.removeItem("id");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		navigate("/");
	};

	return (
		<div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
			{/* Profile Section */}
			<div className="flex flex-col items-center">
				<img
					src={data?.avatar || "/default-avatar.png"}
					className="h-16 w-16 rounded-full border border-gray-400"
					alt="User Avatar"
				/>
				<p className="mt-3 text-lg font-semibold text-white">
					{data.username || "User"}
				</p>
				<p className="text-sm text-gray-400">
					{data.email || "user@example.com"}
				</p>

				{/* Divider */}
				<div className="w-full mt-4 h-[1px] bg-zinc-500"></div>
			</div>

			{/* Navigation Links */}
			<div className="w-full flex-col items-center justify-center hidden lg:flex">
				{role === "user" && (
					<>
						<Link
							to="/profile"
							className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
						>
							Favourites
						</Link>
						{/* <Link
							to="/profile/orderHistory"
							className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
						>
							Order History
						</Link> */}
						<Link
							to="/profile/settings"
							className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
						>
							Settings
						</Link>
					</>
				)}

				{role === "admin" && (
					<div className="w-full flex-col items-center justify-center hidden lg:flex">
						<Link
							to="/profile"
							className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
						>
							All Orders
						</Link>
						<Link
							to="/profile/add-book"
							className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
						>
							Add Book
						</Link>
					</div>
				)}
			</div>

			{/* Logout Button */}
			<button
				className="bg-red-600 w-5/6 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-red-700 transition-all duration-300"
				onClick={handleLogout}
			>
				<FaSignOutAlt className="mr-2" />
				Log Out
			</button>
		</div>
	);
};

// Prop validation
Sidebar.propTypes = {
	data: PropTypes.shape({
		avatar: PropTypes.string,
		username: PropTypes.string,
		email: PropTypes.string,
	}),
};

export default Sidebar;
