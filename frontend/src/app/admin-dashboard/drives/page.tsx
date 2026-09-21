"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, Users, FileText, Download, Target, PlayCircle, StopCircle, CheckCircle2
} from "lucide-react";

type DriveStatus = 'active' | 'closed' | 'completed';

type ActiveDrive = {
  id: string;
  companyName: string;
  role: string;
  logo: string;
  status: DriveStatus;
  metrics: {
    applied: number;
    shortlisted: number;
    offered: number;
  };
  deadline: string;
};

export default function ManageDrives() {
  const [filter, setFilter] = useState<DriveStatus | 'all'>('all');
  
  const [drives, setDrives] = useState<ActiveDrive[]>([
    {
      id: "DRV-001",
      companyName: "Amazon",
      role: "SDE-1 (Frontend)",
      logo: "/logos/Amazon-logo-meaning.jpg",
      status: "active",
      metrics: { applied: 450, shortlisted: 120, offered: 0 },
      deadline: "Tomorrow"
    },
    {
      id: "DRV-002",
      companyName: "Zoho",
      role: "Member Technical Staff",
      logo: "/logos/Zoho.jpg",
      status: "active",
      metrics: { applied: 820, shortlisted: 310, offered: 0 },
      deadline: "In 3 Days"
    },
    {
      id: "DRV-003",
      companyName: "TCS",
      role: "Ninja Developer",
      logo: "/logos/tcs.png",
      status: "closed",
      metrics: { applied: 1150, shortlisted: 800, offered: 0 },
      deadline: "Passed"
    },
    {
      id: "DRV-004",
      companyName: "Google",
      role: "Software Engineer",
      logo: "/logos/google.svg",
      status: "completed",
      metrics: { applied: 600, shortlisted: 45, offered: 8 },
      deadline: "Passed"
    }
  ]);

  const toggleStatus = (id: string, currentStatus: DriveStatus) => {
    setDrives(prev => prev.map(drive => {
      if (drive.id === id) {
        if (currentStatus === 'active') return { ...drive, status: 'closed' };
        if (currentStatus === 'closed') return { ...drive, status: 'active' };
      }
      return drive;
    }));
  };

  const filteredDrives = drives.filter(d => filter === 'all' || d.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Active Drives</h1>
          <p className="text-gray-500 text-sm mt-1">Track pipeline metrics and manage ongoing placement drives.</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex bg-gray-200 p-1 rounded-lg w-full md:w-max overflow-x-auto shadow-inner border border-gray-300">
        {[
          { id: 'all', label: 'All Drives' },
          { id: 'active', label: 'Active (Accepting)' },
          { id: 'closed', label: 'Closed (Interviewing)' },
          { id: 'completed', label: 'Completed (Offers Out)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as DriveStatus | 'all')}
            className={`flex-1 md:flex-none px-6 py-2 text-sm font-bold rounded-md transition-all whitespace-nowrap ${
              filter === tab.id 
                ? 'bg-white text-[#293d6b] shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Drives */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDrives.map((drive) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={drive.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1.5 shadow-sm">
                    <img src={drive.logo} alt={drive.companyName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{drive.companyName}</h3>
                    <p className="text-sm font-semibold text-blue-600">{drive.role}</p>
                  </div>
                </div>
                
                {drive.status === 'active' && <span className="bg-green-100 text-green-700 text-xs font-black px-2 py-1 rounded border border-green-200 flex items-center gap-1"><PlayCircle size={12}/> ACTIVE</span>}
                {drive.status === 'closed' && <span className="bg-amber-100 text-amber-700 text-xs font-black px-2 py-1 rounded border border-amber-200 flex items-center gap-1"><StopCircle size={12}/> CLOSED</span>}
                {drive.status === 'completed' && <span className="bg-purple-100 text-purple-700 text-xs font-black px-2 py-1 rounded border border-purple-200 flex items-center gap-1"><CheckCircle2 size={12}/> DONE</span>}
              </div>

              {/* Metrics */}
              <div className="p-5 flex-1 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-2xl font-black text-gray-900">{drive.metrics.applied}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Applied</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="text-2xl font-black text-blue-700">{drive.metrics.shortlisted}</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">Shortlisted</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-50 border border-green-100">
                    <p className="text-2xl font-black text-green-700">{drive.metrics.offered}</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase mt-1">Offers</p>
                  </div>
                </div>
                
                {drive.status === 'active' && (
                  <p className="text-xs text-gray-500 font-medium text-center">
                    Accepting applications until: <span className="font-bold text-gray-800">{drive.deadline}</span>
                  </p>
                )}
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-2 mt-auto">
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                  <Download size={16} className="text-gray-500" /> Export Excel
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold text-white bg-[#293d6b] hover:bg-blue-900 border border-transparent transition-colors shadow-sm">
                  <Users size={16} /> View Students
                </button>
                
                {drive.status === 'active' && (
                  <button 
                    onClick={() => toggleStatus(drive.id, 'active')}
                    className="col-span-2 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors mt-1"
                  >
                    <StopCircle size={14} /> Manually Close Drive
                  </button>
                )}
                {drive.status === 'closed' && (
                  <button 
                    onClick={() => toggleStatus(drive.id, 'closed')}
                    className="col-span-2 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 transition-colors mt-1"
                  >
                    <PlayCircle size={14} /> Reopen Drive
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredDrives.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Target size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Drives Found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              There are no drives matching the "{filter}" status filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
