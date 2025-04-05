import React, { useEffect, useState } from 'react';
import TenderCard from '@/components/TenderCard';
import { PlusSquare } from 'lucide-react';
import Popover from '@/components/Popover';
import PopoverContent from './components/AddTender';
import customFetch from '@/utils/Fetch';

export default function Tenders() {
  const [showPopover, setShowpopover] = useState(false);
  const [tenders, setTenders] = useState([]);

  async function getTender() {
    const response = await customFetch('/tender/get', null);
    if (!response.data.success) {
      return;
    }
    setTenders(response.data.data);
  }

  useEffect(() => {
    getTender();
  }, []);

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
      <Popover close={() => setShowpopover(false)} visible={showPopover}>
        <PopoverContent />
      </Popover>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        {tenders.map((tender) => (
          <TenderCard {...tender} key={tender.id} />
        ))}
      </div>
    </div>
  );
}
