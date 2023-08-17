import { ethers } from 'hardhat';
import fs from "fs"

async function main() {
    const Account0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const Account1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const contractAddress = JSON.parse(String(fs.readFileSync("./contractInfo/contractAddress.json")));
    const MyCrypto = await ethers.getContractFactory("SotoCoin");
    const myCrypto = await MyCrypto.attach(contractAddress.myCrypto);
    const _balance = await myCrypto.balanceOf(Account0);
    console.log("El balance es: ", _balance);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
