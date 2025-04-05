import React, { useRef } from 'react';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '@/components/Inputs/AuthInput';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function Signup() {
  const ref = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return (
    <AuthLayout>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 max-w-md'
      >
        <span className='font-redhat text-neutral-300 text-3xl font-light'>
          Sign Up
        </span>
        <span className='font-redhat text-neutral-500 text-sm font-medium max-w-md'>
          Create an account to get started with our platform. Please provide a
          valid email address and a strong password.
        </span>
        <div className='mt-3 flex flex-col gap-3'>
          <AuthInput
            className='max-w-md'
            label='Your Name'
            type='text'
            name='name'
          />
          <AuthInput
            className='max-w-md'
            label='Email'
            type='email'
            autocomplete='email'
            name='email'
          />
          <AuthInput
            name='ethAddress'
            className='max-w-md'
            label='Ethereum Address'
            type='password'
          />
          <AuthInput
            name='username'
            className='max-w-md'
            label='Password'
            type='password'
          />
          <AuthInput
            className='max-w-md'
            label='Confirm Password'
            type='password'
            name='confirm-password'
          />
          <Dropdown
            className='max-w-md'
            label='User Type'
            options={['Admin', 'Contractor', 'Transporter']}
          />
          <div className='flex flex-row gap-2 items-center ml-2 mt-4'>
            <input type='checkbox' name='terms' className='w-4 h-4 mt-1' />
            <span className='text-white text-sm'>Is your KYC verified? </span>
          </div>
          <button
            type='submit'
            className='w-full h-12 rounded-xl mt-4 bg-white text-black font-redhat text-center cursor-pointer hover:bg-neutral-50'
          >
            Sign Up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
