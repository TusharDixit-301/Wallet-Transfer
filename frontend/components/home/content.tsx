import React from 'react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { CardBalance1 } from './card-balance1';
import { CardBalance2 } from './card-balance2';
import { CardBalance3 } from './card-balance3';
import { CardMint } from './card-mint';
import { CardTransactions } from './card-transactions';
// import NftMinter from './nftMinter';
import dynamic from 'next/dynamic';
import AssignRank from './assignRank';
import TransferLP from './transferLP';
import TransferPT from './transferPT';
import { Spacer } from '@nextui-org/react';

const Content = () => (
	<Box css={{ overflow: 'hidden', height: '100%' }}>
		<Flex
			css={{
				gap: '$8',
				pt: '$5',
				height: 'fit-content',
				flexWrap: 'wrap',
				'@lg': {
					flexWrap: 'nowrap',
				},
				'@sm': {
					pt: '$10',
				},
			}}
			justify={'center'}
		>
			<Flex
				css={{
					px: '$12',
					mt: '$8',
					'@xsMax': { px: '$10' },
					gap: '$12',
				}}
				direction={'column'}
			>
				{/* Card Section Top */}
				<Box>
					<h1 className="text-3xl text-white mb-2 pb-3">Dashboard</h1>
					<Flex
						css={{
							gap: '$10',
							flexWrap: 'wrap',
							justifyContent: 'center',
							'@sm': {
								flexWrap: 'nowrap',
							},
						}}
						direction={'row'}
					>
						<CardBalance1 />

						<CardBalance2 />

						<CardBalance3 />
					</Flex>
				</Box>

				{/* Tranfer Section*/}
				<Box>
					<h1 className="text-3xl text-white mb-2 pb-3">Transfer Tokens 💰</h1>
					<Box
						css={{
							width: '100%',

							boxShadow: '$lg',
							borderRadius: '$2xl',
						}}
					>
						{/* <TableWrapper /> */}

						<AssignRank />
						<TransferLP />
						<TransferPT />
					</Box>
				</Box>
			</Flex>

			{/* Left Section */}
			<Box
				css={{
					px: '$12',
					mt: '$8',
					height: 'fit-content',
					'@xsMax': { px: '$10' },
					gap: '$6',
					overflow: 'hidden',
					backgroundColor: 'transparent',
				}}
			>
				<h1 className="text-3xl text-white mb-2 pb-3">Section</h1>
				<Flex
					direction={'column'}
					justify={'center'}
					css={{
						gap: '$8',
						flexDirection: 'row',
						flexWrap: 'wrap',
						'@sm': {
							flexWrap: 'nowrap',
						},
						'@lg': {
							flexWrap: 'nowrap',
							flexDirection: 'column',
						},
					}}
				>
					<CardMint />
					<Spacer y={1} />
					<CardTransactions />
				</Flex>
			</Box>
		</Flex>

		{/* Table Latest Users */}
		<Flex
			direction={'column'}
			justify={'center'}
			css={{
				width: '100%',
				py: '$10',
				px: '$10',
				mt: '$8',
				'@sm': { px: '$20' },
			}}
		>
			{/* <Flex justify={'between'} wrap={'wrap'}>
				<Text
					h3
					css={{
						textAlign: 'center',
						'@lg': {
							textAlign: 'inherit',
						},
					}}
				>
					Latest Users
				</Text>
				<NextLink href="/accounts">
					<Link
						block
						color="primary"
						css={{
							textAlign: 'center',
							'@lg': {
								textAlign: 'inherit',
							},
						}}
					>
						View All
					</Link>
				</NextLink>
			</Flex>
			<TableWrapper /> */}
		</Flex>
	</Box>
);
export default dynamic(() => Promise.resolve(Content), { ssr: false });
