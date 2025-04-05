import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  FileText,
  ExternalLink,
  DollarSign,
  Info,
  //   Tag,
  Hash,
  ChevronRight,
} from 'lucide-react';

export default function TenderDetails({ tender, submitBid = () => {} }) {
  // If no tender is provided, show a placeholder or return null
  const [value, setValue] = useState('');
  if (!tender) return null;

  const {
    id,
    title,
    description,
    tenderNumber,
    estimatedCost,
    category,
    // currency,
    releaseDate,
    submissionDeadline,
    status,
    documents,
    createdAt,
    updatedAt,
  } = tender;

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format currency for display
  //   const formatCurrency = (amount, currencyCode) => {
  //     return new Intl.NumberFormat('en-IN', {
  //       style: 'currency',
  //       currency: currencyCode || 'INR',
  //       maximumFractionDigits: 0,
  //     }).format(amount);
  //   };

  return (
    <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold text-white'>{title}</h1>
          <div className='flex items-center gap-2 text-neutral-400'>
            <Hash size={16} />
            <span>{tenderNumber}</span>
            <span className='mx-1'>•</span>
            <span className='text-blue-400'>{category}</span>
          </div>
        </div>
        <div className='px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium'>
          {status}
        </div>
      </div>

      {/* Description */}
      <div className='bg-neutral-800 rounded-lg p-4'>
        <h2 className='text-sm font-semibold text-neutral-400 uppercase mb-2'>
          Description
        </h2>
        <p className='text-neutral-300'>{description}</p>
      </div>

      <div className='bg-neutral-800 rounded-lg p-4 border-l-4 border-blue-500'>
        <h2 className='text-sm font-semibold text-neutral-400 uppercase mb-3'>
          Submit Your Bid
        </h2>
        <div className='flex items-center gap-3 mb-3'>
          <DollarSign size={20} className='text-blue-400' />
          <div>
            <p className='text-sm text-neutral-400'>Estimated Cost</p>
            <p className='text-lg font-bold text-white'>
              ₹{estimatedCost?.toLocaleString() || 'Not Defined'}
            </p>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex gap-3'>
            <div className='relative flex-1'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400'>
                ₹
              </span>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='number'
                placeholder='Enter your bid amount'
                className='w-full bg-neutral-700 border border-neutral-600 rounded-lg py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button
              onClick={() => submitBid(id, value)}
              disabled={false}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white`}
            >
              {'Submit Bid'}
              <ChevronRight size={16} />
            </button>
          </div>
          <p className='text-xs text-neutral-500 mt-2'>
            Your bid should be competitive and based on the project
            requirements.
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
        {/* Financial Details */}

        {/* Timeline */}
        <div className='bg-neutral-800 rounded-lg p-4'>
          <h2 className='text-sm font-semibold text-neutral-400 uppercase mb-3'>
            Timeline
          </h2>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Calendar size={18} className='text-blue-400' />
              <div>
                <p className='text-sm text-neutral-400'>Release Date</p>
                <p className='text-white'>{formatDate(releaseDate)}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Clock size={18} className='text-blue-400' />
              <div>
                <p className='text-sm text-neutral-400'>Deadline</p>
                <p className='text-white'>{formatDate(submissionDeadline)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className='bg-neutral-800 rounded-lg p-4'>
        <h2 className='text-sm font-semibold text-neutral-400 uppercase mb-3'>
          Documents
        </h2>
        <div className='space-y-2'>
          {documents && documents.requirementsDoc && (
            <a
              href={documents.requirementsDoc}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors'
            >
              <FileText size={18} className='text-blue-400' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-white'>
                  Requirements Document
                </p>
              </div>
              <ExternalLink size={16} className='text-neutral-400' />
            </a>
          )}
          {documents && documents.sitePlan && (
            <a
              href={documents.sitePlan}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors'
            >
              <FileText size={18} className='text-blue-400' />
              <div className='flex-1'>
                <p className='text-sm font-medium text-white'>Site Plan</p>
              </div>
              <ExternalLink size={16} className='text-neutral-400' />
            </a>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className='text-xs text-neutral-500 mt-4'>
        <div className='flex items-center gap-1 mb-1'>
          <Info size={12} />
          <span>ID: {id}</span>
        </div>
        <div className='flex items-center gap-1 mb-1'>
          <Calendar size={12} />
          <span>Created: {new Date(createdAt).toLocaleString()}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Clock size={12} />
          <span>Updated: {new Date(updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
