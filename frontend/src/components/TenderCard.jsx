import React from 'react';
import { EvervaultCard } from './ui/evervault-card';
import {
  CalendarIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function TenderCard({
  title = 'Tender Title',
  description = 'This is the description about the tender launched by government',
  status = 'Closed',
  estimatedCost = 0,
  releaseDate = new Date(),
  submissionDeadline = new Date(),
  documents = {},
  tenderNumber = 'TND2025001',
  onClick = () => {},
}) {
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
    const deadline = new Date(submissionDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();

  return (
    <div className='max-w-md'>
      <div
        onClick={onClick}
        className='w-full p-6 rounded-xl bg-gray-900 hover:bg-gray-950 cursor-pointer text-gray-100 border border-gray-800 shadow-xl overflow-hidden'
      >
        <div className='flex justify-between items-start mb-4'>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              status === 'Open'
                ? 'bg-emerald-900 text-emerald-300'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {status}
          </span>
          <span className='text-xs text-gray-500'>{tenderNumber}</span>
        </div>

        <h3 className='text-xl font-bold mb-2 text-white'>{title}</h3>
        <p className='text-sm text-gray-400 mb-4'>{description}</p>

        <div className='grid grid-cols-2 gap-4 mb-4'>
          <div className='flex items-center'>
            <CurrencyRupeeIcon className='h-4 w-4 text-indigo-400 mr-2' />
            <div>
              <p className='text-xs text-gray-500'>Estimated Cost</p>
              <p className='text-sm font-medium text-white'>
                {formatCurrency(estimatedCost)}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <CalendarIcon className='h-4 w-4 text-indigo-400 mr-2' />
            <div>
              <p className='text-xs text-gray-500'>Release Date</p>
              <p className='text-sm font-medium text-white'>
                {formatDate(releaseDate)}
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
              {formatDate(submissionDeadline)}
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
              href={documents.requirementsDoc}
              className='flex items-center px-3 py-2 bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors'
            >
              <DocumentTextIcon className='h-4 w-4 mr-1' />
              Requirements
            </a>
            <a
              href={documents.sitePlan}
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
