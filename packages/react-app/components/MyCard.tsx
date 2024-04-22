import { useRouter } from "next/router";
import React from "react";

const MyCard = ({ name, cardID, merchantAddress, value, logo }: any) => {
	const router = useRouter();
	const redeem = () => {
		console.log(value)
		router.push({
			pathname: '/card_details',
			query: { merchantAddress: merchantAddress, name: name, key: cardID, value: value }
		})
	}

	return (
		<div className="card w-96 bg-primary text-primary-content p-2">
			<div className="card-body">
				<h2 className="card-title ">{`${name}`}</h2>
				<h2 className="card-body">{`${value} USD`}</h2>
				<div className="card-actions justify-end" onClick={redeem}>
					<button className="btn">View</button>
				</div>
			</div>
		</div>
	);
}

export default MyCard;
