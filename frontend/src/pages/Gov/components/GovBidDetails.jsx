import React from 'react';

export default function GovBidDetails({ data, approveBid }) {
  if (!data.bidPrice || !data.tender) {
    return (
      <div className='bg-neutral-900 rounded-lg p-6 max-w-full h-full overflow-auto'>
        <p className='text-neutral-400'>No data available</p>
      </div>
    );
  }
  return (
    <div className='bg-neutral-900 rounded-lg p-2 max-w-full h-full overflow-auto'>
      {/* Header with approval status */}
      <div className='flex justify-between items-center mb-6 border-b border-neutral-700 pb-4'>
        <h2 className='text-2xl font-bold text-white'>Bid Details</h2>
        <div className='flex items-center'>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              data.isApproved
                ? 'bg-green-900/60 text-green-400'
                : 'bg-yellow-900/60 text-yellow-400'
            }`}
          >
            {data.isApproved ? 'Approved' : 'Pending Approval'}
          </span>
        </div>
      </div>

      {/* Main content in columns */}
      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
        {/* Left column */}
        <div className='space-y-6'>
          {/* Tender information */}
          <div className='bg-neutral-800 p-4 rounded-md border border-neutral-700'>
            <h3 className='text-lg font-semibold text-violet-400 mb-3 border-b border-neutral-700 pb-2'>
              Tender Information
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Title:</span>
                <span className='font-medium text-white text-right'>
                  {data?.tender?.title}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Tender Number:</span>
                <span className='font-medium text-white'>
                  {data?.tender?.tenderNumber}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Category:</span>
                <span className='font-medium text-white'>
                  {data?.tender?.category}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Estimated Cost:</span>
                <span className='font-medium text-white'>
                  ₹{data?.tender?.estimatedCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Bid information */}
          <div className='bg-neutral-800 p-4 rounded-md border border-neutral-700'>
            <h3 className='text-lg font-semibold text-violet-400 mb-3 border-b border-neutral-700 pb-2'>
              Bid Information
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Bid ID:</span>
                <span className='font-medium text-white'>{data.id}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Bid Price:</span>
                <span className='font-medium text-green-400'>
                  ₹{data.bidPrice.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-end'>
                <span className='ml-auto text-neutral-400'>
                  Price Difference:
                </span>
                <span
                  className={`font-medium text-end ${
                    data.bidPrice < data?.tender?.estimatedCost
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {data.bidPrice < data?.tender?.estimatedCost
                    ? `₹${(
                        data?.tender?.estimatedCost - data.bidPrice
                      ).toLocaleString()} below estimate`
                    : `₹${(
                        data.bidPrice - data?.tender?.estimatedCost
                      ).toLocaleString()} above estimate`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className='space-y-6'>
          {/* Contractor Information */}
          <div className='bg-neutral-800 p-4 rounded-md border border-neutral-700'>
            <h3 className='text-lg font-semibold text-violet-400 mb-3 border-b border-neutral-700 pb-2'>
              Contractor Information
            </h3>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Name:</span>
                <span className='font-medium text-white'>
                  {data.contractor.name}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-neutral-400'>Email:</span>
                <span className='font-medium text-white'>
                  {data.contractor.email}
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-neutral-400'>ETH Address:</span>
                <span className='font-mono text-sm break-all bg-neutral-900 p-2 rounded mt-1 text-neutral-300'>
                  {data.contractor.ethAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className='bg-neutral-800 p-4 rounded-md border border-neutral-700'>
            <h3 className='text-lg font-semibold text-violet-400 mb-3 border-b border-neutral-700 pb-2'>
              Documents
            </h3>
            <div className='space-y-3'>
              <a
                href={data.documents.technicalProposal}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center p-2 bg-blue-900/30 hover:bg-blue-800/50 text-blue-400 rounded transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Technical Proposal
              </a>

              <a
                href={data.documents.financialProposal}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center p-2 bg-violet-900/30 hover:bg-violet-800/50 text-violet-400 rounded transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Financial Proposal
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Remarks section - full width */}
      <div className='mt-6 bg-neutral-800 p-4 rounded-md border border-neutral-700'>
        <h3 className='text-lg font-semibold text-violet-400 mb-2'>Remarks</h3>
        <p className='text-neutral-300'>{data.remarks}</p>
      </div>

      {/* if !isApproved then aprove button */}

      {!data.isApproved && (
        <div className='mt-4'>
          <button
            onClick={() => approveBid(data.id)}
            className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            Approve Bid
          </button>
        </div>
      )}

      {/* Footer with dates */}
      <div className='mt-6 pt-4 border-t border-neutral-700 text-sm text-neutral-500 flex justify-between'>
        <span>
          Created:{' '}
          {new Date(data.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span>
          Updated:{' '}
          {new Date(data.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
