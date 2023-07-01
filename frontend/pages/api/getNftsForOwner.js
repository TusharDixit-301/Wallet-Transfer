// Importing required libraries from alchemy-sdk
import { Network, Alchemy, NftFilters } from "alchemy-sdk";

export default async function handler(req, res) {
  // Parsing the required data from the request body
  const { address, pageSize, chain, excludeFilter, pageKey } = JSON.parse(
    req.body
  );
  console.log(chain);

  // Handling only POST requests
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  // Setting the API key and network for the Alchemy SDK
  const settings = {
    apiKey: "6CvmSQzcvce0QImFAUMS4OQNOqPrNzwq",
    network: Network[chain],
  };
  const alchemy = new Alchemy(settings);

  try {
    // Fetching the NFTs for an owner with the Alchemy SDK
    const nfts = await alchemy.nft.getNftsForOwner(address, {
      pageSize: pageSize ? pageSize : 100,
      pageKey: pageKey ? pageKey : "",
      contractAddresses: ["0xf4b0e08127eC5d82Cae0c81DF37B284ED8f2Efd0"],
    });

    const formattedNfts = nfts.ownedNfts.map((nft) => {
      const {
				contract,
				title,
				tokenType,
				tokenId,
				description,
				media,
				tokenUri,
			} = nft;

      return {
				contract: contract.address,
				symbol: contract.symbol,
				media: tokenUri?.gateway,
				format: media[0]?.format,
				collectionName: 'Godly Artwork',
				verified: 'verified',
				tokenType,
				tokenId,
				title,
				description,
      };
    });

    // Sending the formatted NFTs and page key as a JSON response
    res.status(200).json({ nfts: formattedNfts, pageKey: nfts.pageKey });
  } catch (e) {
    // Logging the error and sending a response with an error message
    console.warn(e);
    res.status(500).send({
      message: "something went wrong, check the log in your terminal",
    });
  }
}