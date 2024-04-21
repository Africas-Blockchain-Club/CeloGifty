import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';

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
				address: "0x323D5128A3BC9Ce0472cDC750De03438d508347F",
				account: account.address,
				functionName: "createUser",
				args: [false],
			})




		}
	}

	if (isSuccess) {
		router.push("/");
	}

	if (error) {
		console.error(error);
	}

	if (isPending) {
		return (<span className="loading loading-dots loading-md text-white"></span>)
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="relative flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg bg-white/50 py-32">
				<span className="absolute top-0 h-1 w-1/6 bg-blue-600"></span>

				<div className="flex flex-col items-center">
					<p className="text-2xl pb-4 font-medium text-gray-600">Welcome to Indigo!</p>
					<img width={150} src="indigo.png" className="pb-4" />


					<div className="mt-10 space-y-2">
						<h2 className="text-center text-sm uppercase text-gray-600">What are you looking to do?</h2>
						<div className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700">
							<input className="peer hidden" type="radio" name="framework" id="merchant" value={"merchant"} onChange={setSelectedState} checked={selected == "merchant"} />
							<label className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-blue-700" htmlFor="merchant"> </label>
							<div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-700 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-700 peer-checked:ring-2"></div>
							<span>Merchant</span>
						</div>
						<div className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700">
							<input className="peer hidden" type="radio" name="framework" id="customer" value={"customer"} onChange={setSelectedState} checked={selected == "customer"} />
							<label className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-blue-700" htmlFor="customer"> </label>
							<div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-700 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-700 peer-checked:ring-2"></div>
							<span>Consumer</span>
						</div>
					</div>

					<button className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition" onClick={continueHandler}>
						Continue
						<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</button>
				</div>
			</div>
		</div>

	)
}

export default OnBoarding;