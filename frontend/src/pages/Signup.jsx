import React from 'react';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '@/components/Inputs/AuthInput';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function Signup() {
  return (
    <AuthLayout>
      <div className='flex flex-col gap-2 max-w-md'>
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
            label='Email'
            type='email'
            autocomplete='email'
          />
          <AuthInput className='max-w-md' label='Password' type='password' />
          <AuthInput
            className='max-w-md'
            label='Confirm Password'
            type='password'
          />
          <Dropdown
            className='max-w-md'
            label='Country'
            options={['Government', 'Contractor', 'Citizen']}
          />
          <button className='w-full h-12 rounded-xl mt-4 bg-white text-black font-redhat text-center cursor-pointer hover:bg-neutral-50'>
            Sign Up
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
