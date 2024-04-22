import React, { ComponentElement } from "react";
import MerchantCard from "./MerchantCard";
import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json";

const HomeBody = () => {
	const account = useAccount();
	const { data, isError, error, isLoading, isSuccess } = useReadContract({
		abi: [contractAbi.abi[3]],
		address: "0x3c248D09928a608b002b3822F751156849ef7680",
		account: account.address,
		functionName: "getMerchants"
	});

	if (isError) {
		console.error(error)
		return (
			<p className="text-read-500 font-semibold text-lg">Error fetching merchants</p>
		)
	}

	if (isLoading) {
		console.error(error)
		return (
			<p className="text-lg font-semibold text-slate-700">Loading...</p>
		)
	}



	return (
		<div className="">
			<p>{account.address}</p>
			<p className="">sadas</p>
			<p>{data?.toString()}</p>
			{/* {renderList()} */}
		</div>
	);
}


export default HomeBody;