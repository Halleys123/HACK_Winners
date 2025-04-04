import React from 'react';
import GovNavbar from '@/components/GovNavbar';
import { Outlet, useOutlet } from 'react-router-dom';

export default function GovLayout() {
  const outlet = useOutlet();
  return (
    <div className='flex flex-row gap-4 p-4 w-full h-full'>
      <GovNavbar />
      <div className='flex flex-col gap-4 flex-1 w-full shadow-lg shadow-cyan-500/80 bg-neutral-900'>
        {outlet ? (
          <Outlet />
        ) : (
          <h2 id='system' className='text-4xl' contentEditable>
            PDS System
          </h2>
        )}
      </div>
    </div>
  );
}
