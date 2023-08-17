import { ethers } from 'hardhat';
import fs from "fs"

async function main() {
    const MyCrypto = await ethers.getContractFactory("USDTCoin");
    const myCrypto = await MyCrypto.deploy();
    await myCrypto.deployed();
    const contractAddress = myCrypto.address;
    console.log({contractAddress})
    const MyEscrow = await ethers.getContractFactory("TokenEscrow");
    const Account1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const myEscrow = await MyEscrow.deploy(contractAddress);
    await myEscrow.deployed();
    console.log(myEscrow.address)
    fs.writeFileSync('./contractInfo/contractAddress.json', JSON.stringify({ myCrypto: contractAddress, escrow: myEscrow.address }));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
