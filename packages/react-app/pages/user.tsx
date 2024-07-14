import React, { ComponentElement, useState } from "react";
// import MerchantCard from "./MerchantCard";
import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json";
import NavBar from "@/components/NavBar";
import BottomNavBar from "@/components/BottomNavBar";
import SearchBar from "@/components/SearchBar";
import MerchantCard from "@/components/MerchantCard";
import MyCardsTab from "@/components/MyCardsTab";
import QRCode from "react-qr-code";
import Loading from "@/components/Loading";

const UserHome = () => {
	const account = useAccount();
	const { data, isError, error, isLoading, isSuccess } = useReadContract({
		abi: contractAbi.abi,
		address: "0x314Ea9980D7251287AcFeFbe09dA7d6eF1A70150",
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
				return (
					<div className="w-5/6 pt-24">
						<QRCode
							size={500}
							style={{ height: "auto", maxWidth: "100%", width: "100%" }}
							value={`${account.address}`}
							viewBox={`0 0 256 256`}
						/>
					</div>
				);
			}
			{/* {renderList()} */ }
		} else if (isError) {
			console.error(error)
			return (
				<p className="text-read-500 font-semibold text-lg">Error fetching merchants</p>
			)
		} else {
			return (
				<Loading />
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
			<div className="flex flex-col w-full mx-auto justify-center items-center pt-4">
				{render()}
			</div>
			<BottomNavBar selectedIndex={selectedScreen} onChange={setSelectedScreen} />
		</div >
	);
}


export default UserHome;