import { ethers } from 'hardhat';
import fs from "fs"

async function main() {
    const Account0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const contractAddress = JSON.parse(String(fs.readFileSync("./contractInfo/contractAddress.json")));
    const Escrow = await ethers.getContractFactory("TokenEscrow");
    const escrow = await Escrow.attach(contractAddress.escrow);
    const _cancel = await escrow.cancel(Account0);
    await _cancel.wait()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
