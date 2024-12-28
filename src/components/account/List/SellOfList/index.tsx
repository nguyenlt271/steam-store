/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import Pagination from '@/components/common/Pagination';
import { Button } from '@/components/ui/button';
import { useCategory } from '@/lib/context/CategoryContext';
import axios from 'axios';
import { uniqueId } from 'lodash';
import { LoaderCircle, RotateCw } from 'lucide-react';
import { useEffect } from 'react';
import Item from './Item';

const SellOfList = () => {
  const {
    accounts,
    queries,
    common,
    commonAccount,
    setAccounts,
    setCommonAccount,
    onChangeCommon,
  }: any = useCategory();

  const getData = async (queries: any) => {
    try {
      onChangeCommon({ loading: true });
      const res = await axios.get(`http://localhost:3000/api/accounts`, {
        params: queries,
      });
      setAccounts(res?.data?.items);
      setCommonAccount({
        totalItems: res?.data?.totalItems,
        page: res?.data?.page,
        perPage: res?.data?.perPage,
      });
    } catch (error) {
      console.log('Error', error);
    } finally {
      onChangeCommon({ loading: false });
    }
  };

  const onPageChange = (page: number) => {
    setCommonAccount((prev: any) => ({ ...prev, page }));
  };

  useEffect(() => {
    const params = {
      ...queries,
      page: commonAccount?.page,
    };
    if (queries.game) params.game = [queries.game];
    getData(params);
  }, [queries, commonAccount?.page]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 flex-col lg:flex-row justify-between lg:items-center'>
        <div className='flex items-center gap-2 w-fit'>
          <div className='w-8 h-8 bg-secondaryCustoms rounded-md flex items-center justify-center'>
            <img
              className='w-5 h-5 object-cover bg-secondaryCustoms'
              src={`steam.svg`}
              alt={'logo'}
            />
          </div>
          <h3 className='text-lg font-normal text-secondaryCustoms'>
            Sale of accounts Steam
          </h3>
        </div>
        <div className='flex items-center gap-2 w-full lg:w-fit justify-end'>
          <Button size={'sm'} variant='destructive' className='w-8 h-8'>
            <RotateCw size={20} />
          </Button>
          <div>
            <Pagination
              currentPage={commonAccount?.page}
              totalPages={Math.round(
                commonAccount.totalItems / commonAccount.perPage
              )}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
      {common?.loading && (
        <div className='flex items-center justify-center w-full gap-2'>
          <span>
            <LoaderCircle className='animate-spin' />
          </span>
          Loading
        </div>
      )}
      <div className='flex flex-col gap-4'>
        {accounts.map((account: any) => (
          <Item key={account?.account_id || uniqueId()} account={account} />
        ))}
      </div>
    </div>
  );
};

export default SellOfList;
