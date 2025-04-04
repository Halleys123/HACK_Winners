import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div className='relative h-screen w-screen overflow-x-hidden overscroll-y-scroll bg-neutral-950 font-redhat'>
      {children}
    </div>
  );
}
