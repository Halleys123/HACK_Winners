import React, { useRef, useState } from 'react';
import TextBox from '@/components/TextBox';
import AuthInput from '@/components/Inputs/AuthInput';
import Dropdown from '@/components/Dropdown/Dropdown';
import DateInput from '@/components/Inputs/DateInput';
import customFetch from '@/utils/Fetch';
import Loading from '@/components/Loading';

const categoryOptions = [
  'Infrastructure',
  'IT Services',
  'Consultancy',
  'Manufacturing',
];
const currencyOptions = ['INR', 'USD', 'EUR', 'GBP'];
const statusOptions = ['Open', 'Closed', 'Under Review'];
export default function PopoverContent({ handleClose = () => {} }) {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('null');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setLoading(true);
    const response = await customFetch('/tender', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setLoading(false);
    console.log(response.data.success);
    if (!response.data.success) {
      setSuccess('failed');
    } else {
      setSuccess('success');
    }
    setTimeout(() => {
      setSuccess('null');
      handleClose();
    }, 2000);
  }

  return (
    <form onSubmit={handleSubmit} ref={ref} className='flex flex-col p-4 gap-1'>
      <Loading visible={loading} text='Creating Tender...' />
      <Loading
        visible={success != 'null'}
        text={
          success == 'success'
            ? 'Tender Created Successfully'
            : 'Failed to Create Tender'
        }
      />
      <span className='text-lg text-white text-semibold'>Create Tender</span>
      <span className='text-sm text-neutral-500'>
        Fill in the details below to create a new tender. Make sure to provide
      </span>
      <div className='grid grid-cols-6 gap-4 max-w-3xl mt-4'>
        <AuthInput
          label='Title'
          type='text'
          className='col-span-6 max-w-none'
          name='title'
        />
        <TextBox
          label='Description'
          name='description'
          rows={3}
          maxLength={500}
          className='col-span-6 max-w-none'
        />

        <AuthInput
          label='Tender Number'
          name='tenderNumber'
          type='text'
          className='max-w-none col-span-3'
        />
        <AuthInput
          label='Estimated Cost'
          name='estimatedCost'
          type='number'
          className='max-w-none col-span-3'
        />

        <Dropdown
          label='Category'
          name='category'
          options={categoryOptions}
          className='max-w-none col-span-2'
        />
        <Dropdown
          label='Currency'
          name='currency'
          options={currencyOptions}
          className='max-w-none col-span-2'
        />
        <Dropdown
          disabled={true}
          label='Status'
          options={statusOptions}
          className='max-w-none col-span-2'
        />
        <DateInput
          name='releaseDate'
          label='Release Date'
          className='max-w-none col-span-3'
        />
        <DateInput
          name='submissionDeadline'
          label='Submission Deadline'
          className='max-w-none col-span-3'
        />
      </div>
      <div className='flex flex-col gap-0'>
        <button type='submit' className='submit'>
          Create Tender
        </button>
        <button className='danger'>Cancel Creation</button>
      </div>
    </form>
  );
}
