import React from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";


const MerchantHome = () => {
	const account = useAccount();

	return (// Can be anything instead of `maxWidth` that limits the width.
		<div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
			<QRCode
				size={500}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				value={`${account.address}`}
				viewBox={`0 0 256 256`}
			/>
		</div>)
}

export default MerchantHome;