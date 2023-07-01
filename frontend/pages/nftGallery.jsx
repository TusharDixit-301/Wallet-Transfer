import React from 'react';
import NFTGallery from '../components/NFTGallery';
import styles from '../styles/Navbar.module.css';
import HeartImg from "../public/Heart.gif"
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
const NftGallery = () => {
	const router = new useRouter();
	const { address, isDisconnected } = useAccount();
	if(isDisconnected){
		setTimeout(() => {
			router.push('/');
		}, 10);
	}
	return (
		<div>
			<div className="flex justify-center ">
				<h1 className={`text-5xl pb-4 animate-text mt-4 pt-6 ${styles.heads} `}>
					{' '}
					Get Your NFTs using Loyalty points
				</h1>
				{/* <h1 className="pl-2 text-5xl">❤️‍🔥</h1> */}
				{/* <Image src={HeartImg} alt="heart"  /> */}
				<Image src={HeartImg} alt="heart"  width={100} className='pl-2 mt-2 mb-2 pb-3 ' />
			</div>

			<NFTGallery
				collectionAddress={'0xf4b0e08127eC5d82Cae0c81DF37B284ED8f2Efd0'}
				chain={"MATIC_MUMBAI"}
			/>
		</div>
	);
};

export default NftGallery;
