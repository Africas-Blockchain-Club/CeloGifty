import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
    const [userAddress, setUserAddress] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const { address, isConnected } = useAccount();

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

    return (
        <div className="flex flex-col justify-center items-center">
            {isConnected ? (
                <HomeApp />
            ) : (
                <div className="bg-gray-500 font-mono">No Wallet Connected</div>
            )}
        </div>
    );
}
