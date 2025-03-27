// eslint-disable-next-line no-unused-vars
import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import Categories from "../components/Home/Categories";

const Home = () => {
	return (
		<div className="bg-zinc-900 text-white px-10 py-8">
			<Hero />
			<RecentlyAdded />
			<Categories />
		</div>
	);
};

export default Home;
