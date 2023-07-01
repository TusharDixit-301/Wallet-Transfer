// Importing necessary modules and components
import { Loading } from '@nextui-org/react';
import { readContract, waitForTransaction, writeContract } from '@wagmi/core';
import { useEffect, useState } from 'react';
import { BiSolidCoinStack } from 'react-icons/bi';
import NFTContract from '../contracts/nft-gallery.json';
import styles from '../styles/NftGallery.module.css';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// Defining the main component of the NFT gallery

export default function NFTGallery({
	walletAddress,
	collectionAddress,
	chain,
	pageSize,
}) {
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
	const [price, setPrice] = useState(null);
	const [visible, setVisible] = useState(false); // Default should be false
	const [isBuying, setIsBuying] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getNFTPrice(nft.tokenId);
			setPrice(data.toString());

			const owner = await getOwner(nft.tokenId); // Fetch the owner
			setVisible(owner === '0x6F959C729dDa57B8c1Ad15E7693C8Fd2813BAaF1'); // Set the visibility
		};
		fetchData();
	}, [nft.tokenId]);

	const getNFTPrice = async (id) => {
		const data = await readContract({
			address: NFTContract.address,
			abi: NFTContract.abi,
			functionName: 'getPriceById',
			args: [id],
		});
		console.log('Data : ', data);
		return data;
	};

	const getOwner = async (id) => {
		const data = await readContract({
			address: NFTContract.address,
			abi: NFTContract.abi,
			functionName: 'ownerOf',
			args: [id],
		});
		console.log('Owner : ', data);
		return data;
	};
	if (!visible) {
		return null;
	}
	const handleRedeem = async (id) => {
		try {
			setIsBuying(true);
			const { hash } = await writeContract({
				address: NFTContract.address,
				abi: NFTContract.abi,
				functionName: 'redeem',
				args: [id, '0xc55dc7125A964B2DDa161F99771ED624e2107857'],
			});
			waitForTransaction({
				hash,
			}).then(() => {
				toast('🔥 Redeemed Successfully', {
					position: 'top-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
				setIsBuying(false);
			});
		} catch (e) {
			alert(e.reason);
			setIsBuying(false);
		}
	};
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
						{/* NFT PRICE */}
						<h3 className="text-lg font-medium pt-[0.5px] text-amber-500 flex ">
							<h3 className="text-purple-900 mr-1">LP</h3>
							{price ? price : 'Loading...'}
							<BiSolidCoinStack className="text-lg mt-1 cursor-pointer text-slate-500   ml-1" />
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
					<div className="flex justify-center mt-2">
						<button
							disabled={isBuying}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded-2xl w-24"
							onClick={() => {
								handleRedeem(nft.tokenId);
							}}
						>
							{isBuying ? <Loading size="sm" type="points" /> : 'Redeem'}
						</button>
					</div>
				</div>
				<ToastContainer
					position="top-center"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
			</div>
		</>
	);
}
