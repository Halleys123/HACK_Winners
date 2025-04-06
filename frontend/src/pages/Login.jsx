import React, { useRef, useState } from 'react';
import AuthLayout from '../Layouts/AuthLayout';
import AuthInput from '@/components/Inputs/AuthInput';
import { NavLink, useNavigate } from 'react-router-dom';
import customFetch from '@/utils/Fetch';
import Loading from '@/components/Loading';

export default function Login() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('Loading... Please Wait');
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    setLoading(true);
    setLoaderText('Logging in... Please Wait');
    const response = await customFetch('/user/signIn', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data.success) {
      setLoaderText(
        'Login Failed! Please check your credentials and try again.'
      );
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }

    setLoading(false);

    console.log(response.data);
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('userId', response.data.data.user.id);

    if (response.data.data.user.role === 'Admin') {
      navigate('/gov');
    } else {
      navigate('/bidder');
    }
  }

  return (
    <AuthLayout>
      <Loading visible={loading} text={loaderText} />

      <form
        onSubmit={handleSubmit}
        ref={ref}
        className='flex flex-col gap-2 max-w-md'
      >
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
            name='email'
            autocomplete='email'
          />
          <AuthInput
            name='password'
            className='max-w-md'
            label='Password'
            type='password'
          />
          <button
            type='submit'
            className='w-full h-12 rounded-xl mt-4 bg-white text-black font-redhat text-center cursor-pointer hover:bg-neutral-50'
          >
            Sign In
          </button>
          <span className='text-sm text-neutral-500 font-redhat'>
            Don't have an account?{' '}
            <NavLink
              to='/signup'
              end
              className='text-violet-400 hover:text-violet-500 font-medium'
            >
              Sign Up
            </NavLink>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}
