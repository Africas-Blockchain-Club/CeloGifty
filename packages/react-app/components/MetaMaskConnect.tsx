import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

const MetaMaskConnect = () => {
	const { connect } = useConnect();

	useEffect(() => {
		if (window.ethereum && window.ethereum.isMiniPay) {
			connect({ connector: injected({ target: "metaMask" }) });
		}
	}, []);

	return (
		<Disclosure >
			{({ open }) => (
				<div className="flex justify-center">
					<ConnectButton
						showBalance={{
							smallScreen: false,
							largeScreen: false,
						}}
					/>

				</div>

			)}
		</Disclosure>
	);
}

export default MetaMaskConnect;