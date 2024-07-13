import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import Loading from "@/components/Loading";


const OnBoarding = () => {
	let [selected, setSelected] = useState("merchant")
	const router = useRouter()
	const setSelectedState = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelected(event.target.value);
	}

	const { data, error, isSuccess, isPending, writeContract } = useWriteContract()


	const account = useAccount();
	const continueHandler = async () => {
		if (selected == "merchant") {
			router.push("register_merchant")
		} else {
			writeContract({
				abi: contractABI.abi,
				address: "0x3c248D09928a608b002b3822F751156849ef7680",
				account: account.address,
				functionName: "createUser",
				args: [false],
			})
		}
	}

	const goHome = () => {
        router.push("/"); // Redirect to the landing page
    };

	if (isSuccess) {
		router.push("/");
	}

	if (error) {
		console.error(error);
	}

	if (isPending) {
		return (<Loading />)
	}

	return (
		
		<div className="flex h-screen items-center justify-between relative w-screen">
			{/* <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/cgc_bg_img.svg")' }}></div> */}
			<div className="relative flex w-[22rem] flex-col justify-center overflow-hidden rounded-lg bg-white/50 py-32 px-2 w-full items-center">
				<span className="absolute top-0 h-1 w-1/6 bg-blue-600"></span>

				<div className="flex flex-col items-center w-full h-screen m-12 py-12 pt-32">
					<p className="text-2xl pb-12 font-medium text-gray-600"><b>Welcome to CeloGiftCard!</b></p>
					<img width={400} src="gift_card_landing.png" className="pb-1 pt-0" />
					<div className="mt-2 space-y-5">
						<h2 className="text-center text-sm uppercase text-gray-600">What are you looking to do?</h2>
						<div className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700">
							<input className="peer hidden" type="radio" name="framework" id="merchant" value={"merchant"} onChange={setSelectedState} checked={selected == "merchant"} />
							<label className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-green-900" htmlFor="merchant"> </label>
							<div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-green-900 ring-offset-2 peer-checked:border-transparent peer-checked:bg-green-900 peer-checked:ring-2"></div>
							<span>Sell</span>
						</div>
						<div className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700">
							<input className="peer hidden" type="radio" name="framework" id="customer" value={"customer"} onChange={setSelectedState} checked={selected == "customer"} />
							<label className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-green-900" htmlFor="customer"> </label>
							<div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-green-900 ring-offset-2 peer-checked:border-transparent peer-checked:bg-green-900 peer-checked:ring-2"></div>
							<span>Purchase</span>
						</div>
					</div>
					<div className="flex flex-box mt-auto bottom-0 ">
					{/* <button className="group mt-10 mr-2 flex w-40 items-center justify-center rounded-lg bg-red-700 py-2 text-center font-bold text-white transition" onClick={goHome}>
						<svg xmlns="http://www.w3.org/2000/svg" className="ml-0 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
						Back </button> */}
					<button className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition" onClick={continueHandler}>
						Continue
						<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</button>
					</div>
				</div>
			</div>
			
		</div>

	)
}

export default OnBoarding;