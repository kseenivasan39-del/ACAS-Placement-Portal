"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Briefcase, IndianRupee, MapPin, 
  Calendar, Building, CheckCircle2, FileText, ChevronRight, X
} from "lucide-react";

type Job = {
  id: string;
  company: string;
  role: string;
  ctc: string;
  location: string;
  deadline: string;
  eligibility: string;
  logo: string;
  applied: boolean;
};

export default function StudentJobBoard() {
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "J-001",
      company: "Google India",
      role: "Software Development Engineer - 1",
      ctc: "18.0 LPA",
      location: "Bangalore / Hyderabad",
      deadline: "2026-08-15",
      eligibility: "9.0+ CGPA, B.Tech CSE/IT",
      logo: "/logos/google.svg",
      applied: false
    },
    {
      id: "J-002",
      company: "Amazon",
      role: "SDE Intern (6 Months)",
      ctc: "80k / month",
      location: "Remote",
      deadline: "2026-08-20",
      eligibility: "8.5+ CGPA, No Active Arrears",
      logo: "/logos/Amazon-logo-meaning.jpg",
      applied: true
    },
    {
      id: "J-003",
      company: "Zoho Corporation",
      role: "Member Technical Staff",
      ctc: "8.5 LPA",
      location: "Chennai",
      deadline: "2026-08-10",
      eligibility: "7.5+ CGPA, All Branches",
      logo: "/logos/Zoho.jpg",
      applied: false
    },
    {
      id: "J-004",
      company: "TCS (Digital)",
      role: "System Engineer",
      ctc: "7.0 LPA",
      location: "Pan India",
      deadline: "2026-09-01",
      eligibility: "7.0+ CGPA",
      logo: "/logos/tcs.png",
      applied: false
    }
  ]);

  const handleApply = (id: string) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, applied: true } : j));
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter(j => 
    j.company.toLowerCase().includes(search.toLowerCase()) || 
    j.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
          <p className="text-gray-500 text-sm mt-1">Explore and apply for open placement drives.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search companies or roles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all overflow-hidden flex flex-col cursor-pointer group"
          >
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm overflow-hidden p-1">
                  {job.logo.includes('/') ? <img src={job.logo} alt={job.company} className="w-full h-full object-contain" /> : <span className="font-black text-xl text-blue-600">{job.logo}</span>}
                </div>
                {job.applied ? (
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded border border-green-200 flex items-center gap-1 uppercase">
                    <CheckCircle2 size={12}/> Applied
                  </span>
                ) : (
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded border border-blue-200 uppercase">
                    New Drive
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{job.role}</h3>
                <p className="text-sm font-bold text-gray-500">{job.company}</p>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 mt-4 text-sm font-semibold text-gray-600">
                  <span className="flex items-center gap-1"><IndianRupee size={14} className="text-gray-400" /> {job.ctc}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {job.location}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto group-hover:bg-blue-50 transition-colors">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Deadline</p>
                <p className="text-xs font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                  <Calendar size={12} className="text-blue-500" /> {job.deadline}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-20">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">No drives found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search criteria.</p>
        </div>
      )}

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
                <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={24} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Package</p>
                    <p className="text-sm font-black text-gray-900">{selectedJob.ctc}</p>
                  </div>
                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Location</p>
                    <p className="text-sm font-black text-gray-900">{selectedJob.location}</p>
                  </div>
                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Deadline</p>
                    <p className="text-sm font-black text-gray-900">{selectedJob.deadline}</p>
                  </div>
                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-lg text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Eligibility</p>
                    <p className="text-sm font-black text-gray-900 line-clamp-1" title={selectedJob.eligibility}>{selectedJob.eligibility}</p>
                  </div>
                </div>

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
                    <p><strong>Selection Process:</strong></p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Online Coding Assessment (Aptitude + DS & Algo)</li>
                      <li>Technical Interview 1</li>
                      <li>Technical Interview 2</li>
                      <li>HR Discussion</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <p className="text-xs text-gray-500 font-medium">By applying, you agree to share your profile and verified resume with {selectedJob.company}.</p>
                {selectedJob.applied ? (
                  <button disabled className="px-6 py-2.5 rounded-lg bg-green-100 text-green-700 font-bold text-sm flex items-center gap-2 border border-green-200 cursor-not-allowed">
                    <CheckCircle2 size={18} /> Application Submitted
                  </button>
                ) : (
                  <button 
                    onClick={() => handleApply(selectedJob.id)}
                    className="px-8 py-2.5 rounded-lg bg-[#293d6b] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
