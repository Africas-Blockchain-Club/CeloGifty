import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import Loading from "./Loading";

function DeleteButton({ key }: any) {
	const account = useAccount();
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();
	const { data, error, isPending, isError, writeContract } = useWriteContract();

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const cardID: string = key;

	const deleteCard = () => {
		writeContract({
			abi: contractABI.abi,
			account: account.address,
			address: "0x3c248D09928a608b002b3822F751156849ef7680",
			functionName: "deleteCard",
			args: [cardID],

		})
	}

	if (isPending) {
		return <Loading />
	}

	if (isError) {
		console.error(error)
	}


	return (
		<>
			{/* Modal toggle */}
			<button
				onClick={toggleModal}
				data-modal-target="authentication-modal"
				data-modal-toggle="authentication-modal"
				className={`group text-red-500 mt-4 mx-4 flex w-11/12 items-center border-2 border-red-500  justify-center rounded-lg ${(isError) ? "bg-red-500" : ""} py-4 text-center font-bold text-white transition`}
				type="button"
			>
				{(isError) ? "Failed" : "Delete Card"}
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
									Delete gift card
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
								<button

									className="w-full text-white bg-success  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center mb-4  dark:bg-gree-600 "
									onClick={toggleModal}

								>
									Cancel
								</button>
								<button

									className="w-full text-white bg-red-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center"
									onClick={deleteCard}
								>
									Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default DeleteButton;