import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import Content from '../components/home/content';
export default function Home() {
	const { isDisconnected } = useAccount();
	const router = new useRouter();
	if (isDisconnected) {
		router.replace('/');
	}
	return <Content />;
}
