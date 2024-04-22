import MerchantCard from "@/components/MerchantCard";
import RedeemButton from "@/components/RedeemButton";
import { ArrowLeftIcon, BackspaceIcon, BackwardIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { integerRegex, parseEther } from "viem/utils";
import { useAccount, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import Loading from "@/components/Loading";
import SuccessPayment from "@/components/SuccessPayment";
import DeleteButton from "@/components/DeleteButton";


const CardBalance = (props: { merchantName: string, cardBalance: string }) => {
	return (
		<div className="w-11/12 rounded-md flex justify-center mb-8 px-4 py-10 bg-slate-100">
			<img className="w-1/4" src="placeholder.jpg"></img>
			<div className="flex flex-col justify-center items-start pl-4" >
				<p className="font-semibold text-lg text-black">{props.merchantName}</p>
				<p className="text-4xl font-bold">{`${props.cardBalance} USD`}</p>
			</div>
		</div>
	)
}




const CardDetails = () => {
	const account = useAccount();
	const { data, error, isError, isPending, isSuccess, writeContract } = useWriteContract();
	const router = useRouter();

	const query = router.query;

	const key = query.key;

	const redeem = (amount: bigint) => {

		writeContract({
			abi: contractABI.abi,
			account: account.address,
			address: "0x9909C45eBaAb8e7CD888Ba73C4027F42512E0ed9",
			functionName: "redeemCard",
			args: [query.key, query.merchantAddress, amount],

		})
	}



	const cancel = () => {
		router.push("/")
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


	const usdToCelo = () => { }



	return (
		<div className="w-screen flex flex-col justify-center items-center">
			<div className="flex justify-start items-start w-screen mb-10">
				<ArrowLeftIcon onClick={() => { router.back() }} className="ml-4 h-10 w-10 text-slate-500" />
			</div>

			<CardBalance merchantName={`${query.name}`} cardBalance={`${query.value}`} />
			<Barcode width={0.88} fontSize={16} value={`${query.key}`} />
			{/* <button className="group mt-10 mx-4 flex w-11/12 items-center justify-center rounded-lg bg-blue-700 py-4 text-center font-bold text-white transition" type="submit">
				Redeem
			</button> */}
			<RedeemButton redeem={redeem} merchantAddress={`${query.merchantAddress}`} />
			{/* <button className="group mt-4 mx-4 flex w-11/12 items-center justify-center rounded-lg bg-red-500 py-4 text-center font-bold text-white transition" delete={deleteCard} type="submit">
				Delete Card
			<RedeemButton redeem={redeem} merchantAddress={`${query.merchantAddress}`} />
			</button> */}
			<DeleteButton key={`${query.key}`} />
		</div>
	)
}


export default CardDetails;