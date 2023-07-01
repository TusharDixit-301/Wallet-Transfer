// Importing necessary modules and components
import { Loading } from '@nextui-org/react';
import { readContract, waitForTransaction, writeContract } from '@wagmi/core';
import { useEffect, useState } from 'react';
import { BiSolidCoinStack } from 'react-icons/bi';
import NFTContract from '../contracts/nft-gallery.json';
import styles from '../styles/NftGallery.module.css';


export default function UserNFTGallery({
	walletAddress,
	collectionAddress,
	chain,
	pageSize,
    count,
}) {
    if(count == 0){
        return (
            <div className="flex flex-col justify-center items-center text-center mt-auto animate-gradient mb-auto h-[50vh]">
                <BiSolidCoinStack className="text-9xl text-gray-400" />
                <h1 className="text-4xl text-gray-400">No NFTs found</h1>
            </div>
        )
    }
	// Defining states for the component
	const [nfts, setNfts] = useState();
	const [isLoading, setIsloading] = useState(false);
	const [pageKey, setPageKey] = useState();
	const [excludeFilter, setExcludeFilter] = useState(true);

	// Defining functions for fetching NFTs
	const fetchNfts = async () => {
		setIsloading(true);
		if (walletAddress) {
			await getNftsForOwner();
		} else if (collectionAddress) {
			await getNftsForCollection();
		}
		setIsloading(false);
	};
	const getNftsForOwner = async () => {
		console.log(walletAddress);
		if (walletAddress) {
			try {
				// Making a POST request to the server to get NFTs
				const res = await fetch('/api/getNftsForOwner', {
					method: 'POST',
					body: JSON.stringify({
						address: walletAddress,
						pageSize: pageSize ? pageSize : 8,
						chain: chain ? chain : 'MATIC_MUMBAI',
						pageKey: pageKey ? pageKey : null,
						excludeFilter: excludeFilter,
					}),
				}).then((res) => res.json());
				if (pageKey?.length) {
					setNfts((prev) => {
						return [...prev, ...res.nfts];
					});
				} else {
					setNfts(res.nfts);
				}
				if (res.pageKey) {
					setPageKey(res.pageKey);
				} else setPageKey();
			} catch (e) {
				console.log(e);
			}
		}
	};

	// Defining useEffect hooks for fetching NFTs and updating when the wallet address changes
	useEffect(() => {
		if (walletAddress?.length) fetchNfts();
	}, [walletAddress]);

	const getNftsForCollection = async () => {
		if (collectionAddress) {
			try {
				console.log('collectionAddress');
				console.log('chain : ', chain);
				console.log('pageSize : ', pageSize);
				console.log();
				// Making a POST request to the server to get NFTs
				const res = await fetch('/api/getNftsForCollection', {
					method: 'POST',
					body: JSON.stringify({
						address: collectionAddress,
						pageSize: 8,
						chain: chain,
						pageKey: pageKey ? pageKey : null,
						excludeFilter: excludeFilter,
					}),
				}).then((res) => res.json());
				if (pageKey?.length) {
					setNfts((prev) => {
						return [...prev, ...res.nfts];
					});
				} else {
					setNfts(res.nfts);
				}
				if (res.pageKey) {
					setPageKey(res.pageKey);
				} else setPageKey();
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		// Calling fetchNfts on component mount
		fetchNfts();
	}, []);

	// If data is still loading, display a loading message

	// Once data is loaded, display NFT gallery
	return (
		<div className={styles.nft_gallery_page_container}>
			<div className={styles.nft_gallery}>
				<div className={styles.nfts_display}>
					{nfts?.length ? (
						nfts.map((nft) => {
							return <NftCard key={nft.tokenId} nft={nft} />;
						})
					) : (
						<div className="flex justify-center">
							<Loading size="xl" />
						</div>
					)}
				</div>
			</div>

			{pageKey && (
				<div
					className={`${styles.button_container} animate-bounce duration-300 ease-in-out`}
				>
					<a
						className={styles.button_black}
						onClick={() => {
							fetchNfts(pageKey);
						}}
					>
						Load more
					</a>
				</div>
			)}
		</div>
	);
}

function NftCard({ nft }) {
	return (
		<>
			<div className={styles.card_container}>
				<div className={styles.image_container}>
					{nft.format == '.mp4' ? (
						<video>
							<source></source>
						</video>
					) : (
						<img src={nft.media}></img>
					)}
				</div>
				<div className={styles.info_container}>
					<div className="flex justify-between ">
						<h3 className="text-2xl">
							{nft.title
								? nft.tile?.length > 20
									? `${nft.title.substring(0, 12)}...`
									: nft.title
								: `${nft.symbol} ${nft.tokenId.substring(0, 4)}`}
						</h3>
					</div>

					<div className={styles.symbol_contract_container}>
						<div className={styles.symbol_container}>
							<p className="!text-lg !font-medium !text-purple-700  ">
								{nft.collectionName && nft.collectionName.length > 20
									? `${nft.collectionName.substring(0, 20)}`
									: nft.collectionName}
							</p>

							{nft.verified == 'verified' ? (
								<img
									src={
										'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png'
									}
									width="20px"
									height="20px"
								/>
							) : null}
						</div>
					</div>

					<div className="!text-lg !font-bold ">
						<p>{'This NFT belongs to a GOD.'}</p>
					</div>
				</div>
			</div>
		</>
	);
}
