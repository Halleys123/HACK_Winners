import React from 'react';
import {
  CalendarIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export default function BidCard({
  id = 1,
  //   tenderId = 1,
  //   contractorId = 2,
  bidPrice = 48500000,
  documents = {
    financialProposal:
      'https://contractorsite.in/docs/bid-financial-proposal.pdf',
    technicalProposal: 'https://contractorsite.in/docs/bid-tech-proposal.pdf',
  },
  isApproved = true,
  remarks = 'Ready to mobilize within 2 weeks of award',
  createdAt = '2025-04-04T10:44:46.000Z',
  updatedAt = '2025-04-05T05:45:25.000Z',
  tender = {
    id: 1,
    title: 'Construction of Rural Roads in Bihar',
    tenderNumber: 'TND2025001',
    estimatedCost: 50000000,
    category: 'Infrastructure',
  },
  contractor = {
    id: 2,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    ethAddress: '0xAbC1234567890DeF1234567890AbCdEf12345678',
  },
}) {
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate savings percentage
  const calculateSavings = () => {
    const savings = tender.estimatedCost - bidPrice;
    const percentage = (savings / tender.estimatedCost) * 100;
    return percentage.toFixed(1);
  };

  return (
    <div className='max-w-md'>
      <div className='w-full p-6 rounded-xl bg-gray-900 text-gray-100 border border-gray-800 shadow-xl overflow-hidden'>
        <div className='flex justify-between items-start mb-4'>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              isApproved
                ? 'bg-emerald-900 text-emerald-300'
                : 'bg-amber-900 text-amber-300'
            }`}
          >
            {isApproved ? 'Approved' : 'Pending'}
          </span>
          <span className='text-xs text-gray-500'>Bid #{id}</span>
        </div>

        <h3 className='text-xl font-bold mb-2 text-white'>{tender.title}</h3>
        <p className='text-sm text-gray-400 mb-4'>
          {tender.tenderNumber} • {tender.category}
        </p>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='flex items-center'>
            <CurrencyRupeeIcon className='h-4 w-4 text-indigo-400 mr-2' />
            <div>
              <p className='text-xs text-gray-500'>Bid Amount</p>
              <p className='text-sm font-medium text-white'>
                {formatCurrency(bidPrice)}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <CurrencyRupeeIcon className='h-4 w-4 text-indigo-400 mr-2' />
            <div>
              <p className='text-xs text-gray-500'>Estimated Cost</p>
              <p className='text-sm font-medium text-white'>
                {formatCurrency(tender.estimatedCost)}
              </p>
            </div>
          </div>
        </div>

        <div className='mb-4 bg-gray-800 p-3 rounded-lg'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-xs text-gray-500'>Cost Savings</p>
            <span className='text-xs font-medium px-2 py-1 rounded bg-blue-900 text-blue-300'>
              {calculateSavings()}% lower
            </span>
          </div>
        </div>

        <div className='mb-4'>
          <div className='flex items-center mb-1'>
            <UserIcon className='h-4 w-4 text-amber-400 mr-2' />
            <p className='text-xs text-gray-500'>Contractor</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm font-medium text-white'>{contractor.name}</p>
            <a
              href={`mailto:${contractor.email}`}
              className='text-xs text-blue-400 hover:underline'
            >
              {contractor.email}
            </a>
          </div>
        </div>

        <div className='mb-4'>
          <p className='text-xs text-gray-500 mb-1'>Remarks</p>
          <p className='text-sm text-gray-300 bg-gray-800 p-2 rounded'>
            {remarks}
          </p>
        </div>

        <div className='border-t border-gray-800 pt-4 mt-4'>
          <p className='text-xs text-gray-500 mb-2'>Documents</p>
          <div className='flex space-x-2'>
            <a
              href={documents.financialProposal}
              className='flex items-center px-3 py-2 bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors'
            >
              <DocumentTextIcon className='h-4 w-4 mr-1' />
              Financial
            </a>
            <a
              href={documents.technicalProposal}
              className='flex items-center px-3 py-2 bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors'
            >
              <DocumentTextIcon className='h-4 w-4 mr-1' />
              Technical
            </a>
          </div>
        </div>

        <div className='flex justify-between items-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800'>
          <div className='flex items-center'>
            <CalendarIcon className='h-3 w-3 mr-1' />
            <span>Created: {formatDate(createdAt)}</span>
          </div>
          <div className='flex items-center'>
            <ClockIcon className='h-3 w-3 mr-1' />
            <span>Updated: {formatDate(updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
