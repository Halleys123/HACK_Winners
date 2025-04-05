import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function Popover({
  children,
  className,
  close,
  visible = false,
}) {
  const [isRendered, setIsRendered] = useState(visible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      setIsAnimatingOut(false);
    } else if (isRendered) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, isRendered]);

  if (!isRendered) return null;

  return ReactDOM.createPortal(
    <div
      className={`z-30 fixed top-0 left-0 h-screen w-screen flex items-center justify-center backdrop-blur-sm
                 ${
                   isAnimatingOut
                     ? 'animate-backdrop-fadeout'
                     : 'animate-backdrop-fadein'
                 } bg-neutral-800/40`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        style={{
          animation: isAnimatingOut
            ? 'popover-exit 0.3s cubic-bezier(0.34, 0.56, 0.64, 1) forwards'
            : 'popover-entrance 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          perspective: '1000px',
          transformOrigin: 'center bottom',
        }}
        className={`max-w-3xl relative mx-8 min-h-96 w-full outline-4 outline-neutral-600 rounded-lg bg-neutral-950 shadow-[0px_0px_27px_0px_#2D2D2D] overflow-hidden className`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='absolute top-4 right-4 group' onClick={close}>
          <X className='text-red-500 group-hover:text-red-400 transition-all duration-200 ease-in-out cursor-pointer' />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('root') || document.createElement('div')
  );
}
