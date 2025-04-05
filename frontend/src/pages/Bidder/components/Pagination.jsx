import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='flex gap-2 items-center justify-between'>
      <button
        className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </button>
      <div className='flex items-center gap-2 text-white'>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === index + 1
                ? 'bg-blue-500'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className='px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors disabled:opacity-50'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
