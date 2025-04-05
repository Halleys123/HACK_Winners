import React, { useRef } from 'react';

export default function DateInput({
  label = 'Date',
  className = '',
  showTime = false,
  ...props
}) {
  const ref = useRef(null);
  const isLabelTop = true;
  const type = showTime ? 'datetime-local' : 'date';

  return (
    <div
      className={`relative flex flex-row items-center cursor-text gap-0 px-6 py-1 outline-1 outline-neutral-600 max-w-80 w-full rounded-lg min-h-12 ${className}`}
    >
      <label
        className={`text-neutral-400 cursor-text text-sm bg-neutral-950 absolute transition-all duration-200 ${
          isLabelTop
            ? '-top-2 left-3 text-xs'
            : 'top-1/2 -translate-y-1/2 left-8'
        }`}
      >
        {label}
      </label>
      <input
        ref={ref}
        className='bg-transparent w-full h-full outline-none text-neutral-200 placeholder:text-neutral-400'
        type={type}
        {...props}
      />
    </div>
  );
}
