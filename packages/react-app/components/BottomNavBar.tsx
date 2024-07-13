import { CreditCardIcon, HomeIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAccount } from "wagmi";

const BottomNavBar = (props: { onChange: Function, selectedIndex: Number }) => {
	const [selectedIndex, setSelectedIndex] = useState(props.selectedIndex);
	const account = useAccount();
	const onSelectedIndexChanged = (index: Number) => {
		setSelectedIndex(index)
	}

	return (
		<div className="btm-nav">
			<button className={`${selectedIndex == 0 ? "active text-white" : "text-green-800"} `} onClick={() => {
				onSelectedIndexChanged(0);
				props.onChange(0);
			}}>
				{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> */}
				<HomeIcon />
				<span className="btm-nav-label">Home</span>
			</button>
			<button className={`${selectedIndex == 1 ? "active text-white" : "text-green-800"} `} onClick={() => {
				onSelectedIndexChanged(1)
				props.onChange(1);
			}}>
				{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 64C46.3 64 32 78.3 32 96v32H544V96c0-17.7-14.3-32-32-32H64zM32 160v64H544V160H32zm0 96V416c0 17.7 14.3 32 32 32H512c17.7 0 32-14.3 32-32V256H32zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM96 368c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zm128 0c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" /></svg> */}
				<CreditCardIcon />
				<span className="btm-nav-label">My Cards</span>
			</button>
			<button className={`${selectedIndex == 2 ? "active text-white" : "text-green-800"} `} onClick={() => {
				onSelectedIndexChanged(2)
				props.onChange(2);
			}}>
				{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> */}
				<QrCodeIcon />
				<span className="btm-nav-label">Address</span>
			</button>
		</div>
	);
}

export default BottomNavBar;