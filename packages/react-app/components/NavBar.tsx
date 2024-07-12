import React from "react";
import { useDisconnect } from 'wagmi'
import { useRouter } from "next/router";

const NavBar = () => {

	const { disconnect } = useDisconnect()
	const router = useRouter();

	const handleLogout = () => {
        disconnect(); // Disconnect the connected wallet
        router.push("/"); // Redirect to the landing page
    };


	return (
		<div className="navbar bg-gray-800">
			<div className="flex-1">
				<p className="font-bold text-white pl-1 text-xl">CeloGiftCard.</p>
			</div>
			<div className="flex-none">

				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
						<div className="w-24 mask mask-squircle">
							<img alt="Tailwind CSS Navbar component" src="gift_card_landing.png" />
						</div>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li><a>Settings</a></li>
						<li><a onClick={handleLogout}>Logout</a></li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default NavBar;