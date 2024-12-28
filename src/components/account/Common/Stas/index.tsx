import React from 'react';
import Group from './Group';

function AccountStatistical() {
  return (
    <div className='flex flex-col gap-4'>
      <Group
        title={`Inventory value — ${260} ₽`}
        data={[
          {
            value: `${260} ₽`,
            label: 'Total value',
          },
        ]}
      />
      <Group
        title={`Reliable information (parsed automatically)`}
        data={[
          {
            value: `${0} ₽`,
            label: 'Balance',
          },
          {
            value: `${13_919}`,
            label: 'Points',
          },
          {
            value: 'Oct 29, 2024',
            label: 'Last activity',
          },
          {
            value: '0.00 hrs',
            label: 'Total played for 2 weeks',
          },
          {
            value: 'Sep 12, 2011',
            label: 'Register date',
          },
          {
            value: '8',
            label: 'Account level',
          },
          {
            value: '8',
            label: 'Friends',
          },
          {
            value: '46',
            label: 'Relevant games',
          },
          {
            value: '64',
            label: 'Total games',
          },
          {
            value: 'Yes',
            label: 'Has activated keys',
          },
          {
            value: 'France',
            label: 'Country',
          },
        ]}
      />
      <Group
        title={`Transaction stats`}
        data={[
          {
            value: `${1_073} ₽`,
            label: 'Total gifts',
          },
          {
            value: `${19_821} ₽`,
            label: 'Total amount of games',
          },
          {
            value: `${20_894} ₽`,
            label: 'Total purchased',
          },
        ]}
      />
    </div>
  );
}

export default AccountStatistical;
