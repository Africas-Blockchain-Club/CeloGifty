
import HomeBody from "@/components/HomeBody";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import OnBoarding from "./onboarding";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import UserHome from "./user";
import MerchantHome from "./merchant";

export default function Home() {
    const account = useAccount();
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const { data, isError, isSuccess, isLoading } = useReadContract({
        abi: contractABI.abi,
        address: "0x323D5128A3BC9Ce0472cDC750De03438d508347F",
        account: account.address,
        functionName: "getUser",
    })

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isConnected && address) {
            setUserAddress(address);
        }
    }, [address, isConnected]);

    if (!isMounted) {
        return null;
    }


    if (isSuccess) {
        const userData: Array<any> = data as Array<any>;
        console.log(userData);

        return (
            <div className="flex flex-col justify-center items-center w-screen min-h-screen">

                {isConnected ?
                    Boolean(userData[0]).valueOf() ? (Boolean(userData[1]).valueOf() ? <MerchantHome /> : <UserHome />) : <OnBoarding />
                    : (
                        <MetaMaskConnect />
                    )}
            </div>
        );
        return <></>
    } else if (isLoading) {
        return (<span className="loading loading-dots loading-md"></span>);
    } else if (isError) {
        return <p className="text-red-600 font-semibold text-xl">Internal Server Error. Please try again.</p>
    } else {
        return (<span className="loading loading-dots loading-md"></span>);
    }

}
