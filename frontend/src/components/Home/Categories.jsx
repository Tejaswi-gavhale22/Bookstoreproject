const Categories = () => {
	const categories = [
		{ title: "Competitive", icon: "🏆" },
		{ title: "Engineering", icon: "⚙️" },
		{ title: "Medical", icon: "🩺" },
		{ title: "Pharmacy", icon: "💊" },
		{ title: "Science", icon: "🔬" },
		{ title: "Other", icon: "📚" },
	];

	return (
		<div className="mt-8">
			<h2 className="text-2xl font-bold text-center mb-6">
				Explore Categories
			</h2>
			<div className="grid grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
				{categories.map((category, index) => (
					<div key={index} className="flex flex-col items-center">
						<span className="text-4xl">{category.icon}</span>
						<p className="mt-2 font-medium">{category.title}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
