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
import TransferButton from "@/components/TransferButton";


const CardBalance = (props: { merchantName: string, cardBalance: string }) => {
	return (
		<div className="px-4 mx-auto flex flex-col mb-2">
			<div className="border  border-slate-200 mb-4"></div>
			<div className=" rounded-md flex justify-center mx-4  gap-x-4 px-2 py-2">
				<img className="w-1/4" src="placeholder.jpg"></img>
				<div className="flex flex-col justify-center items-start pl-4" >
					<p className="font-semibold text-lg text-black">{props.merchantName}</p>
					<p className="text-2xl font-bold">{`${props.cardBalance} USD`}</p>
				</div>
			</div>
			<div className="border  border-slate-200 mt-4 "></div>
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
			address: "0x314Ea9980D7251287AcFeFbe09dA7d6eF1A70150",
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
			<div className="flex justify-start items-start w-screen mb-4">
				<ArrowLeftIcon onClick={() => { router.back() }} className="ml-4 h-6 w-6 text-slate-500" />
			</div>

			<CardBalance merchantName={`${query.name}`} cardBalance={`${query.value}`} />
			{/* <div className="bg-red-500"> */}
			
			<div className="mt-4">
			<p className="text-sm pl-2">Show this to the merchant</p>
			<Barcode width={0.80} fontSize={12} value={`${query.key}`} />
			</div>
			{/* </div> */}
			{/* <button className="group mt-10 mx-4 flex w-11/12 items-center justify-center rounded-lg bg-blue-700 py-4 text-center font-bold text-white transition" type="submit">
				Redeem
			</button> */}
			<RedeemButton redeem={redeem} merchantAddress={`${query.merchantAddress}`} />
			{/* <button className="group mt-4 mx-4 flex w-11/12 items-center justify-center rounded-lg bg-red-500 py-4 text-center font-bold text-white transition" delete={deleteCard} type="submit">
				Delete Card
			<RedeemButton redeem={redeem} merchantAddress={`${query.merchantAddress}`} />
			</button> */}
			<TransferButton redeem={redeem} merchantAddress={`${query.merchantAddress}`} />


			<DeleteButton   key={`${query.key}`} />
		</div>
	)
}


export default CardDetails;