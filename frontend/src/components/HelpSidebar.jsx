import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function HelpSidebar({
  children, // Fixed typo from 'chlidren'
  close,
  heading = 'Default Heading',
  visible = true,
}) {
  const [isRendered, setIsRendered] = useState(visible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      setIsAnimatingOut(false);
    } else {
      setIsAnimatingOut(true);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // Match this with your animation duration
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isRendered) return null;

  return ReactDOM.createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className='w-screen h-screen bg-neutral-800/10 backdrop-blur-md fixed top-0 left-0 z-20 flex items-center flex-row-reverse p-5'
      style={{
        animation: isAnimatingOut
          ? 'fadeOut 0.3s ease-in-out'
          : 'fadeIn 0.5s ease-in-out',
        animationFillMode: 'forwards',
      }}
    >
      <div
        style={{
          animation: isAnimatingOut
            ? 'slideOutToRight 0.3s ease-in-out'
            : 'slideInFromRight 0.3s ease-in-out',
          animationFillMode: 'forwards',
        }}
        className='w-96 h-full bg-neutral-900 rounded-lg p-4 flex flex-col gap-4 outline outline-neutral-600 shadow-[0_0_10px_15px_#48abe055]'
      >
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-lg font-semibold font-redhat text-white'>
            {heading}
          </h1>
          <button
            className='p-2 rounded-sm cursor-pointer bg-red-500/10 hover:bg-red-500/20 transition-colors duration-150 flex items-center justify-center group'
            onClick={close}
            aria-label='Close'
          >
            <X
              size={18}
              className='text-red-500 group-hover:text-red-400 transition-colors'
            />
          </button>
        </div>
        <div className='flex flex-col gap-4 px-1 overflow-y-scroll overflow-x-hidden'>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
}
