import React, { ComponentElement, useState } from "react";
// import MerchantCard from "./MerchantCard";
import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import SearchBar from "@/components/SearchBar";
import MerchantCard from "@/components/MerchantCard";
import MyCardsTab from "@/components/MyCardsTab";

const UserHome = () => {
	const account = useAccount();
	const { data, isError, error, isLoading, isSuccess } = useReadContract({
		abi: contractAbi.abi,
		address: "0x323D5128A3BC9Ce0472cDC750De03438d508347F",
		account: account.address,
		functionName: "getMerchants"
	});

	let [selectedScreen, setSelectedScreen] = useState(0);


	const render = () => {

		if (isSuccess) {
			console.log(data);
			if (selectedScreen == 0) {
				return (
					<>
						{renderList()}
					</>
				)
			} else if (selectedScreen == 1) {
				return <MyCardsTab />
			} else {
				return (<>Settings Tab</>)
			}
			{/* {renderList()} */ }
		} else if (isError) {
			console.error(error)
			return (
				<p className="text-read-500 font-semibold text-lg">Error fetching merchants</p>
			)
		} else {
			return (
				<div className="items-center justify-center flex h-96">
					<span className="loading loading-dots loading-lg text-indigo-700 "></span>
				</div>
			)
		}
	}

	const renderList = () => {
		const listItems: Array<any> = [];
		const list = data as Array<any>;

		for (let idx = 0; idx < list.length; idx++) {
			let merchant: any = list[idx]
			listItems.push(<MerchantCard name={merchant.name} address={merchant.merchantID} logo={""} />)
		}

		return listItems;
	}


	return (
		<div className="w-screen min-h-screen">
			<NavBar />
			<SearchBar />
			<div className="flex flex-col mx-auto justify-center items-center pt-8">
				{render()}
			</div>
			<BottomNavBar selectedIndex={selectedScreen} onChange={setSelectedScreen} />
		</div >
	);
}


export default UserHome;