import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CheckCircle, X } from 'lucide-react';

export default function Info({
  visible = true,
  onClose = () => {},
  text = 'This is a demo version of the application. Some features may be limited.',
  duration = 2500,
}) {
  useEffect(() => {
    if (visible) {
      // Auto-close timer
      const autoCloseTimer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [visible, onClose, duration]);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        animation: visible ? 'infoIn 0.5s' : 'infoOut 0.5s ease-in-out',
        animationFillMode: 'forwards',
      }}
      className='absolute origin-right overflow-hidden right-4 bottom-4 bg-neutral-900 z-30 outline-2 max-w-md min-h-10 rounded-md outline-green-600 flex flex-row gap-2 p-2 text-white'
    >
      <CheckCircle size={16} className='text-green-500' />
      <span className='text-sm'>{text}</span>
      <X
        size={20}
        className='ml-2 text-red-500 cursor-pointer hover:scale-110 transition-transform duration-150'
        onClick={onClose}
      />
    </div>,
    document.getElementById('root')
  );
}
