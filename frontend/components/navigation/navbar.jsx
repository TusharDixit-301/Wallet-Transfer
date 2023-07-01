import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import walletImage from '../../public/wallet.png';
import styles from '../../styles/Navbar.module.css';
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<div className="flex items-end">
				<Image
					src={walletImage}
					alt="wallet"
					width={50}
					height={50}
					className="mb-2"
				/>

				<h2 className="text-3xl ml-2 bg-gradient-to-br text-transparent bg-clip-text from-blue-300 via-purple-500 to-blue-700 animate-text">
					Wallet Transfer
				</h2>
			</div>

			<ConnectButton></ConnectButton>
		</nav>
	);
}
