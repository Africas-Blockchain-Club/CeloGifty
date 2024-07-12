import React from "react";

const SearchBar = () => {
	return (
		<div className="flex mx-2 pt-4">
			<input type="text" placeholder="Search" className="input bg-slate-200 focus:border-none focus:outline-none text-green-900 placeholder-green-900 w-full max-w-xs mr-1" />

			<button className="bg-gray-300 text-green-900  py-2 px-4 rounded-lg border border-green-900">
    Search
</button>

		</div>
	);
}

export default SearchBar;