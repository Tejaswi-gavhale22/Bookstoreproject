// eslint-disable-next-line no-unused-vars
import React from "react";
import {
	FaInstagramSquare,
	FaFacebookSquare,
	FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-zinc-800 text-white px-8 py-4">
			<div className="f-info flex flex-col items-center gap-4">
				<div className="f-info-socials flex gap-4 text-3xl">
					<a
						href="https://www.instagram.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaInstagramSquare className="text-white hover:text-gray-400" />
					</a>
					<a
						href="https://www.facebook.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaFacebookSquare className="text-white hover:text-gray-400" />
					</a>
					<a
						href="https://www.linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin className="text-white hover:text-gray-400" />
					</a>
				</div>
				<div className="f-info-links flex gap-4">
					<a href="/privacy" className="hover:underline">
						Privacy
					</a>
					<a href="/terms" className="hover:underline">
						Terms
					</a>
				</div>
				<h1 className="text-md font-medium text-center">
					{"\u00A9"} 2025, Made With ❤️ By TEJASWI GAHVALE
				</h1>
			</div>
		</footer>
	);
};

export default Footer;
