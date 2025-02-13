// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Profile/Sidebar";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Outlet } from "react-router-dom";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
	const [profile, setProfile] = useState(null);

	// Memoize headers to avoid re-creating it on each render
	const headers = useMemo(
		() => ({
			id: localStorage.getItem("id"),
			authorization: `Bearer ${localStorage.getItem("token")}`,
		}),
		[]
	); // Empty array to ensure headers are memoized and not recreated on each render

	// Fetch Profile Data from API
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(
					"https://bookstoreproject-2euo.onrender.com/api/v1/get-user-information",
					{ headers }
				);
				setProfile(response.data); // Set Profile Data
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};
		fetchProfile();
	}, [headers]); // Include headers as a dependency

	return (
		<div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
			{/* Show Loader until profile is loaded */}
			{!profile ? (
				<div className="w-full h-[100%] flex items-center justify-center">
					<Loader />
				</div>
			) : (
				<>
					{/* Sidebar with profile data */}
					<div className="w-full md:w-1/6 h-auto lg:h-screen">
						<Sidebar data={profile} />
						<MobileNav />
					</div>
					{/* Main content area */}
					<div className="w-full md:w-5/6">
						<Outlet />
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
