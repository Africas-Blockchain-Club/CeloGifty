import React from "react";
import MerchantCard from "./MerchantCard";


const HomeApp = () => {
	const account = useAccount();
	const { data, isError, isSuccess } = useReadContract();

	const renderList = () => {
		const listItems: Array<React.Component> = [];
		const list = data as Array<any>;

		for (let idx = 0; idx < list.length; idx++) {
			listItems.push(<MerchantCard />)
		}

		return listItems;
	}

	return (
		<div className="">
			{renderList()}
		</div>
	);
}