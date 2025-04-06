import React, { useEffect, useState } from 'react';
import { AlertCircle, Filter, Search } from 'lucide-react';
import TableRow from './components/TableRow';
import Pagination from './components/Pagination';
import HelpSidebar from '@/components/HelpSidebar';
import BidDetails from './components/BidDetails';
import TenderDetails from './components/TenderDetails';
import customFetch from '@/utils/Fetch';
import Loading from '@/components/Loading';

export default function OpenBids() {
  // const [showSidebar, setShowSidebar] = useState(false);
  const [showTenderSidebar, setShowTenderSidebar] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('Loading...');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const [tenderDetails, setTenderDetails] = useState({});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  async function getTender() {
    setLoading(true);
    setLoaderText('Loading Tenders... Please Wait');
    const response = await customFetch('/tender/get', null);
    setLoading(false);
    setLoaderText('Loading... Please Wait');
    if (!response.data.success) {
      return;
    }
    setFilteredData(response.data.data);
  }

  async function getTenderDetail(tenderID) {
    setLoading(true);
    setLoaderText('Loading Tender Details... Please Wait');
    const response = await customFetch(`/tender/get/${tenderID}`, null);
    setLoading(false);
    setLoaderText('Loading... Please Wait');
    if (!response.data.success) {
      return;
    }
    console.log(response.data.data);
    setTenderDetails(response.data.data);
  }

  async function submitBid(tenderId, bidPrice) {
    setLoading(true);
    const response = await customFetch(`/bid`, {
      method: 'POST',
      body: JSON.stringify({
        bidPrice: 1 * bidPrice,
        tenderId,
      }),
    });
    setLoading(false);
    if (!response.data.success) {
      setLoading(true);
      setLoaderText('Failed to submit bid');
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }
    setLoading(true);
    setLoaderText('Bid submitted successfully');
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setShowTenderSidebar(false);
  }

  useEffect(() => {
    getTender();
  }, []);

  return (
    <div className='flex flex-col gap-8'>
      <Loading visible={loading} text={loaderText} />
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold text-white'>Open Bids</h1>
          <p className='text-sm text-neutral-400'>
            View a list of all open bids available for bidding.
          </p>
        </div>
        <div className='flex gap-3'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search size={18} className='text-gray-400' />
            </div>
            <input
              type='text'
              className='pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white'
              placeholder='Search bids...'
            />
          </div>
          <button className='flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-white'>
            <Filter size={18} className='text-white' />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <HelpSidebar
        visible={showTenderSidebar}
        close={() => setShowTenderSidebar(false)}
      >
        <TenderDetails tender={tenderDetails} submitBid={submitBid} />
      </HelpSidebar>
      <div className='bg-neutral-800 rounded-xl overflow-hidden shadow-xl border border-violet-700'>
        <div className='p-4 bg-gray-750 border-b border-gray-700 flex justify-between items-center'>
          <h2 className='font-medium text-white flex items-center gap-2'>
            <AlertCircle size={18} className='text-blue-400' />
            Active Tenders
          </h2>
          <span className='text-sm text-gray-400'>
            Showing {currentItems.length} of {filteredData.length} entries
          </span>
        </div>{' '}
        <div className='overflow-x-auto'>
          <table className='min-w-full text-white'>
            <thead className='bg-gray-750 text-gray-300 text-sm uppercase'>
              <tr>
                <th className='px-6 py-3 text-center'>ID</th>
                <th className='px-6 py-3 text-left'>Title</th>
                <th className='px-6 py-3 text-left'>Issued On</th>
                <th className='px-6 py-3 text-left'>End Date</th>
                <th className='px-6 py-3 text-left'>Status</th>
                <th className='px-6 py-3 text-left'>Amount</th>
                <th className='px-6 py-3 text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {currentItems.map((item) => (
                <TableRow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  issuedOn={new Date(item.releaseDate).toDateString()}
                  endDate={new Date(item.submissionDeadline).toDateString()}
                  status={item.status}
                  amount={item.estimatedCost}
                  onClick={() => {
                    getTenderDetail(item.id);
                    setShowTenderSidebar(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className='p-4 bg-gray-750 border-t w-fit mx-auto border-gray-700'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
