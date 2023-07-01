const ethers = require('ethers');
const fs = require('fs');
const path = require("path");
require('dotenv').config();
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
// input privatekey from backend # MINTER ADDRESS
const privateKey = process.env.ADMIN_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.RANK_CONTRACT_ADDRES;
const filePath = path.join(__dirname, './config/abi/NFT1155.json');
const abi = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const contract = new ethers.Contract(contractAddress, abi, wallet);
// to be filled by backend

async function mint(rankId, receiver) {
    try {
        var  txnReceipt = await contract.mint(rankId,receiver,{gasPrice: ethers.utils.parseUnits("100", "gwei"), gasLimit: 400000});
        txnReceipt = await txnReceipt.wait();
        // Mint is actually transfer in blockchain
        tokenId = parseInt((txnReceipt.events[0].data).slice(0,66));
        console.log("tokenId:", tokenId, ",transactionHash:", txnReceipt.transactionHash);
    } catch(e) {
        console.log(e)
    }
};

mint(2, "0x6F959C729dDa57B8c1Ad15E7693C8Fd2813BAaF1")


