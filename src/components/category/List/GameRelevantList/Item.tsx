import { Clock4 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Item() {
  return (
    <div className='flex flex-col gap-2  w-full h-fit-content'>
      <div className='relative w-full h-20 rounded-md overflow-hidden object-cover'>
        <Image
          className='object-cover'
          alt='Game'
          fill
          src='https://steamcdn-a.akamaihd.net/steam/apps/1245620/header.jpg?1'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Link className='text-md text-secondaryCustoms leading-none' href='/'>
          Mount & Blade II: Bannerlord
        </Link>
        <p className='flex items-center gap-2'>
          <span>
            <Clock4 size={16} />
          </span>
          183 hrs.
        </p>
      </div>
    </div>
  );
}

export default Item;
