import React from 'react';
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  ExternalLink,
  DollarSign,
  User,
  Mail,
  Hash,
} from 'lucide-react';

export default function BidDetailsSidebar({ data }) {
  return (
    <div className='flex flex-col gap-6 h-full'>
      {/* Tender Overview Card */}
      <div className='bg-neutral-800 rounded-lg p-4 border-l-4 border-blue-500'>
        <h2 className='text-xl font-bold text-white mb-2'>
          {data.tender.title}
        </h2>
        <div className='flex items-center text-neutral-400 text-sm'>
          <Hash size={14} className='mr-1' />
          <span>{data.tender.tenderNumber}</span>
          <span className='mx-2'>•</span>
          <span className='text-blue-400'>{data.tender.category}</span>
        </div>
      </div>

      {/* Bid Status Card */}
      <div className='bg-neutral-800 rounded-lg p-4'>
        <div className='flex justify-between items-center mb-3'>
          <h3 className='text-sm font-semibold text-neutral-400 uppercase'>
            Bid Status
          </h3>
          {data.isApproved ? (
            <span className='px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium'>
              Approved
            </span>
          ) : (
            <span className='px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium'>
              Pending
            </span>
          )}
        </div>
        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center gap-2'>
            <DollarSign size={18} className='text-neutral-400' />
            <div>
              <p className='text-sm text-neutral-400'>Bid Amount</p>
              <p className='text-lg font-bold text-white'>
                ₹{data.bidPrice.toLocaleString()}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <DollarSign size={18} className='text-neutral-400' />
            <div>
              <p className='text-sm text-neutral-400'>Estimated Cost</p>
              <p className='text-lg font-bold text-white'>
                ₹{data.tender.estimatedCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contractor Info */}
      <div className='bg-neutral-800 rounded-lg p-4'>
        <h3 className='text-sm font-semibold text-neutral-400 uppercase mb-3'>
          Contractor
        </h3>
        <div className='flex items-center gap-3 mb-3'>
          <div className='w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center'>
            <User size={20} className='text-blue-400' />
          </div>
          <div>
            <p className='font-medium text-white'>{data.contractor.name}</p>
            <div className='flex items-center text-neutral-400 text-sm'>
              <Mail size={14} className='mr-1' />
              <a
                href={`mailto:${data.contractor.email}`}
                className='text-blue-400 hover:underline'
              >
                {data.contractor.email}
              </a>
            </div>
          </div>
        </div>
        <div className='bg-neutral-700/50 p-2 rounded text-xs font-mono text-neutral-300 overflow-hidden text-ellipsis'>
          {data.contractor.ethAddress}
        </div>
      </div>

      {/* Remarks */}
      <div className='bg-neutral-800 rounded-lg p-4'>
        <h3 className='text-sm font-semibold text-neutral-400 uppercase mb-2'>
          Remarks
        </h3>
        <p className='text-neutral-300 text-sm'>{data.remarks}</p>
      </div>

      {/* Documents */}
      <div className='bg-neutral-800 rounded-lg p-4'>
        <h3 className='text-sm font-semibold text-neutral-400 uppercase mb-3'>
          Documents
        </h3>
        <div className='space-y-2'>
          <a
            href={data.documents.financialProposal}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors'
          >
            <FileText size={18} className='text-blue-400' />
            <div className='flex-1'>
              <p className='text-sm font-medium text-white'>
                Financial Proposal
              </p>
            </div>
            <ExternalLink size={16} className='text-neutral-400' />
          </a>
          <a
            href={data.documents.technicalProposal}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 p-3 bg-neutral-700/50 rounded-lg hover:bg-neutral-700 transition-colors'
          >
            <FileText size={18} className='text-blue-400' />
            <div className='flex-1'>
              <p className='text-sm font-medium text-white'>
                Technical Proposal
              </p>
            </div>
            <ExternalLink size={16} className='text-neutral-400' />
          </a>
        </div>
      </div>

      <div className='mt-auto text-xs text-neutral-500'>
        <div className='flex items-center gap-1 mb-1'>
          <Calendar size={12} />
          <span>Created: {new Date(data.createdAt).toLocaleString()}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Clock size={12} />
          <span>Updated: {new Date(data.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
