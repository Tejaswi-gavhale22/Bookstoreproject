const About = () => {
	return (
		<div className="mt-10 px-4">
			<h2 className="text-3xl text-yellow-100 mb-4 text-left">
				About Our Bookstore
			</h2>
			<div className="mt-12 px-6 flex flex-col md:flex-row items-center gap-6">
				{/* Left Side - Image */}
				<div className="w-full md:w-1/3">
					<img
						src="Book.jpg"
						alt="Bookstore"
						className="rounded-lg shadow-lg w-full"
					/>
				</div>

				{/* Right Side - Text Content */}
				<div className="w-full md:w-2/3">
					<p className="text-gray-300 text-left">
						Welcome to our student-friendly bookstore! We provide a wide range
						of books, including new, discounted, and second-hand options, along
						with study materials and notes. Our mission is to make learning
						accessible and affordable for everyone.
					</p>
					<p className="text-gray-300 mt-4 text-left">
						Explore books from various categories like Competitive Exams,
						Engineering, Medical, Pharmacy, Science, and more. Our platform is
						designed to help students find the right resources easily and
						conveniently.
					</p>
					<p className="text-gray-300 mt-4 text-left">
						Start your learning journey with us today and discover a world of
						knowledge at your fingertips!
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
