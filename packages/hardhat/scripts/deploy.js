const hre= require("hardhat");


async function main() {
	const [deployer] = await hre.ethers.getSigners();

	console.log("Deploying contracts with the account : ", deployer.address);

	const giftCard = await hre.ethers.getContractFactory("GiftCard");
	const contract = await giftCard.deploy();

	console.log("Contract deployed at : ", contract.address);
}

main()