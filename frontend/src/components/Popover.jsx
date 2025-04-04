import { X } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

export default function Popover({ children, close }) {
  return ReactDOM.createPortal(
    <div className='z-30 absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-neutral-800/40 backdrop-blur-sm'>
      <div className='max-w-3xl relative mx-8 min-h-96 w-full outline-4 outline-neutral-600 rounded-lg bg-neutral-800 shadow-[0px_0px_27px_0px_#2D2D2D]'>
        <div className='absolute top-4 right-4 group' onClick={close}>
          <X className='text-red-500 group-hover:text-red-400 transition-all duration-200 ease-in-out cursor-pointer' />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('root') || document.createElement('div')
  );
}
