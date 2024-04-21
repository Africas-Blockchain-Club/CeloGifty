import { useAccount, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { parseEther } from "viem";
import { useRouter } from "next/router";
import { parseAccount } from "viem/utils";
import Link from "next/link";
const Buy = () => {
	const account = useAccount();
	const { data, error, isError, isSuccess, writeContract } = useWriteContract();
	let [amount, setAmount] = useState(0);
	const router = useRouter();

	const buy = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let currentDate = new Date();

		const query = router.query;

		console.log(query);
		// Add a year
		currentDate.setFullYear(currentDate.getFullYear() + 1);

		writeContract({
			abi: contractABI.abi,
			account: account.address,
			address: "0x323D5128A3BC9Ce0472cDC750De03438d508347F",
			functionName: "createCard",
			args: [query.merchantAddress, uuidv4(), currentDate, false, false],
			value: parseEther(`${amount}`)

		})
	}

	if (isSuccess) {
		return (
			<div className="bg-gray-100 h-screen">
				<div className="bg-white p-6  md:mx-auto">
					<svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
						<path fill="currentColor"
							d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
						</path>
					</svg>
					<div className="text-center">
						<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Card Purchase Done!</h3>
						<p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>

						<div className="py-10 text-center">
							<Link href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
								GO BACK
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const cancel = () => {
		router.push("/")
	}

	const onAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(Number.parseInt(event.target.value));
	}

	if (isError) {
		console.error(error);
	}


	return (<div className="min-h-screen w-screen">
		<></>
		<form className="max-w-sm mx-auto" onSubmit={buy}>

			<label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Value</label>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
					<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
						<path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
					</svg>
				</div>
				<input type="text" id="amount" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount" onChange={onAmountChanged} required />
			</div>
			{/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a 5 digit number from 0 to 9.</p> */}
			<button className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition" type="submit">
				Continue
				<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</button>

			<button className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-red-700 py-2 text-center font-bold text-white transition" onClick={cancel}>
				Cancel
			</button>

		</form>
	</div>)
}


export default Buy;