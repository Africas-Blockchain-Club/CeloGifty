import Link from "next/link";
import React, { useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import { useRouter } from "next/router";
import Loading from "@/components/Loading";


const MerchantRegister = () => {
	const account = useAccount()
	const { data, error, isSuccess, isPending, writeContract } = useWriteContract();
	let [name, setName] = useState("");
	const router = useRouter();

	const registerMerchant = () => {
		if (name != "") {
			writeContract({
				abi: contractABI.abi,
				address: "0x3c248D09928a608b002b3822F751156849ef7680",
				account: account.address,
				functionName: "createMerchant",
				args: [name]
			})
		}
	}


	if (isSuccess) {
		router.push("/");
	}

	if (error) {
		console.log(error)
	}



	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	}

	const goHome = () => {
        router.push("/"); // Redirect to the landing page
    };


	return (

		<div className="flex flex-col items-center justify-center w-full p-20">
			<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-8">
				<div className="flex flex-col items-center justify-center pt-5 pb-6">
					<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
					</svg>
					<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload logo</span> or drag and drop</p>
					<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
				</div>
				<input id="dropzone-file" type="file" className="hidden" />
			</label>

			<input type="text" required placeholder="Company Name" className="input input-bordered w-full max-w-xs mt-8 bg-gray-100" onChange={onNameChange} />

			<button onClick={registerMerchant} className={`group mt-10 flex w-full items-center justify-center rounded-lg ${error ? 'bg-red-700' : 'bg-blue-700'} py-4 text-center font-bold text-white transition ${isPending ? 'disabled' : ''} `}>
				{isPending ?
					<Loading />
					: error ?
						'Failed' :
						'Continue'}
				<svg xmlns="http://www.w3.org/2000/svg" className={`ml-4 h-4 w-4 transition-transform group-hover:translate-x-2 ${isPending ? 'hidden' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</button>
			<button onClick={goHome} className={`group mt-10 flex w-full items-center justify-center rounded-lg ${error ? 'bg-red-700' : 'bg-red-700'} py-4 text-center font-bold text-white transition`}>
    {/* SVG icon for the left-facing arrow */}
    <svg xmlns="http://www.w3.org/2000/svg" className={`mr-4 h-4 w-4 transition-transform group-hover:-translate-x-2 ${isPending ? 'hidden' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    
    {/* Text label for the button */}
    Back
</button>


		</div>



	);
}

export default MerchantRegister;