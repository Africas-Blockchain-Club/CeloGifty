import { useAccount, useReadContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import MerchantCard from "./MerchantCard";
import MyCard from "./MyCard";

const MyCardsTab = () => {
	const account = useAccount();
	const { data, isError, isSuccess, isLoading } = useReadContract({
		abi: contractABI.abi,
		account: account.address,
		address: "0x323D5128A3BC9Ce0472cDC750De03438d508347F",
		functionName: "viewCards",
	});


	if (isLoading) {
		return (
			<div className="items-center justify-center flex h-96">
				<span className="loading loading-dots loading-lg text-indigo-700 "></span>
			</div>
		);
	}


	const renderList = () => {
		const listItems: Array<any> = [];
		const list = data as Array<any>;

		for (let idx = 0; idx < list.length; idx++) {
			let card: any = list[idx]
			console.log(card)
			console.log(card.cardID)
			listItems.push(<MyCard value={card.value} cardID={card.cardID} name={card.merchantName} merchantAddress={card.merchant} logo={""} />)
		}

		return listItems;
	}

	return (
		<>
			{renderList()}
		</>
	);
}

export default MyCardsTab;