import React, { useState } from 'react';
import TenderCard from '@/components/TenderCard';
import { PlusSquare } from 'lucide-react';
import Popover from '@/components/Popover';
import TextBox from '@/components/TextBox';
import AuthInput from '@/components/Inputs/AuthInput';
import Dropdown from '@/components/Dropdown/Dropdown';
import DateInput from '@/components/Inputs/DateInput';

// "title": "string",
// "description": "string",
// "tenderNumber": "string",
// "estimatedCost": 0,
// "category": "string",
// "currency": "INR",
// "releaseDate": "2025-04-05T05:05:07.450Z",
// "submissionDeadline": "2025-04-05T05:05:07.450Z",
// "status": "Open",

function PopoverContent() {
  const categoryOptions = [
    'IT',
    'Construction',
    'Healthcare',
    'Education',
    'Other',
  ];
  const currencyOptions = ['INR', 'USD', 'EUR', 'GBP'];
  const statusOptions = ['Open', 'Closed', 'Under Review'];

  return (
    <div className='flex flex-col p-4 gap-1'>
      <span className='text-lg text-white text-semibold'>Create Tender</span>
      <span className='text-sm text-neutral-500'>
        Fill in the details below to create a new tender. Make sure to provide
      </span>
      <div className='grid grid-cols-6 gap-4 max-w-3xl mt-4'>
        <AuthInput
          label='Title'
          type='text'
          className='col-span-6 max-w-none'
        />
        <TextBox
          label='Description'
          rows={3}
          maxLength={500}
          className='col-span-6 max-w-none'
        />

        <AuthInput
          label='Tender Number'
          type='text'
          className='max-w-none col-span-3'
        />
        <AuthInput
          label='Estimated Cost'
          type='number'
          className='max-w-none col-span-3'
        />

        <Dropdown
          label='Category'
          options={categoryOptions}
          className='max-w-none col-span-2'
        />
        <Dropdown
          label='Currency'
          options={currencyOptions}
          className='max-w-none col-span-2'
        />
        <Dropdown
          label='Status'
          options={statusOptions}
          className='max-w-none col-span-2'
        />
        <DateInput label='Release Date' className='max-w-none col-span-3' />
        <DateInput
          label='Submission Deadline'
          className='max-w-none col-span-3'
        />
      </div>
      <div className='flex flex-col gap-0'>
        <button className='submit'>Create Tender</button>
        <button className='danger'>Cancel Creation</button>
      </div>
    </div>
  );
}

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
      <Popover close={() => setShowpopover(false)} visible={showPopover}>
        <PopoverContent />
      </Popover>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        <TenderCard />;
        <TenderCard />;
        <TenderCard />;
      </div>
    </div>
  );
}
