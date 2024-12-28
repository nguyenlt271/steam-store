import React from 'react';
import Tooltip from '@/components/common/Tooltip';
import { Eye, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const Item = () => {
  return (
    <div className='flex items-center p-2 rounded-md bg-primaryCustoms'>
      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex flex-wrap items-center gap-2 text-md '>
          <Link
            className='text-secondaryCustoms font-medium w-full lg:w-fit line-clamp-1 lg:line-clamp-none hover:underline'
            href={'/account'}
          >
            Elden ring|skyrim|steam inventory
          </Link>
          <div className='hidden lg:block w-1 h-1 rounded-full bg-primary' />
          <p className='text-secondaryCustoms font-medium hover:underline'>
            700 ₽
          </p>
          <Tooltip content='This item is sold'>
            <ShoppingBag size={20} />
          </Tooltip>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-xs'>Dec 18, 2024</span>
          <div className='w-1 h-1 rounded-full bg-primary' />
          <Link
            className='text-secondaryCustoms font-medium hover:underline'
            href={'/account'}
          >
            SoleBoy
          </Link>
          <div className='w-1 h-1 rounded-full bg-primary' />
          <div className='flex item gap-1'>
            bought
            <Link
              className='text-secondaryCustoms font-medium hover:underline'
              href={'/account'}
            >
              SoleBoy
            </Link>
            Dec 19, 2024
          </div>
        </div>
      </div>
      <div className='w-10'>
        <Eye size={20} />
      </div>
    </div>
  );
};

export default Item;
