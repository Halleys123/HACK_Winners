import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export default function TableRow({
  id,
  title,
  issuedOn,
  endDate,
  status,
  amount,
  onClick,
}) {
  return (
    <tr
      className='border-b border-gray-700 hover:bg-neutral-700/50 transition-colors duration-150 cursor-pointer'
      onClick={onClick}
    >
      <td className='px-6 py-4 text-center'>{id}</td>
      <td className='px-6 py-4 font-medium'>{title}</td>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          <Calendar size={16} className='text-gray-400' />
          <span>{issuedOn}</span>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          <Clock size={16} className='text-gray-400' />
          <span>{endDate}</span>
        </div>
      </td>
      <td className='px-6 py-4'>
        <span className='px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400'>
          {status}
        </span>
      </td>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          <span className='text-gray-400'>₹</span>
          <span className='font-medium'>{amount}</span>
        </div>
      </td>
      <td className='px-6 py-4 text-center'>
        <button className='p-2 rounded-full hover:bg-gray-600 transition-colors'>
          <ChevronRight size={18} className='text-blue-400' />
        </button>
      </td>
    </tr>
  );
}
