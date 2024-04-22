import { useRouter } from "next/router";
import React from "react";

const MyCard = ({ name, cardID, merchantAddress, value, logo }: any) => {
	const router = useRouter();
	const redeem = () => {
		// console.log(address)
		router.push({
			pathname: '/redeem',
			query: { merchantAddress: merchantAddress, name: name, key: cardID }
		})
	}

	console.log(value)

	return (
		<div className="card w-96 bg-primary text-primary-content p-2">
			<div className="card-body">
				<h2 className="card-title ">{`${name}`}</h2>
				<h2 className="card-body">{`${value}`}</h2>
				{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
				<div className="card-actions justify-end" onClick={redeem}>
					<button className="btn">Redeem</button>
				</div>
			</div>
		</div>
	);
}

export default MyCard;
