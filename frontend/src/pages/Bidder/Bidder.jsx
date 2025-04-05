import Popover from '@/components/Popover';
import TenderCard from '@/components/TenderCard';
import { PlusSquare } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import BidCard from './components/BidCard';
import customFetch from '@/utils/Fetch';
import Loading from '@/components/Loading';

export default function Bidder() {
  const [showPopover, setShowpopover] = useState(false);
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getBidder() {
    setLoading(true);
    const id = localStorage.getItem('userId');
    const response = await customFetch(`/bid/get?contractorId=${id}`, null);
    setLoading(false);
    if (!response.data.success) {
      return;
    }
    setBiddings(response.data.data);
  }

  useEffect(() => {
    getBidder();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <Loading visible={loading} text='Loading Bids...' />
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl text-white'>Previous Contracts</span>
          <span className='text-sm text-neutral-500'>
            View a list of all previous tenders assigned to you. You can also
            view the details of each tender by clicking on it.
          </span>
        </div>
      </div>
      <Popover
        close={() => setShowpopover(false)}
        visible={showPopover}
      ></Popover>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        {biddings.map((bid) => (
          <BidCard {...bid} key={bid.id} />
        ))}
      </div>
    </div>
  );
}
