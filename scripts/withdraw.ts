import { ethers } from 'hardhat';
import fs from "fs"

async function main() {
    const contractAddress = JSON.parse(String(fs.readFileSync("./contractInfo/contractAddress.json")));
    const Escrow = await ethers.getContractFactory("TokenEscrow");
    const escrow = await Escrow.attach(contractAddress.escrow);
    const _confirm = await escrow.withdraw();
    await _confirm.wait()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
