import { Button, Card, Modal, Text } from '@nextui-org/react';
import React from 'react';
import NftCreator from './nftCreator';

export const CardMint = () => {
	const [visible, setVisible] = React.useState(false);
	const handler = () => setVisible(true);
	const closeHandler = () => {
		setVisible(false);
		console.log('closed');
	};
	return (
		<Card
			css={{
				borderRadius: '$xl',
				alignContent: 'center',
				justifyContent: 'center',
				px: '$6',
				background: 'transparent',
			}}
		>
		<Card.Header>
				<span className="text-xl bg-gradient-to-r bg-clip-text text-transparent from-blue-500 via-purple-500 to-pink-500 animate-text pl-28 ">
					Mint NFTs
				</span>
			</Card.Header>
      <Card.Divider />
			<Card.Body css={{ py: '$10', gap: '$4' }}>
			
			<p className="text-lg font-semibold text-green-500 mb-2 pb-3 text-center">Coming soon ⌛</p>
				<Button auto disabled bordered shadow onPress={handler}>
					Mint
				</Button>
				{/* Modal Window */}
				<Modal
					closeButton
					blur
					aria-labelledby="modal-title"
					open={visible}
					onClose={closeHandler}
				>
					<Modal.Header>
						<Text id="modal-title" size={18}>
							Welcome to
							<Text b size={18}>
								NextUI
							</Text>
						</Text>
					</Modal.Header>
					<Modal.Body>
						<NftCreator />
					</Modal.Body>
					<Modal.Footer>
						<Button auto flat color="error" onPress={closeHandler}>
							Close
						</Button>
						<Button auto onPress={closeHandler} >
							Sign in
						</Button>
					</Modal.Footer>
				</Modal>
			</Card.Body>
		</Card>
	);
};
