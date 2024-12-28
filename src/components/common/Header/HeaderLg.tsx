'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { IoChatbubbleSharp } from 'react-icons/io5';

function HeaderLg() {
  return (
    <div className='hidden lg:block'>
      <div className='flex align-center justify-between px-[16vw] py-1 margin-x-auto mx-auto'>
        <div />
        <div className='flex align-center gap-2'>
          <span className='transform translate-y-0.5'>
            <IoChatbubbleSharp />
          </span>
          <div className='text-[13px] font-light'>24/7 support</div>
        </div>
        <div></div>
      </div>
      <div className='flex items-center  justify-center bg-secondaryCustoms'>
        <div className='flex justify-between items-center h-11 w-full p-4 max-w-full lg:max-w-[800px]'>
          <div className='flex items-center gap-2'>
            <Link href='/'>
              <Image src='logo.svg' alt='logo' width={120} height={120} />
            </Link>
          </div>
          <div className='flex items-center gap-2'>
            <Input size={28} placeholder='Search...' />
            <Button size={'sm'}>Login</Button>
            <Button size={'sm'} variant='link'>
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLg;
