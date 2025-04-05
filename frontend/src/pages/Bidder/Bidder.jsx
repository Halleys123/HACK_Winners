import Popover from '@/components/Popover';
import TenderCard from '@/components/TenderCard';
import { PlusSquare } from 'lucide-react';
import React, { useState } from 'react';

export default function Bidder() {
  const [showPopover, setShowpopover] = useState(false);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl text-white'>Previous Contracts</span>
          <span className='text-sm text-neutral-500'>
            View a list of all previous tenders assigned to you. You can also
            view the details of each tender by clicking on it.
          </span>
        </div>
        {/* <PlusSquare
          strokeWidth={1.5}
          size={32}
          onClick={() => setShowpopover(true)}
          className='text-white cursor-pointer hover:text-violet-500 transition-all duration-200 ease-in-out'
        /> */}
      </div>
      <Popover
        close={() => setShowpopover(false)}
        visible={showPopover}
      ></Popover>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        <TenderCard />;
        <TenderCard />;
        <TenderCard />;
      </div>
    </div>
  );
}
