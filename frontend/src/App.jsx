// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth.js";
import Favourite from "./components/Profile/Favourite.jsx";
import UserOrderHistory from "./components/Profile/UserOrderHistory.jsx";
import Settings from "./components/Profile/Settings.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import AddBook from "./pages/AddBook.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";

const App = () => {
	const dispatch = useDispatch();
	const role = useSelector((state) => state.auth.role);

	useEffect(() => {
		const userId = localStorage.getItem("Id");
		const token = localStorage.getItem("token");
		const userRole = localStorage.getItem("role");

		if (userId && token && userRole) {
			dispatch(authActions.login());
			dispatch(authActions.changeRole(userRole)); // Correctly fetch the role here
		}
	}, [dispatch]); // Add `dispatch` to dependency array

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/all-books" element={<AllBooks />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/profile" element={<Profile />}>
					{role === "user" ? (
						<Route index element={<Favourite />} />
					) : (
						<Route index element={<AllOrders />} />
					)}
					{role === "admin" && <Route path="add-book" element={<AddBook />} />}
					{/* <Route path="orderHistory" element={<UserOrderHistory />} /> */}
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/updateBook/:id" element={<UpdateBook />} />
				<Route path="/view-book-details/:id" element={<ViewBookDetails />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
