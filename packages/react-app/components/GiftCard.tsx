import { useRouter } from "next/router";
import React from "react";


const GiftCard = ({ name, cardID, merchantAddress, value, logo }: any) => {
	const router = useRouter();
	const view = () => {
		// console.log(address)
		console.log(value)
		router.push({
			pathname: '/card_details',
			query: { merchantAddress: merchantAddress, name: name, key: cardID, value: value }
		})
	}
	return (
		<div className="card w-96 bg-slate-400 glass" onClick={view}>
			<div className="flex flex-row">
				{/* <figure className="w-1/2 my-4">
					<img src="https://images.ctfassets.net/wr0no19kwov9/5yVbTScDuXaZE0JL0w1kL0/f626c00085927069b473e684148c36f3/Union_1_.svg" alt="Merchant" />
				</figure> */}
				{/* <p className="text-bold justify-end text-white dark:text-base text-2xl mx-12 my-4">{`${value} USD`}</p> */}
			</div>
			<div className="card-body">
				<h1 className="card-title text-3xl">{`${name}`}</h1>
				<p className="font-bold justify-start text-white dark:text-base text-3xl  my-4">{`${value} USD`}</p>
				<div className="card-actions justify-end">
					<button className="btn" onClick={view}>View</button>
				</div>
			</div>
		</div>
	);
}

export default GiftCard;