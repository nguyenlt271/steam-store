import Image from 'next/image';
import Link from 'next/link';

function ProfileSeller() {
  return (
    <div className='flex flex-col gap-2 mb-2 p-2 bg-secondaryCustoms rounded-md'>
      <div className='relative w-full h-72 lg:h-60 rounded overflow-hidden'>
        <Image
          alt='account-avatar'
          fill
          src='https://nztcdn.com/avatar/l/1694893401/966023.webp'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Link
          href='/account/1'
          className='flex items-center gap-2 text-sm font-medium text-secondaryCustoms'
        >
          Uglycreepen
          <span className='w-2 h-2 bg-[#00b977] rounded-full' />
        </Link>
        <div className='flex flex-col gap-1'>
          <p>
            Sold 5144 accounts <span className='text-[#00b977]'>0%</span>
          </p>
          <p className='text-xs'>
            Joined on <span className='font-medium'>23.03.2019</span>
          </p>
          <p className='font-medium text-secondaryCustoms'>
            1119 selling accounts
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSeller;
