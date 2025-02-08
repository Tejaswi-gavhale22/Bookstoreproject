// eslint-disable-next-line no-unused-vars
import React from "react";
import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types"; // Import PropTypes

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
	return (
		<>
			{/* Background overlay */}
			<div
				className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}
				onClick={() => setUserDiv("hidden")} // Close modal on background click
			></div>
			{/* Modal content */}
			<div
				className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}
			>
				<div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-semibold">User Information</h1>
						<button
							onClick={() => setUserDiv("hidden")} // Close button
						>
							<RxCross1 />
						</button>
					</div>
					<div className="mt-2">
						<label>
							Username:{" "}
							<span className="font-semibold">{userDivData.username}</span>
						</label>
					</div>
					<div className="mt-4">
						<label>
							Email: <span className="font-semibold">{userDivData.email}</span>
						</label>
					</div>
					<div className="mt-4">
						<label>
							Address:{" "}
							<span className="font-semibold">{userDivData.address}</span>
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

// Define PropTypes for the component
SeeUserData.propTypes = {
	userDivData: PropTypes.shape({
		username: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
	}).isRequired,
	userDiv: PropTypes.string.isRequired,
	setUserDiv: PropTypes.func.isRequired,
};

export default SeeUserData;
