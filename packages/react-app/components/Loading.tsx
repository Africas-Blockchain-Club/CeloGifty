import React from "react";

const Loading = () => {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<span className="loading loading-infinity loading-lg"></span>
		</div>
	);
}

export default Loading;