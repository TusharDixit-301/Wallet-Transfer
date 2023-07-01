import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
export default function Home() {
	// !FIXME : This is a temporary fix to allow the admin to access the admin panel.
	const admin = '0x6F959C729dDa57B8c1Ad15E7693C8Fd2813BAaF1';
	const { address, isDisconnected } = useAccount();
	const router = new useRouter();
	if (address == admin) {
		setTimeout(() => {
			router.push('/adminPanel');
		}, 10);
	} else if (address && !isDisconnected){
		setTimeout(() => {
			router.push('/user');
		}, 10);
	}

	return (
		<div>
			<main className={styles.main}>
				<div className="flex flex-col justify-center items-center text-center mt-auto animate-gradient mb-auto h-[50vh]">
					<span className="text-7xl bg-gradient-to-r bg-clip-text  text-transparent from-blue-500 via-purple-500 to-pink-500 animate-text z-40 mb-2 pb-2">
						Please Connect
					</span>
					<span className="text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-text text-transparent bg-clip-text z-40 mb-2 pb-2">
						your wallet 
					</span>
				</div>
			</main>
		</div>
	);
}
