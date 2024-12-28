import * as _ from 'lodash';
import Button from '@/components/common/Button';
import { ClipboardCheck, MailCheck, ShieldCheck } from 'lucide-react';
import React from 'react';

const ProfileAccount = () => {
  const info = React.useMemo(
    () => [
      {
        icon: <ClipboardCheck size={20} />,
        label: (
          <>
            Account data -{' '}
            <span className='font-semibold text-greenCustoms'>immediately</span>{' '}
            after purchase.
          </>
        ),
      },
      {
        icon: <MailCheck size={20} />,
        label: (
          <>
            <span className='font-semibold text-greenCustoms'>
              There is access{' '}
            </span>
            to temporary email from the account
          </>
        ),
      },
      {
        icon: <MailCheck size={20} />,
        label: (
          <>
            <span className='font-semibold text-redCustoms'>None</span> access
            to native email from account
          </>
        ),
      },
      {
        icon: <ShieldCheck size={20} />,
        label: (
          <>
            <span className='font-semibold text-greenCustoms'>24 hours</span>{' '}
            warranty
          </>
        ),
      },
    ],
    []
  );
  return (
    <div className='flex flex-col gap-4 p-2 py-4 rounded-md bg-secondaryCustoms'>
      <div className='flex flex-col lg:flex-row gap-4 justify-between'>
        <div className='order-2 lg:order-1 flex flex-col gap-1 w-4/5'>
          <h3 className='text-lg font-medium text-secondaryCustoms'>
            [Mail + ELDEN RING + Mount & Blade II: Bannerlord + DARK SOULS:
            REMASTERED + Valheim + games]
          </h3>
          <div className='flex items-center gap-2'>
            Dec 20, 2024 (updated in 10 minutes ago)
            <div className='w-1 h-1 rounded-full bg-primary' />
            22 views
          </div>
        </div>
        <div className='order-1 lg:order-2 flex-1 shrink-0'>
          <p className='text-lg font-medium text-secondaryCustoms'>1599 ₽</p>
          <p className='text-sm text-secondaryCustoms'>≈ $15.18 or €14.51</p>
        </div>
      </div>
      <div>
        <Button>Buy</Button>
      </div>
      <div className='h-[0.8] w-full bg-primaryCustoms' />
      <div className='flex flex-col gap-3'>
        {info.map((item) => (
          <div key={_.uniqueId()} className='flex gap-3 items-center'>
            <span>{item.icon}</span>
            <p className='text-sm text-secondaryCustoms'>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAccount;
