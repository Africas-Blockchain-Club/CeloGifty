import { BigNumber } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";

function RedeemButton(props: { redeem: Function }) {
	const [showModal, setShowModal] = useState(false);
	let [amount, setAmount] = useState(0);



	const onAmountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(Number.parseInt(event.target.value));
	}

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	function usdToCeloWei(usdAmount: number, exchangeRate: number): BigInt {
		const weiMultiplier = 10 ** 18;
		const celoInWei = BigInt(Math.floor(usdAmount * exchangeRate * weiMultiplier));
		return celoInWei;
	}

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();


		props.redeem(usdToCeloWei(amount, 1.151));
	}

	return (
		<>
			{/* Modal toggle */}
			<button
				onClick={toggleModal}
				data-modal-target="authentication-modal"
				data-modal-toggle="authentication-modal"
				className="group mt-10 mx-4 flex w-11/12 items-center justify-center rounded-lg bg-blue-700 py-4 text-center font-bold text-white transition"
				type="button"
			>
				Redeem
			</button>

			{/* Main modal */}
			{showModal && (
				<div
					id="authentication-modal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
				>
					<div className="relative p-4 w-full max-w-md max-h-full">
						{/* Modal content */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* Modal header */}
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Redeem gift card
								</h3>
								<button
									onClick={toggleModal}
									type="button"
									className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-hide="authentication-modal"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							{/* Modal body */}
							<div className="p-4 md:p-5">
								<form className="space-y-4" onSubmit={onSubmit}>
									<div>
										<label
											htmlFor="amount"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Purchase balance
										</label>
										<input
											type="number"
											name="amount"
											id="amount"
											placeholder="$300"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
											required
											min={0}
											step={0.0000000000000000001}
											onChange={onAmountChanged}
										/>
									</div>


									<button
										type="submit"
										className="w-full text-white bg-success  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										Finish
									</button>

								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default RedeemButton;