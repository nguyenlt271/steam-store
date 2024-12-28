'use client';
import SellOfList from '@/components/account/List/SellOfList';
import NotLoggedNotification from '@/components/auth/notification/NotLoggedNotification';
import CategoryFilter from '@/components/category/Filter';
import Header from '@/components/common/Header';
import Banner from '@/components/media/Banner';
import { CategoryProvider } from '@/lib/context/CategoryContext';
import { IGame, IParams } from '@/variables/interface';
import React from 'react';

interface IProps {
  games: IGame[];
  params: IParams;
}
function HomeModule({ games, params }: IProps) {
  return (
    <CategoryProvider initParams={params} initGames={games}>
      <div className='fixed inset-0 w-screen min-h-screen text-[13px] bg-primaryCustoms text-primaryCustoms overflow-y-auto'>
        <Header />
        <div className='max-w-full lg:max-w-[800px] mx-auto p-4'>
          <div className='my-2 flex flex-col lg:flex-row gap-2'>
            <div className='order-1 flex flex-col gap-7 overflow-hidden'>
              <div className='flex flex-col gap-2'>
                <NotLoggedNotification />
                <Banner />
              </div>
              <CategoryFilter />
              <SellOfList />
            </div>
          </div>
        </div>
      </div>
    </CategoryProvider>
  );
}

export default HomeModule;
