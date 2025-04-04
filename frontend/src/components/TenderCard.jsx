import React from 'react';
import { EvervaultCard } from './ui/evervault-card';
import {
  CalendarIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function TenderCard() {
  // Mock data from comments
  const tender = {
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
    createdAt: '2025-04-04T21:54:05.280Z',
    updatedAt: '2025-04-04T21:54:05.280Z',
  };

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

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const deadline = new Date(tender.submissionDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className='max-w-md'>
      <div className='w-full p-6 rounded-xl bg-gray-900 text-gray-100 border border-gray-800 shadow-xl overflow-hidden'>
        <div className='flex justify-between items-start mb-4'>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              tender.status === 'Open'
                ? 'bg-emerald-900 text-emerald-300'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {tender.status}
          </span>
          <span className='text-xs text-gray-500'>{tender.tenderNumber}</span>
        </div>

        <h3 className='text-xl font-bold mb-2 text-white'>{tender.title}</h3>
        <p className='text-sm text-gray-400 mb-4'>{tender.description}</p>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='flex items-center'>
            <CurrencyRupeeIcon className='h-4 w-4 text-indigo-400 mr-2' />
            <div>
              <p className='text-xs text-gray-500'>Estimated Cost</p>
              <p className='text-sm font-medium text-white'>
                {formatCurrency(tender.estimatedCost)}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <CalendarIcon className='h-4 w-4 text-indigo-400 mr-2' />
            <div>
              <p className='text-xs text-gray-500'>Release Date</p>
              <p className='text-sm font-medium text-white'>
                {formatDate(tender.releaseDate)}
              </p>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='flex items-center mb-1'>
            <ClockIcon className='h-4 w-4 text-amber-400 mr-2' />
            <p className='text-xs text-gray-500'>Submission Deadline</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-sm font-medium text-white'>
              {formatDate(tender.submissionDeadline)}
            </p>
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                daysRemaining <= 5
                  ? 'bg-red-900 text-red-300'
                  : 'bg-blue-900 text-blue-300'
              }`}
            >
              {daysRemaining} days left
            </span>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-4 mt-4'>
          <p className='text-xs text-gray-500 mb-2'>Documents</p>
          <div className='flex space-x-2'>
            <a
              href={tender.documents.requirementsDoc}
              className='flex items-center px-3 py-2 bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors'
            >
              <DocumentTextIcon className='h-4 w-4 mr-1' />
              Requirements
            </a>
            <a
              href={tender.documents.sitePlan}
              className='flex items-center px-3 py-2 bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors'
            >
              <DocumentTextIcon className='h-4 w-4 mr-1' />
              Site Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
