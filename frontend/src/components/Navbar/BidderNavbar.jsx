import React from 'react';
import { LogOut, FileText, HammerIcon } from 'lucide-react'; // Assuming you're using lucide-react for icons
import { NavLink, useNavigate } from 'react-router-dom';

export default function BidderNavbar() {
  const navigate = useNavigate();
  return (
    <div className='z-0 flex flex-col gap-4 rounded-md bg-neutral-900 w-72 h-full p-4 outline outline-amber-950 drop-shadow-2xl shadow-amber-500/50'>
      <div className='mb-6 mt-2'>
        <h1 className='text-xl font-bold text-white'>Bidder Portal</h1>
        <div className='h-0.5 bg-amber-700 mt-2 w-3/4'></div>
      </div>

      <div className='flex-grow flex flex-col gap-2'>
        <NavLink
          to={'/bidder/tenders'}
          className={({ isActive }) => {
            let cla =
              'w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-amber-900/40 rounded-md transition-colors';
            if (!isActive) return cla;
            else return cla + ' bg-amber-900/40';
          }}
        >
          <FileText size={20} className='text-amber-400' />
          <span>My Bids</span>
        </NavLink>
        <NavLink
          to={'/bidder/open-tenders'}
          className={({ isActive }) => {
            let cla =
              'w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-amber-900/40 rounded-md transition-colors';
            if (!isActive) return cla;
            else return cla + ' bg-amber-900/40';
          }}
        >
          <HammerIcon size={20} className='text-amber-400' />
          <span>Open Tenders</span>
        </NavLink>
      </div>

      <div className='mt-auto pt-4 border-t border-amber-900/50'>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className='w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-red-900/30 rounded-md transition-colors'
        >
          <LogOut size={20} className='text-red-400' />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
