import React from 'react';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '@/components/Inputs/AuthInput';

export default function Login() {
  return (
    <AuthLayout>
      <div className='flex flex-col gap-2 max-w-md'>
        <span className='font-redhat text-neutral-300 text-3xl font-light'>
          Sign In
        </span>
        <span className='font-redhat text-neutral-500 text-sm font-medium max-w-md'>
          Let's get you started with your account. Please enter your email and
          password to continue.
        </span>
        <div className='mt-3 flex flex-col gap-3'>
          <AuthInput
            className='max-w-md'
            label='Email'
            type='email'
            autocomplete='email'
          />
          <AuthInput className='max-w-md' label='Password' type='password' />
          <button className='w-full h-12 rounded-xl mt-4 bg-white text-black font-redhat text-center cursor-pointer hover:bg-neutral-50'>
            Sign In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
