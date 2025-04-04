import React, { useState } from 'react';
import TenderCard from '@/components/TenderCard';
import { PlusSquare } from 'lucide-react';
import Popover from '@/components/Popover';

export default function Tenders() {
  const [showPopover, setShowpopover] = useState(false);
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl text-white'>All Tenders</span>
          <span className='text-sm text-neutral-500'>
            Here you can find all the tenders available for bidding.
          </span>
        </div>
        <PlusSquare
          strokeWidth={1.5}
          size={32}
          onClick={() => setShowpopover(true)}
          className='text-white cursor-pointer hover:text-violet-500 transition-all duration-200 ease-in-out'
        />
      </div>
      {showPopover && <Popover close={() => setShowpopover(false)} />}
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        <TenderCard />;
        <TenderCard />;
        <TenderCard />;
      </div>
    </div>
  );
}
