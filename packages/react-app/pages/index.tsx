
import HomeBody from "@/components/HomeBody";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import OnBoarding from "./onboarding";
import MetaMaskConnect from "@/components/MetaMaskConnect";
import contractABI from '../../hardhat/artifacts/contracts/GiftCard.sol/GiftCard.json';
import UserHome from "./user";
import MerchantHome from "./merchant";
import Loading from "@/components/Loading";

export default function Home() {
    const account = useAccount();
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();
    const { data, isError, error, isSuccess, isLoading } = useReadContract({
        abi: contractABI.abi,
        address: "0x9909C45eBaAb8e7CD888Ba73C4027F42512E0ed9",
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
                    Boolean(userData[0]).valueOf() ? <UserHome /> : <OnBoarding />
                    : (
                        <MetaMaskConnect />
                    )}
            </div>
        );
        return <></>
    } else if (isLoading) {
        return (<Loading />);
    } else if (isError) {
        console.log(error)
        return <MetaMaskConnect />
    } else {
        return (<span className="loading loading-dots loading-md"></span>);
    }

}
