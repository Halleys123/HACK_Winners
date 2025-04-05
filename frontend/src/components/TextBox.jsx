import React, { useRef, useState } from 'react';

export default function TextBox({
  label = 'Message',
  className = '',
  rows = 4,
  maxLength,
  ...props
}) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const isLabelTop = focused || value !== '';

  const handleFocus = () => {
    setFocused(true);
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleBlur = () => {
    setFocused(false);
    if (ref.current) {
      ref.current.blur();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      className={`relative flex flex-col cursor-text px-6 py-3 outline-1 outline-neutral-600 max-w-80 w-full rounded-lg ${className}`}
      onClick={(e) => {
        e.preventDefault();
        handleFocus();
      }}
    >
      <label
        className={`text-neutral-400 cursor-text text-sm bg-neutral-950 absolute transition-all duration-200 ${
          isLabelTop ? '-top-2 left-3 text-xs' : 'top-4 left-8'
        }`}
        onClick={handleFocus}
      >
        {label}
      </label>
      <textarea
        ref={ref}
        className='bg-transparent w-full outline-none text-neutral-200 placeholder:text-neutral-400 resize-none'
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <div className='text-xs text-neutral-400 text-right mt-1'>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
