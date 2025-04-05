import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { LoaderCircle } from 'lucide-react';

export default function Loading({ visible = true, text = '' }) {
  const [isRendered, setIsRendered] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isRendered) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        animation: visible
          ? 'loadIncome 0.5s ease-in-out'
          : 'loadOutgoing 0.5s ease-in-out',
        animationFillMode: 'forwards',
      }}
      className='absolute z-40 top-4 left-1/2 -translate-x-1/2 flex flex-row items-center justify-center gap-4 bg-white rounded-md w-fit px-6 py-2'
    >
      <LoaderCircle size={16} className='loader' />
      <span className='font-redhat text-md'>{text}</span>
    </div>,
    document.getElementById('root')
  );
}
