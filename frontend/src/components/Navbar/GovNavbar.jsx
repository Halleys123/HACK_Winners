import React from 'react';
import { LogOut, FileText } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { NavLink } from 'react-router-dom';

export default function GovNavbar() {
  return (
    <div className='z-0 flex flex-col gap-4 rounded-md bg-neutral-900 w-72 h-full p-4 outline outline-violet-950 drop-shadow-2xl shadow-violet-500/50'>
      <div className='mb-6 mt-2'>
        <h1 className='text-xl font-bold text-white'>Government Portal</h1>
        <div className='h-0.5 bg-violet-700 mt-2 w-3/4'></div>
      </div>

      <div className='flex-grow'>
        <NavLink
          to={'/gov/tenders'}
          className={({ isActive }) => {
            let cla =
              'w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-violet-900/40 rounded-md transition-colors';
            if (!isActive) return cla;
            else return cla + ' bg-violet-900/40';
          }}
        >
          <FileText size={20} className='text-violet-400' />
          <span>Tenders</span>
        </NavLink>
      </div>

      <div className='mt-auto pt-4 border-t border-violet-900/50'>
        <button className='w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-red-900/30 rounded-md transition-colors'>
          <LogOut size={20} className='text-red-400' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
