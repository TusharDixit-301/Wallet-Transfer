// Importing Network and Alchemy from alchemy-sdk module
import { Alchemy, Network } from 'alchemy-sdk';
// Defining an async function called handler that accepts req and res objects
export default async function handler(req, res) {
	const ownerAddress = '0x6F959C729dDa57B8c1Ad15E7693C8Fd2813BAaF1';
	// Extracting data from the request body
	const { address, pageKey, pageSize, chain, excludeFilters } = JSON.parse(
		req.body
	);

	// Checking if the request method is POST
	if (req.method !== 'POST') {
		// If not, sending a 405 error response
		res.status(405).send({ message: 'Only POST requests allowed' });
		return;
	}

	// Logging the chain value
	//console.log('Chain Value : ', chain);

	// Creating an object with API key and network settings
	const settings = {
		apiKey: '6CvmSQzcvce0QImFAUMS4OQNOqPrNzwq',
		network: Network[chain],
	};

	// Creating a new Alchemy object using the settings object
	const alchemy = new Alchemy(settings);

	try {
		// Fetching NFTs for a given contract address from Alchemy API
		const nfts = await alchemy.nft.getNftsForContract(address, {
			pageKey: pageKey ? pageKey : null,
			pageSize: pageSize ? pageSize : null,
		});

		// Formatting the fetched NFTs data to a desired format
		const formattedNfts = nfts.nfts.map((nft) => {
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

		// Logging the formatted NFTs
		// console.log('NFT : ', formattedNfts);

		// Sending a success response with the formatted NFTs data and pageKey
		res.status(200).json({
			nfts: formattedNfts,
			pageKey: nfts.pageKey,
		});
	} catch (e) {
		// If any error occurs, sending a 500 error response
		console.warn(e);
		res.status(500).send({
			message: 'something went wrong, check the log in your terminal',
		});
	}
}
