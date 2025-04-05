import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Dropdown({
  label = 'Select an option',
  options = [],
  className = '',
  disabled = false,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef(null);
  const isLabelTop = focused || selectedValue !== '';

  const handleFocus = () => {
    if (!disabled) setFocused(true);
  };

  const handleBlur = () => {
    if (!disabled) setFocused(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsOpen(!isOpen);
      handleFocus();
    }
  };

  const selectOption = (option) => {
    if (!disabled) {
      setSelectedValue(option);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-row items-center gap-0 px-6 py-1 outline-1 outline-neutral-600 max-w-80 w-full rounded-lg min-h-12 ${
        disabled
          ? 'cursor-not-allowed bg-neutral-800 text-neutral-500'
          : 'cursor-pointer'
      } ${className}`}
      onClick={toggleDropdown}
    >
      <input
        value={selectedValue}
        type='hidden'
        {...props}
        disabled={disabled}
      />
      <label
        className={`text-neutral-400 text-sm bg-neutral-950 absolute transition-all duration-200 ${
          isLabelTop
            ? '-top-2 left-3 text-xs'
            : 'top-1/2 -translate-y-1/2 left-8'
        } ${disabled ? 'text-neutral-500' : ''}`}
      >
        {label}
      </label>

      <div
        className={`bg-transparent w-full h-full outline-none flex items-center ${
          disabled ? 'text-neutral-500' : 'text-neutral-200'
        }`}
      >
        {selectedValue || ''}
      </div>

      <button
        type='button'
        className={`absolute right-4 top-1/2 -translate-y-1/2 ${
          disabled ? 'text-neutral-500' : 'text-neutral-400'
        }`}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        {isOpen ? (
          <ChevronUp className='cursor-pointer' size={18} />
        ) : (
          <ChevronDown className='cursor-pointer' size={18} />
        )}
      </button>

      {isOpen && !disabled && (
        <div className='absolute left-0 top-full mt-1 w-full bg-neutral-900 border border-neutral-700 rounded-md z-10 max-h-60 overflow-y-auto'>
          {options.map((option, index) => (
            <div
              key={index}
              className='px-6 py-2 hover:bg-neutral-800 cursor-pointer text-neutral-200'
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
