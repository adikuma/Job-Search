"use client";

import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import type { JobCardProps } from '@/types';

const glassEffect = {
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px'
};

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div 
      className="h-[280px] rounded-lg overflow-hidden group"
      style={glassEffect}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-white truncate mb-1">{job.title}</h3>
          <p className="text-sm text-gray-400 truncate mb-2">{job.company}</p>
          <div className="flex items-center gap-1 mb-2">
            <MapPin size={14} className="text-gray-500" />
            <p className="text-sm text-gray-500 truncate">{job.location}</p>
          </div>
        </div>

        <div className="flex-1 min-h-0 mb-4">
          <p className="text-sm text-gray-400 line-clamp-2">{job.description}</p>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4 rounded-2xl">
            <span 
              className="px-2 py-1 text-xs text-gray-300 rounded"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px' }}
            >
              {job.type}
            </span>
            {job.remote && (
              <span 
                className="px-2 py-1 text-xs text-gray-300 rounded-xl"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px' }}
              >
                Remote
              </span>
            )}
            {job.salary && (
              <span 
                className="px-2 py-1 text-xs text-gray-300 rounded"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px' }}
              >
                {job.salary}
              </span>
            )}
          </div>

          <button
            onClick={() => window.open(job.applyUrl, '_blank')}
            className="w-full p-2 text-sm text-gray-300 flex items-center justify-left gap-2 rounded transition-all duration-200 opacity-0 group-hover:opacity-100  rounded-2xl"
          >
            <div className="flex items-center gap-2 hover:scale-105 transition-all">
            Apply Now <ArrowUpRight size={14} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};