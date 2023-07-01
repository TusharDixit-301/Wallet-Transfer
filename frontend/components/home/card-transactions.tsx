import { Avatar, Card, Text } from '@nextui-org/react';
import React from 'react';
import { Flex } from '../styles/flex';

const users = [
	{ name: 'Jose Perez', amount: '4500 LP', date: '9/20/2021' },
	{ name: 'Andrew Steven', amount: '4500 LP', date: '9/20/2021' },
	{ name: 'Ruben Garcia', amount: '1500 PT', date: '2/20/2022' },
	{ name: 'Perla Garcia', amount: '200 LP', date: '3/20/2022' },
	{ name: 'Mathew Funez', amount: '2444 LP', date: '5/20/2022' },
	{ name: 'Carlos Diaz', amount: '3000 PT', date: '12/20/2022' },
	{ name: 'Mikasa Ackerman', amount: '2444 LP', date: '5/20/2022' },
	{ name: 'Armin Halt', amount: '2444 PT', date: '5/20/2022' },
	{ name: 'Eren Yeager', amount: '2444 LP', date: '5/20/2022' },
];

export const CardTransactions = () => {
	return (
		<Card
			css={{
				mw: '375px',
				height: 'auto',
				bg: '$accents0',
				borderRadius: '$xl',
				justifyContent: 'center',
				px: '$6',
				background: 'transparent',
			}}
		>
			<Card.Header>
				<span className="text-xl bg-gradient-to-r bg-clip-text text-transparent from-blue-500 via-purple-500 to-pink-500 animate-text pl-16">
					Latest Transactions
				</span>
			</Card.Header>
      <Card.Divider />
			<Card.Body css={{ py: '$10' }}>
				<Flex css={{ gap: '$6', py: '$4' }} direction={'column'}>
					{users.map((user, index) => (
						<Flex
							key={index}
							css={{ gap: '$6' }}
							align={'center'}
							justify="between"
						>
							<Avatar
								size="lg"
								pointer
								src={`https://i.pravatar.cc/150?u=${encodeURIComponent(
									user.name
								)}`}
								bordered
								color="gradient"
								stacked
							/>
							<Text span size={'$base'} weight={'semibold'}>
								{user.name}
							</Text>
							<Text span css={{ color: '$green600' }} size={'$xs'}>
								{user.amount}
							</Text>
							<Text span css={{ color: '$accents8' }} size={'$xs'}>
								{user.date}
							</Text>
						</Flex>
					))}
				</Flex>
			</Card.Body>
		</Card>
	);
};
