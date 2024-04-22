import { useAccount, useReadContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import MerchantCard from "./MerchantCard";
import MyCard from "./MyCard";
import { useEffect, useState } from "react";
import GiftCard from "./GiftCard";
import Loading from "./Loading";

const MyCardsTab = () => {
	const account = useAccount();
	const [celoPrice, setCeloPrice] = useState(null);
	const [celoAmount, setCeloAmount] = useState(null);
	const [usdAmount, setUsdAmount] = useState(0);
	const { data, isError, isSuccess, isLoading } = useReadContract({
		abi: contractABI.abi,
		account: account.address,
		address: "0x323D5128A3BC9Ce0472cDC750De03438d508347F",
		functionName: "viewCards",
	});

	function weiToCelo(weiAmount: BigInt): string {
		// Define the conversion rate
		const conversionRate = BigInt('1000000000000000000');
		// Perform the conversion
		const celoAmount = (weiAmount / conversionRate).toString();
		return celoAmount;
	}


	const fetchCeloPrice = (): Number => {
		return 0.8068;
	};



	if (isLoading) {
		return (
			<Loading />
		);
	}


	const renderList = () => {
		const listItems: Array<any> = [];
		const list = data as Array<any>;

		for (let idx = 0; idx < list.length; idx++) {
			let card: any = list[idx]
			let value = weiToCelo(card.value)
			const celoPrice: Number = fetchCeloPrice()

			const convertedUsdAmount = celoPrice * Number.parseInt(`${value}`);


			console.log(card)
			console.log(card.cardID)
			listItems.push(<div className="p-2 py-2"><GiftCard value={convertedUsdAmount} cardID={card.cardID} name={card.merchantName} merchantAddress={card.merchant} logo={""} /></div>)
		}

		return listItems;
	}

	return (
		<div className="w-screen">
			{renderList()}
		</div>
	);
}

export default MyCardsTab;