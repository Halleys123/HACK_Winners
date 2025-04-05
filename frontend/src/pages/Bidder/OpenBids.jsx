import React, { useState } from 'react';
import { AlertCircle, Filter, Search } from 'lucide-react';
import TableRow from './components/TableRow';
import Pagination from './components/Pagination';
import { tenderList } from '@/data/tenderList';
import HelpSidebar from '@/components/HelpSidebar';
import BidDetails from './components/BidDetails';
import TenderDetails from './components/TenderDetails';

export default function OpenBids() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTenderSidebar, setShowTenderSidebar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(tenderList);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='flex flex-col gap-8'>
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
      <HelpSidebar visible={showSidebar} close={() => setShowSidebar(false)}>
        <BidDetails
          data={{
            id: 1,
            tenderId: 1,
            contractorId: 2,
            bidPrice: 48500000,
            documents: {
              financialProposal:
                'https://contractorsite.in/docs/bid-financial-proposal.pdf',
              technicalProposal:
                'https://contractorsite.in/docs/bid-tech-proposal.pdf',
            },
            isApproved: false,
            remarks: 'Ready to mobilize within 2 weeks of award',
            createdAt: '2025-04-04T10:44:46.000Z',
            updatedAt: '2025-04-05T05:45:25.000Z',
            tender: {
              id: 1,
              title: 'Construction of Rural Roads in Bihar',
              tenderNumber: 'TND2025001',
              estimatedCost: 50000000,
              category: 'Infrastructure',
            },
            contractor: {
              id: 2,
              name: 'Alice Johnson',
              email: 'alice@example.com',
              ethAddress: '0xAbC1234567890DeF1234567890AbCdEf12345678',
            },
          }}
          onSubmitBid={() => {}}
          onWithdrawBid={() => {}}
        />
      </HelpSidebar>
      <HelpSidebar
        visible={showTenderSidebar}
        close={() => setShowTenderSidebar(false)}
      >
        <TenderDetails
          tender={{
            id: 'a1b2c3d4',
            title: 'Construction of Rural Roads in Bihar',
            description:
              'Development and maintenance of rural roads under PMGSY scheme.',
            tenderNumber: 'TND2025001',
            estimatedCost: 50000000,
            category: 'Infrastructure',
            currency: 'INR',
            releaseDate: '2025-04-01T00:00:00.000Z',
            submissionDeadline: '2025-04-30T00:00:00.000Z',
            status: 'Open',
            createdBy: 1,
            documents: {
              requirementsDoc: 'https://gov-tenders.in/docs/TND2025001-req.pdf',
              sitePlan: 'https://gov-tenders.in/docs/TND2025001-siteplan.pdf',
            },
            createdAt: '2025-04-05T10:04:53.035Z',
            updatedAt: '2025-04-05T10:04:53.035Z',
          }}
          onSubmitBid={() => {}}
          onWithdrawBid={() => {}}
        />
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
                  issuedOn={item.issuedOn}
                  endDate={item.endDate}
                  status={item.status}
                  amount={item.amount}
                  onClick={() => {
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
