import { Eye, EyeClosed } from 'lucide-react';
import React, { useRef, useState } from 'react';

function AuthInput({
  label = 'Email Address',
  type = 'text',
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [value, setValue] = useState('');

  const isPasswordField = type === 'password';
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

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent focus shifting
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div
      className={`relative flex flex-row items-center cursor-text gap-0 px-6 py-1 outline-1 outline-neutral-600 max-w-80 w-full rounded-lg min-h-12 ${className}`}
      onClick={(e) => {
        e.preventDefault(); // Prevent focus shifting
        handleFocus();
      }}
    >
      <label
        className={`text-neutral-400 cursor-text text-sm bg-neutral-950 absolute transition-all duration-200 ${
          isLabelTop
            ? '-top-2 left-3 text-xs'
            : 'top-1/2 -translate-y-1/2 left-8'
        }`}
        onClick={handleFocus}
      >
        {label}
      </label>
      <input
        ref={ref}
        className='bg-transparent w-full h-full outline-none text-neutral-200 placeholder:text-neutral-400'
        type={inputType}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {isPasswordField && (
        <button
          type='button'
          className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400'
          onClick={togglePasswordVisibility}
        >
          {inputType === 'password' ? (
            <EyeClosed className='cursor-pointer' size={18} />
          ) : (
            <Eye className='cursor-pointer' size={18} />
          )}
        </button>
      )}
    </div>
  );
}

export default AuthInput;
