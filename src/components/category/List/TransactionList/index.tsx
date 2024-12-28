import { IColumn, Table } from '@/components/common/Table';
import React from 'react';

function TransactionList() {
  const purchases = [
    {
      gameTitle: 'Chained Together',
      price: 4.99,
      date: '2024-08-29',
      paymentMethod: 'Visa **61',
      type: 'purchase',
    },
    {
      gameTitle: 'Raft',
      price: 19.99,
      date: '2023-04-07',
      paymentMethod: 'Visa **98',
      type: 'purchase',
    },
    {
      gameTitle: 'Potion Tycoon',
      price: 17.99,
      date: '2023-03-20',
      paymentMethod: 'Visa **98',
      type: 'purchase',
    },
    {
      gameTitle: 'Left 4 Dead 2',
      price: 9.75,
      date: '2023-01-28',
      paymentMethod: 'Visa **98',
      type: 'purchase',
    },
    {
      gameTitle: 'Hidden until account purchase',
      price: 9.99,
      date: '2021-11-16',
      paymentMethod: 'Carte Bleue **42',
      type: 'purchase',
    },
  ];

  const columns: IColumn[] = [
    {
      label: 'Name',
      id: 'name',
      getFn: (row) => row?.gameTitle,
      className: 'w-42 text-greenCustoms',
    },
    {
      label: 'Total',
      id: 'price',
      getFn: (row) => row?.price?.toFixed(2),
      className: 'w-32 text-greenCustoms',
    },
    {
      label: 'Purchase date',
      id: 'date',
      getFn: (row) => new Date(row?.date).toLocaleDateString(),
      className: 'w-32 text-greenCustoms',
    },
    {
      label: 'Type',
      id: 'type',
      getFn: (row) => row?.type,
      className: 'w-32 text-greenCustoms',
    },
    {
      label: 'Source',
      id: 'source',
      getFn: (row) => row?.paymentMethod,
      className: 'w-32 text-greenCustoms',
    },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='flex items-center gap-2 py-0 text-secondaryCustoms font-semibold text-md'>
        Transaction list
      </h4>
      <div className='p-2 rounded-md bg-primaryCustoms'>
        <Table data={purchases} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionList;
