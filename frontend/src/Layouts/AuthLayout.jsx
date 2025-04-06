import React from 'react';
import glassImage from '@assets/pattern.jpg';

import { Globe, Key, Plus } from 'lucide-react';

export default function AuthLayout({ children }) {
  const cols = 4;
  const rows = 5;

  return (
    <div className='flex flex-row h-screen w-full overflow-hidden p-6 gap-6'>
      <div className='relative bg-neutral-900 w-full flex flex-col gap-4 flex-4/3 rounded-xl overflow-hidden'>
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className='flex flex-row gap-4 h-full'>
            {[...Array(cols)].map((_, colIndex) => (
              <img
                src={glassImage}
                alt='glass pattern'
                key={colIndex}
                className={`h-40 w-54 -translate-y-16 -translate-x-16`}
              />
            ))}
          </div>
        ))}
        <div
          style={{
            top: 'calc(2 * 160px + 2 * 16px - 64px)',
            left: 'calc(2 * 216px + 2 * 16px - 64px)',
            animation: 'moveBoxOne 8s forwards infinite',
          }}
          id='box'
          className='absolute flex flex-col justify-between h-40 w-54 rounded-lg bg-purple-400 p-3 shadow-2xl shadow-purple-500/70'
        >
          <Plus size={32} className='text-white' />
          <span className='text-xl text-white'>
            A corruption-free
            <br />
            world
          </span>
        </div>
        <div
          style={{
            top: 'calc(3 * 160px + 3 * 16px - 64px)',
            left: 'calc(2 * 216px + 2 * 16px - 64px)',
            animation: 'moveBoxTwo 8s forwards infinite',
            // animationDelay: '2s',
          }}
          id='box'
          className='absolute h-40 w-54 rounded-lg bg-yellow-200 flex items-center justify-center'
        >
          <Globe size={48} />
        </div>
        <div
          style={{
            top: 'calc(160px + 16px - 64px)',
            left: 'calc(216px + 16px - 64px)',
            animation: 'moveBoxThree 8s forwards infinite',
          }}
          id='box'
          className='absolute h-40 w-54 p-3 flex flex-col justify-between rounded-lg bg-yellow-200'
        >
          <Key size={32} />
          <span className='font-redhat'>Blockchain Security</span>
        </div>
        {/* <div
          style={{
            top: 'calc(2* 160px + 2* 16px - 64px)',
            left: 'calc(216px + 16px - 64px)',
            animation: 'moveBoxFour 8s forwards infinite',
          }}
          id='box'
          className='absolute h-40 w-54 rounded-lg bg-purple-400'
        >
          <img src={dots} alt='dots' className='h-full w-full rounded-lg' />
        </div> */}
      </div>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        {children}
      </div>
    </div>
  );
}

// Add this CSS animation to your global CSS file or a <style> tag
/*
@keyframes moveBox {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(160px + 2 * 16px - 64px));
  }
}
*/
