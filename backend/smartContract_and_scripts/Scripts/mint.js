const fs = require('fs');
const ethers = require('ethers');
const path = require("path");
require('dotenv').config()
const nfts = require(`../NFTGalleryURLs.json`);
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
const privateKey = process.env.ADMIN_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.NFTGALLERY_CONTRACT_ADDRESS;
console.log(process.env.NFTGALLERY_CONTRACT_ADDRESS)
const filePath = path.join(__dirname, './config/abi/NFT721.json');
const abi = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const contract = new ethers.Contract(contractAddress, abi, wallet);

const price = 10000

async function mint(){
    try {
        let tokenId;
        count = 1
        for( const element of nfts ) {
            var  txn = await contract.mint(element["token_URL"], price, {gasPrice: ethers.utils.parseUnits("50", "gwei"), gasLimit: 2000000});
            var tx = await txn.wait();
            tokenId = parseInt(tx.events[0]['topics'][3]);
            console.log("count:", count)
            console.log("tokenId:", tokenId)
            count = count + 1;
        }
    } catch(e) {
        console.log(e);
    }
}

mint();