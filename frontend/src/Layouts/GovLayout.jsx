import GovNavbar from '@/components/Navbar/GovNavbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function GovLayout() {
  return (
    <div className='flex flex-row gap-4 p-4 w-full h-full'>
      <GovNavbar />
      <div className='flex flex-col gap-4 flex-1 p-8 w-full bg-neutral-900 outline outline-violet-950 rounded-lg overflow-scroll'>
        <Outlet />
      </div>
    </div>
  );
}
