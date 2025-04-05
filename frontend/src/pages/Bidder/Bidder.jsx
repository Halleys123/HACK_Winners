import Popover from '@/components/Popover';
import TenderCard from '@/components/TenderCard';
import { PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import BidCard from './components/BidCard';

export default function Bidder() {
  const [showPopover, setShowpopover] = useState(false);
  // async function getTender() {
  //   const response = await customFetch('/tender/get', null);
  //   if (!response.data.success) {
  //     return;
  //   }
  //   setTenders(response.data.data);
  // }
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
      </div>
      <Popover
        close={() => setShowpopover(false)}
        visible={showPopover}
      ></Popover>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        <BidCard />
      </div>
    </div>
  );
}
