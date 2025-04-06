import React, { useEffect, useState } from 'react';
import TenderCard from '@/components/TenderCard';
import { PlusSquare, RefreshCcw } from 'lucide-react';
import Popover from '@/components/Popover';
import PopoverContent from './components/AddTender';
import customFetch from '@/utils/Fetch';
import Loading from '@/components/Loading';
import HelpSidebar from '@/components/HelpSidebar';
import GovBidDetails from './components/GovBidDetails';

export default function Tenders() {
  const [showPopover, setShowpopover] = useState(false);
  const [showTenderDetailPopover, setShowTenderDetailPopover] = useState(false);
  const [showBidDetailsSidebar, setShowBidDetailsSidebar] = useState(false);
  const [bidDetails, setBidDetails] = useState({});

  const [tenders, setTenders] = useState([]);
  const [tenderDetails, setTenderDetails] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading... Please Wait');

  async function getTender() {
    setLoading(true);
    setLoadingText('Loading Tenders... Please Wait');
    const response = await customFetch('/tender/get', null);
    setLoading(false);
    if (!response.data.success) {
      setLoadingText('Failed to load tenders');
      return;
    }
    setTenders(response.data.data);
  }

  async function getTenderDetails(tenderID = 1) {
    setLoading(true);
    setLoadingText('Loading Tender Details... Please Wait');
    const response = await customFetch(`/bid/get?tenderId=${tenderID}`, null);
    setLoading(false);
    setLoadingText('Loading... Please Wait');
    if (!response.data.success) {
      return;
    }
    console.log(response.data.data);
    setTenderDetails(response.data.data);
  }

  async function getBidDetails(bidId) {
    setLoading(true);
    setLoadingText('Loading Bid Details... Please Wait');
    const response = await customFetch(`/bid/get/${bidId}`, null);
    setLoading(false);
    setLoadingText('Loading... Please Wait');
    if (!response.data.success) {
      return;
    }
    console.log(response.data.data);
    setBidDetails(response.data.data);
  }

  async function approveBid(bidId) {
    setLoading(true);
    setLoadingText('Approving Bid... Please Wait');
    const response = await customFetch(`/tender/approve/${bidId}`, {
      method: 'PATCH',
    });
    setLoadingText('Loading... Please Wait');
    if (!response.data.success) {
      setLoadingText('Failed to approve bid');
      setLoading(false);
      return;
    }
    setLoadingText('Bid approved successfully');
    setShowBidDetailsSidebar(false);
    setLoading(false);
  }

  useEffect(() => {
    getTender();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <Loading visible={loading} text={loadingText} />
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <span className='text-2xl text-white'>All Tenders</span>
          <span className='text-sm text-neutral-500'>
            Here you can find all the tenders available for bidding.
          </span>
        </div>
        <div className='flex flex-row gap-2'>
          <PlusSquare
            strokeWidth={1.5}
            size={32}
            onClick={() => setShowpopover(true)}
            className='text-white cursor-pointer hover:text-violet-500 transition-all duration-200 ease-in-out'
          />

          <RefreshCcw
            strokeWidth={1.5}
            size={32}
            onClick={() => {
              setLoading(true);
              getTender();
            }}
            className={`text-neutral-300 cursor-pointer transition-all duration-200 ease-in-out ${
              loading
                ? 'animate-spin text-violet-400 hover:text-neutral-500'
                : 'text-neutral-400 hover:text-violet-500'
            }`}
          />
        </div>
      </div>
      <HelpSidebar
        heading='How to Create a Tender'
        visible={showBidDetailsSidebar}
        close={() => setShowBidDetailsSidebar(false)}
      >
        <GovBidDetails approveBid={approveBid} data={bidDetails} />
      </HelpSidebar>
      <Popover close={() => setShowpopover(false)} visible={showPopover}>
        <PopoverContent
          handleClose={() => {
            setShowpopover(false);
          }}
        />
      </Popover>
      <Popover
        className={'max-w-5xl min-h-none'}
        close={() => setShowTenderDetailPopover(false)}
        visible={showTenderDetailPopover}
      >
        <div className='flex flex-col h-full gap-4 p-4 bg-[#1a2332] rounded-lg border border-[#2a3546]'>
          <div className='flex items-center justify-between'>
            <span className='text-lg text-white font-semibold'>
              Biddings on Current Tender
            </span>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-[#151e2c] text-sm uppercase'>
                <tr>
                  <th className='px-6 py-3 text-left text-neutral-400 font-medium'>
                    Contractor ID
                  </th>
                  <th className='px-6 py-3 text-left text-neutral-400 font-medium'>
                    Bidder Name
                  </th>
                  <th className='px-6 py-3 text-left text-neutral-400 font-medium'>
                    Bid Price
                  </th>
                  <th className='px-6 py-3 text-center text-neutral-400 font-medium'>
                    EtherId
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[#2a3546]'>
                {tenderDetails.map((tender) => (
                  <tr
                    onClick={() => {
                      getBidDetails(tender.id);
                      setShowBidDetailsSidebar(true);
                      setShowTenderDetailPopover(false);
                    }}
                    key={tender.id}
                    className='hover:bg-[#1f293d] transition-colors duration-150 cursor-pointer'
                  >
                    <td className='px-6 py-4 text-white'>
                      {tender.contractor.id}
                    </td>
                    <td className='px-6 py-4 text-white'>
                      {tender.contractor.name}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <span className='text-neutral-400'>₹</span>
                        <span className='text-white font-medium'>
                          {tender.bidPrice}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='text-neutral-400'>
                        {tender.contractor.ethAddress}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Popover>
      <div className='flex flex-row flex-wrap gap-x-2 gap-y-4'>
        {tenders.map((tender) => (
          <TenderCard
            onClick={() => {
              setShowTenderDetailPopover(true);
              getTenderDetails(tender.id);
            }}
            {...tender}
            key={tender.id}
          />
        ))}
      </div>
    </div>
  );
}
