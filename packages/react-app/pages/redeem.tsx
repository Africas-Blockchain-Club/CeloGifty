import { useAccount, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { parseEther } from "viem";
import { useRouter } from "next/router";
import { parseAccount } from "viem/utils";
import MerchantCard from "@/components/MerchantCard";
import Link from "next/link";
import Loading from "@/components/Loading";
import SuccessPayment from "@/components/SuccessPayment";
import { QrCodeIcon } from "@heroicons/react/24/outline";

const Redeem = () => {
	const account = useAccount();
	const { data, error, isError, isPending, isSuccess, writeContract } = useWriteContract();
	let [amount, setAmount] = useState(0);
	const router = useRouter();



	const redeem = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const query = router.query;




		writeContract({
			abi: contractABI.abi,
			account: account.address,
			address: "0x314Ea9980D7251287AcFeFbe09dA7d6eF1A70150",
			functionName: "redeemCard",
			args: [query.key, query.merchantAddress, amount],
			value: parseEther(`${amount}`)

		})
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

	if (isPending) {
		return <Loading />
	}

	if (isSuccess) {
		return (
			<SuccessPayment />
		);
	}


	return (<div className="min-h-screen w-screen">

		<img src="buycard.png"></img>
		<form className="max-w-sm mx-auto" onSubmit={redeem}>

			<div className="relative flex justify-center items-center">
				<div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
					<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
						<path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
					</svg>
				</div>
				<input type="text" id="amount" aria-describedby="helper-text-explanation" className="bg-gray-50 border py-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount" onChange={onAmountChanged} required />
				<QrCodeIcon height={50} className="px-2" />
			</div>
			{/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a 5 digit number from 0 to 9.</p> */}
			<div className="flex  justify-center gap-x-2">
				<button className="group mt-10 flex w-1/2 items-center justify-center rounded-lg bg-red-500 py-4 text-center font-bold text-white transition" onClick={cancel}>
					Cancel
				</button>
				<button className="group mt-10 flex w-1/2 items-center justify-center rounded-lg bg-blue-700 py-4 text-center font-bold text-white transition" type="submit">
					Redeem
					<svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>

		</form>
	</div>)
}


export default Redeem;