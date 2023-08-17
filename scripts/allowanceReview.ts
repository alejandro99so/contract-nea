import { ethers } from 'hardhat';
import fs from "fs"

async function main() {
    const Account0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const Account1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const Account2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    const contractAddress = JSON.parse(String(fs.readFileSync("./contractInfo/contractAddress.json")));
    const MyCrypto = await ethers.getContractFactory("SotoCoin");
    const myCrypto = await MyCrypto.attach(contractAddress.myCrypto);
    const _allowance = await myCrypto.allowance(Account0,contractAddress.escrow);
    console.log("El allowance es: ", _allowance);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
