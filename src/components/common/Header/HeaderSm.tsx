import React from 'react';
import Button from '../Button';
import MobileMenu from '../Navigator/MobileMenu';

function HeaderSm() {
  return <div className='flex lg:hidden items-center justify-between p-2 bg-secondaryCustoms text-primaryCustoms'>
    <div>
      <MobileMenu />
    </div>
    <div className='flex gap-2'>
      <Button>
        Login
      </Button>
      <Button variant={'secondary'}>
        Sign up
      </Button>
    </div>
  </div>;
}

export default HeaderSm;
