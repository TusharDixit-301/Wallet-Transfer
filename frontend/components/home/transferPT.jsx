import { Card, Input, Row, Text, Loading } from '@nextui-org/react';
import { writeContract, waitForTransaction } from '@wagmi/core';
import React from 'react';
import LPTokenContract from '../../contracts/LPTokenContract.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TransferPT = () => {
	const [userAddress, setUserAddress] = React.useState('');
	const [amount, setAmount] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const handleSubmission = async () => {
		// const hash = await writeContract({
		// 	address: LPTokenContract.addressPT,
		// 	abi: LPTokenContract.abi,
		// 	functionName: 'mint',
		// 	args: [userAddress.toString(), parseInt(amount)],
		// });
		try {
			setLoading(true);
			const hash = await writeContract({
				address: LPTokenContract.addressPT,
				abi: LPTokenContract.abi,
				functionName: 'mint',
				args: [userAddress.toString(), parseInt(amount)],
			});
			waitForTransaction(hash).then(() => {
				setLoading(false);
				toast.success('Transfer Successful! 💸', {
					position: 'top-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			});
		} catch (err) {
			setLoading(false);
			toast.error(`${err.reason}`, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		}
	};
	return (
		<>
			<Card
				css={{
					background: 'transparent',
					mh: 'fit-content',
					marginBottom: '$10',
				}}
			>
				<Card.Header>
					<span className="text-xl bg-gradient-to-r bg-clip-text  text-transparent from-blue-500 via-purple-500 to-pink-500 animate-text">
						Transfer Platform Coins
					</span>
				</Card.Header>
				<Card.Divider />
				<Card.Body css={{ py: '$10', px: '$10' }}>
					<Input
						label="User Address"
						clearable
						bordered
						borderWeight="light"
						css={{ border: '$accents5', mb: '$10' }}
						placeholder="0x000..00"
						onChange={(e) => {
							setUserAddress(e.target.value);
						}}
					/>
					<Input
						label="Amount"
						clearable
						bordered
						borderWeight="light"
						css={{ border: '$accents1' }}
						onChange={(e) => {
							setAmount(e.target.value);
						}}
					/>
				</Card.Body>
				<Card.Divider />
				<Card.Footer>
					<Row justify="flex-end">
						<button
							onClick={handleSubmission}
							className="rounded-lg px-4 py-1 border  disabled:cursor-not-allowed disabled:opacity-50 bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600 "
							disabled={userAddress === '' || amount === ''}
						>
							{loading ? (
								<Loading size="md" color={'white'} type="points" />
							) : (
								'Submit'
							)}
						</button>
					</Row>
				</Card.Footer>
			</Card>
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
		</>
	);
};

export default TransferPT;
