import React from "react";

const SearchBar = () => {
	return (
		<div className="flex mx-2 pt-4">
			<input type="text" placeholder="Search" className="input bg-slate-200 focus:border-none focus:outline-none  w-full max-w-xs mr-1" />
			<button className="bg-indigo-600 rounded-md text-white px-2">Search</button>
		</div>
	);
}

export default SearchBar;