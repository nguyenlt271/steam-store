'use client';

import OtherInfo from '@/components/account/Common/OtherInfo';
import AccountStatistical from '@/components/account/Common/Stas';
import HistoryList from '@/components/account/List/HistoryList';
import ProfileAccount from '@/components/account/Profile';
import NotLoggedNotification from '@/components/auth/notification/NotLoggedNotification';
import GameRelevantList from '@/components/category/List/GameRelevantList';
import TransactionList from '@/components/category/List/TransactionList';
import Header from '@/components/common/Header';
import InsuranceInfo from '@/components/seller/Common/Insurance';
import ProfileSeller from '@/components/seller/Profile';
import Breadcrumbs from '@/components/share/Breadcrumbs';

function AccountModule() {
  return (
    <div className='fixed inset-0 w-screen min-h-screen text-[13px] bg-primaryCustoms text-primaryCustoms overflow-y-auto'>
      <Header />
      <div className='max-w-full lg:max-w-[1076px] mx-auto p-4'>
        <Breadcrumbs
          breadcrumbs={[
            { title: 'Market', href: '/' },
            { title: 'Stream Accounts' },
          ]}
        />
        <div className='my-2 flex flex-col lg:flex-row gap-2'>
          <div className='order-2 lg:order-1 shrink-0 w-full lg:w-[240px]'>
            <ProfileSeller />
            <InsuranceInfo />
          </div>
          <div className='order-1 flex flex-col gap-2 w-full overflow-hidden'>
            <NotLoggedNotification />
            <ProfileAccount />
            <HistoryList />
            <div className='flex flex-col gap-6 p-4 rounded-md bg-secondaryCustoms'>
              <GameRelevantList />
              <div className='h-1 w-full bg-primaryCustoms' />
              <OtherInfo />
              <AccountStatistical />
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountModule;
