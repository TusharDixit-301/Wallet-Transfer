const fs = require('fs');
const ethers = require('ethers');
const path = require("path");
require('dotenv').config()
const filePath = path.join(__dirname, './config/abi/Token.json');
const tokenABI = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);


async function transfer(receiver, tokencontractAddress, amountToSend) {
    try {
        const contract = new ethers.Contract(tokencontractAddress, tokenABI, wallet);
        let txnHash = await contract.mint(receiver, amountToSend,{gasPrice: ethers.utils.parseUnits("50", "gwei"), gasLimit: 2000000});
        txnHash = await txnHash.wait();
        console.log("transactionHash:", txnHash["transactionHash"]);
    } catch (error) {
        console.log(error.code)
    }
}

transfer("0x6F959C729dDa57B8c1Ad15E7693C8Fd2813BAaF1", process.env.LP_CONTRACT_ADDRESS, "100000");
//LpReceiver
//tokencontractAddress
//LPs