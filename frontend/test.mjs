import { Network, Alchemy } from "alchemy-sdk";


const config = {
    apiKey: "6CvmSQzcvce0QImFAUMS4OQNOqPrNzwq", // Replace with your API key
    network: Network.MATIC_MUMBAI, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

let options = {
    contractAddresses: ["0xf4b0e08127eC5d82Cae0c81DF37B284ED8f2Efd0"],
};

const main = async () => {
    let owner  = "0xD32e4f7fAF9d263267061CBdb2a2EFd513E5Eb50";
    
    //Call the method to get the nfts owned by this address
    let response = await alchemy.nft.getNftsForOwner(owner, options);

    //Logging the response to the console
    console.log(response)
};

main();