import { useRouter } from "next/router";
import React from "react";

const MerchantCard = ({ name, address, logo }: any) => {
	const router = useRouter();
	const buy = () => {
		console.log(address)
		router.push({
			pathname: '/buy',
			query: { merchantAddress: address }
		})
	}

	return (
		<div className="card w-96 bg-primary text-primary-content p-2">
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
				<div className="card-actions justify-end" onClick={buy}>
					<button className="btn">Buy Now</button>
				</div>
			</div>
		</div>
	);
}

export default MerchantCard;
