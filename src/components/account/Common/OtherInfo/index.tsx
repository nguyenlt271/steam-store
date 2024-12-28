import React from 'react';

function OtherInfo() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2 py-0 text-secondaryCustoms font-semibold text-[14px]'>
        <h4 className='flex items-center gap-2 py-0 text-secondaryCustoms font-semibold text-[14px]'>
          Bans and limits
        </h4>
        <div className='p-2 px-4 flex flex-col gap-2 rounded-md bg-primaryCustoms'>
          <p className='text-md font-semibold text-secondaryCustoms'>
            Community market is temporarily unavailable (Trade Limit)
          </p>
          <p className='text-xs text-primaryCustoms'>
            This limitation appears if the phone or Steam Guard was recently
            uninstalled. Another possible reason is the absence of purchases on
            the account for a long time. This restriction will expire in Dec 23,
            2024 at 8:45 PM
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtherInfo;
