import Button from '@/components/common/Button'
import { Shield } from 'lucide-react'
import React from 'react'

function InsuranceInfo() {
  return (
    <div className='flex flex-col gap-2 mb-2 p-2 bg-secondaryCustoms rounded-md'>
      <div>
        <p className='font-semibold'>Insurance deposit</p>
        <p className='font-semibold text-secondaryCustoms'>Uglycreepen</p>
      </div>
      <p className='text-lg font-bold text-[#e94d4b]'>
        0 ₽
      </p>
      <Button>
        <span>
          <Shield size={32} />
        </span>
        Find a guarantor
      </Button>
    </div>
  )
}

export default InsuranceInfo