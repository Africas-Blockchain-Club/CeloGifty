import React, { ComponentElement } from "react";
import MerchantCard from "./MerchantCard";
import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json";

const HomeBody = () => {
	const account = useAccount();
	const { data, isError, error, isLoading, isSuccess } = useReadContract({
		abi: [contractAbi.abi[3]],
		address: "0x635877a9eBbb5Ff16549383f01A7d49FF27C5CfD",
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

	// const renderList = () => {
	// 	const listItems: Array<any> = [];
	// 	const list = data as Array<any>;

	// 	for (let idx = 0; idx < list.length; idx++) {
	// 		let merchant: any = list[idx]
	// 		listItems.push(<MerchantCard name={merchant.name} minimumPrice={0.1} logo={""} />)
	// 	}

	// 	return listItems;
	// }


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