import React from 'react';
import TenderCard from '@/components/TenderCard';

export default function Tenders() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <span className='text-2xl text-white'>All Tenders</span>
        <span className='text-sm text-neutral-500'>
          Here you can find all the tenders available for bidding.
        </span>
      </div>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        <TenderCard />;
        <TenderCard />;
        <TenderCard />;
      </div>
    </div>
  );
}
