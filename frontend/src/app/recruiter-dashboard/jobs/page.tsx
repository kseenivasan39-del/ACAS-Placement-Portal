"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, Briefcase, IndianRupee, Users, 
  MapPin, CheckCircle2, AlertCircle, Plus, X 
} from "lucide-react";

type JobPost = {
  id: string;
  title: string;
  ctc: string;
  location: string;
  status: 'active' | 'pending' | 'closed';
  applications: number;
  deadline: string;
};

export default function RecruiterJobsPage() {
  const [showNewDriveModal, setShowNewDriveModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [jobs, setJobs] = useState<JobPost[]>([
    {
      id: "JOB-001",
      title: "Frontend Software Engineer",
      ctc: "18.0 LPA",
      location: "Bangalore / Remote",
      status: "active",
      applications: 420,
      deadline: "Tomorrow"
    },
    {
      id: "JOB-002",
      title: "Data Scientist",
      ctc: "22.0 LPA",
      location: "Hyderabad",
      status: "active",
      applications: 156,
      deadline: "In 3 Days"
    },
    {
      id: "JOB-003",
      title: "Product Manager (Associate)",
      ctc: "24.0 LPA",
      location: "Bangalore",
      status: "pending",
      applications: 0,
      deadline: "Awaiting Admin Approval"
    },
    {
      id: "JOB-004",
      title: "Backend Engineer",
      ctc: "18.0 LPA",
      location: "Remote",
      status: "closed",
      applications: 890,
      deadline: "Passed"
    }
  ]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowNewDriveModal(false);
      setJobs([{
        id: `JOB-00${jobs.length + 1}`,
        title: "Newly Requested Role",
        ctc: "TBD",
        location: "TBD",
        status: "pending",
        applications: 0,
        deadline: "Awaiting Admin Approval"
      }, ...jobs]);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings & Drives</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your active recruitment drives or request a new one.</p>
        </div>
        
        <button 
          onClick={() => setShowNewDriveModal(true)}
          className="flex items-center gap-2 bg-[#293d6b] hover:bg-blue-900 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} /> Request New Drive
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {jobs.map((job) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  {job.status === 'active' && <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded border border-green-200 uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12}/> Live</span>}
                  {job.status === 'pending' && <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded border border-amber-200 uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12}/> Pending Approval</span>}
                  {job.status === 'closed' && <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-1 rounded border border-gray-200 uppercase tracking-wider">Closed</span>}
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-semibold text-gray-500">
                    <span className="flex items-center gap-1"><IndianRupee size={14} className="text-gray-400" /> {job.ctc}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> {job.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Applications</p>
                  <p className="text-lg font-black text-gray-900 flex items-center gap-1">
                    <Users size={16} className="text-blue-500" /> {job.applications}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Deadline</p>
                  <p className="text-sm font-bold text-gray-800">{job.deadline}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Request New Drive Modal */}
      <AnimatePresence>
        {showNewDriveModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowNewDriveModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Building className="text-blue-600" size={24} /> Request New Placement Drive
                </h2>
                <button onClick={() => setShowNewDriveModal(false)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={24} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-4 rounded-lg flex gap-3 mb-6">
                  <AlertCircle size={20} className="shrink-0 text-amber-600" />
                  <p><strong>Note:</strong> Submitted drives will not be visible to students until approved by the college Placement Office.</p>
                </div>

                <form id="newDriveForm" onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Role / Designation</label>
                      <input required type="text" placeholder="e.g. SDE-1" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">CTC (in LPA)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input required type="number" placeholder="15.0" className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Application Deadline</label>
                      <input required type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Eligibility Criteria (Min CGPA, Branches)</label>
                      <input required type="text" placeholder="e.g. 8.0+ CGPA, CSE and IT only" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Job Description</label>
                      <textarea required rows={5} placeholder="Describe the responsibilities, interview rounds..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none"></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={() => setShowNewDriveModal(false)}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold text-sm hover:bg-white transition-colors bg-transparent"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="newDriveForm"
                  disabled={isSubmitting}
                  className="w-[180px] flex justify-center py-2.5 rounded-lg bg-[#293d6b] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-colors disabled:bg-blue-400"
                >
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Submit to Admin"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
