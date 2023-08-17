import { ethers } from 'hardhat';
import fs from "fs"

async function main() {
    const Account0 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const Account1 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const Account8 = "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f";
    const contractAddress = JSON.parse(String(fs.readFileSync("./contractInfo/contractAddress.json")));
    const Currency = await ethers.getContractFactory("USDTCoin");
    const _currency = await Currency.attach(contractAddress.myCrypto);
    const Escrow = await ethers.getContractFactory("TokenEscrow");
    const escrow = await Escrow.attach(contractAddress.escrow);
    const _allowance = await _currency.approve(contractAddress.escrow, 40000);
    await _allowance.wait();
    const _deposit = await escrow.deposit(40000, Account1);
    await _deposit.wait()
}


// Ejecutar la migración
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
