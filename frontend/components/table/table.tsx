import { Table } from '@nextui-org/react';
import React from 'react';

import { columns, users } from './data';
import { RenderCell } from './render-cell';

export const TableWrapper = () => {
	return (
		<Table
			aria-label="Example table with custom cells"
			css={{
				height: 'auto',
				minWidth: '100%',
				width: '100%',
				px: '$11',
				py: '$10',
			}}
			selectionMode="multiple"
		>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column
						key={column.uid}
						hideHeader={column.uid === 'actions'}
						align={column.uid === 'actions' ? 'center' : 'start'}
					>
						{column.name}
					</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={users}>
				{(item) => (
					<Table.Row>
						{(columnKey) => (
							<Table.Cell>
								{RenderCell({ user: item, columnKey: columnKey })}
							</Table.Cell>
						)}
					</Table.Row>
				)}
			</Table.Body>
			<Table.Pagination
				shadow
				noMargin
				align="center"
				rowsPerPage={5}
				onPageChange={(page) => console.log({ page })}
			/>
		</Table>
	);
};
