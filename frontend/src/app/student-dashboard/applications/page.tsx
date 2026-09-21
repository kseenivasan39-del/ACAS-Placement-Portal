"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, Calendar, Clock, CheckCircle2, 
  XCircle, ChevronRight, FileText, AlertCircle, Video
} from "lucide-react";

export default function MyApplicationsPage() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [applications] = useState([
    {
      id: "A-001",
      company: "Amazon",
      role: "SDE Intern (6 Months)",
      logo: "/logos/Amazon-logo-meaning.jpg",
      appliedDate: "Oct 5, 2026",
      status: "interviewing",
      interviewDetails: {
        date: "Oct 20, 2026",
        time: "10:00 AM",
        link: "https://meet.google.com/gen-er-ate",
        type: "Technical Round 1"
      }
    },
    {
      id: "A-002",
      company: "Google India",
      role: "Software Development Engineer - 1",
      logo: "/logos/google.svg",
      appliedDate: "Oct 12, 2026",
      status: "shortlisted"
    },
    {
      id: "A-003",
      company: "Zoho Corporation",
      role: "Member Technical Staff",
      logo: "/logos/Zoho.jpg",
      appliedDate: "Oct 1, 2026",
      status: "applied"
    },
    {
      id: "A-004",
      company: "TCS (Digital)",
      role: "System Engineer",
      logo: "/logos/tcs.png",
      appliedDate: "Sep 15, 2026",
      status: "rejected"
    }
  ]);

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'interviewing': return { label: 'Interview Scheduled', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: <Clock size={14} className="text-amber-500"/> };
      case 'shortlisted': return { label: 'Shortlisted', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: <CheckCircle2 size={14} className="text-blue-500"/> };
      case 'offered': return { label: 'Offer Received', color: 'text-green-700 bg-green-50 border-green-200', icon: <CheckCircle2 size={14} className="text-green-500"/> };
      case 'rejected': return { label: 'Not Selected', color: 'text-red-700 bg-red-50 border-red-200', icon: <XCircle size={14} className="text-red-500"/> };
      default: return { label: 'Application Submitted', color: 'text-gray-700 bg-gray-50 border-gray-200', icon: <CheckCircle2 size={14} className="text-gray-500"/> };
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Track the status of your placement applications.</p>
      </div>

      <div className="space-y-4">
        {applications.map((app, i) => {
          const statusConfig = getStatusDisplay(app.status);
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={app.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="p-6 flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-white border border-gray-100 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                  {app.logo.includes('/') ? <img src={app.logo} alt={app.company} className="w-full h-full object-contain" /> : <span className="font-black text-2xl text-blue-600">{app.logo}</span>}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{app.role}</h2>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.color} w-fit`}>
                      {statusConfig.icon} {statusConfig.label}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 font-bold">{app.company}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
                    <Calendar size={14} /> Applied on {app.appliedDate}
                  </div>
                </div>
              </div>
              
              {/* Interview Details Section if status is interviewing */}
              {app.status === 'interviewing' && app.interviewDetails && (
                <div className="bg-amber-50/50 border-t border-amber-100 p-4 px-6 md:px-28">
                  <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <Video size={16} /> Upcoming Interview: {app.interviewDetails.type}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-sm">
                      <p className="text-[10px] font-bold text-amber-700 uppercase">Date</p>
                      <p className="text-sm font-bold text-gray-900">{app.interviewDetails.date}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-sm">
                      <p className="text-[10px] font-bold text-amber-700 uppercase">Time</p>
                      <p className="text-sm font-bold text-gray-900">{app.interviewDetails.time}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-sm flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-amber-700 uppercase">Meeting Link</p>
                      <a href={app.interviewDetails.link} target="_blank" className="text-sm font-bold text-blue-600 hover:underline line-clamp-1">{app.interviewDetails.link}</a>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 border-t border-gray-100 p-4 px-6 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedJob(app)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  View Job Details
                </button>
                {app.status === 'applied' && (
                  <button className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200">
                    Withdraw Application
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Job Description Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-md overflow-hidden p-2">
                    {selectedJob.logo.includes('/') ? <img src={selectedJob.logo} alt={selectedJob.company} className="w-full h-full object-contain" /> : <span className="font-black text-3xl text-blue-600">{selectedJob.logo}</span>}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{selectedJob.role}</h2>
                    <p className="text-gray-600 font-bold text-lg">{selectedJob.company}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-700 transition-colors"><XCircle size={24} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                    <FileText className="text-blue-600" size={18} /> Job Description
                  </h3>
                  <div className="text-sm text-gray-600 space-y-4 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p>We are looking for passionate problem solvers to join our engineering teams. You will work on massive distributed systems, write scalable code, and collaborate with industry-leading experts.</p>
                    <p><strong>Responsibilities:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Design and develop high-performance software applications.</li>
                      <li>Write clean, maintainable, and testable code.</li>
                      <li>Participate in code reviews and architectural discussions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
