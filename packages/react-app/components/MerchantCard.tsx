import { useRouter } from "next/router";
import React from "react";
import { useAccount } from "wagmi";

const MerchantCard = ({ name, address, logo }: any) => {
	const router = useRouter();
	const account = useAccount();
	const buy = () => {
		console.log(address)
		router.push({
			pathname: '/buy',
			query: { merchantAddress: address, merchantName: name }
		})
	}

	return (

		<div className="w-11/12 rounded-md bg-slate-400 glass m-1">
			<div className="flex flex-row">
				{/* <figure className="w-1/2 my-4">
					<img src="https://images.ctfassets.net/wr0no19kwov9/5yVbTScDuXaZE0JL0w1kL0/f626c00085927069b473e684148c36f3/Union_1_.svg" alt="Merchant" />
				</figure> */}
				{/* <p className="text-bold justify-end text-white dark:text-base text-2xl mx-12 my-4">{`${value} USD`}</p> */}
			</div>
			<div className="p-4  flex w-full">
				
				<div className=" w-full">
					<h1 className="flex text-xl font-semi">{`${name}`}</h1>
					<div className="flex w-full items-end  justify-end">
						<button className={`p-1 rounded-md text-white border-none text-sm ${address == account.address ? 'disabled bg-red-500' : 'bg-indigo-500'}`} onClick={(address == account.address) ? () => { } : buy}>Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MerchantCard;
