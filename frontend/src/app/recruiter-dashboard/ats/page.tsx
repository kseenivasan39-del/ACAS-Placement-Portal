"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Calendar, ChevronRight, Search, 
  Filter, FileText, X, Mail, Video, Clock, MapPin, Award
} from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  cgpa: string;
  department: string;
  status: 'applied' | 'shortlisted' | 'interviewing' | 'offered';
  matchScore: number;
  skills: string;
  about: string;
  tenthMarks: string;
  twelfthMarks: string;
};

export default function RecruiterATSPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: "C-001", name: "Rahul Sharma", cgpa: "9.2", department: "B.Tech CSE", status: 'applied', matchScore: 95, skills: "React, Node.js, AWS", about: "Full-stack developer with 2 internships.", tenthMarks: "95.0", twelfthMarks: "92.0" },
    { id: "C-002", name: "Priya Patel", cgpa: "8.8", department: "B.Tech IT", status: 'shortlisted', matchScore: 88, skills: "Python, Django, SQL", about: "Backend specialist. Top 10 in college hackathon.", tenthMarks: "92.4", twelfthMarks: "89.6" },
    { id: "C-003", name: "Amit Kumar", cgpa: "8.5", department: "B.Tech CSE", status: 'applied', matchScore: 82, skills: "Java, Spring Boot", about: "Passionate about highly scalable systems.", tenthMarks: "88.0", twelfthMarks: "85.5" },
    { id: "C-004", name: "Sneha Reddy", cgpa: "9.5", department: "B.Tech ECE", status: 'interviewing', matchScore: 98, skills: "C++, Embedded, Python", about: "IoT enthusiast. Published 1 research paper.", tenthMarks: "98.2", twelfthMarks: "96.4" },
  ]);

  const [selectedJob, setSelectedJob] = useState("Frontend Software Engineer");
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [schedulingCandidate, setSchedulingCandidate] = useState<Candidate | null>(null);

  const moveCandidate = (id: string, newStatus: Candidate['status']) => {
    if (newStatus === 'interviewing') {
      const c = candidates.find(cand => cand.id === id);
      if (c) setSchedulingCandidate(c);
      return; // Wait for schedule to complete
    }
    
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
  };

  const confirmSchedule = (id: string) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'interviewing' } : c
    ));
    setSchedulingCandidate(null);
  };

  const columns: { id: Candidate['status'], title: string, color: string }[] = [
    { id: 'applied', title: 'New Applications', color: 'bg-gray-100 border-gray-200' },
    { id: 'shortlisted', title: 'Shortlisted (AI Match)', color: 'bg-blue-50 border-blue-200' },
    { id: 'interviewing', title: 'Interviewing', color: 'bg-amber-50 border-amber-200' },
    { id: 'offered', title: 'Offered', color: 'bg-green-50 border-green-200' }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-600" size={28} /> Applicant Tracking System
          </h1>
          <p className="text-gray-500 text-sm mt-1">Review student profiles, run AI matches, and schedule interviews.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
          <Filter size={16} className="text-gray-500" />
          <select 
            className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option>Frontend Software Engineer</option>
            <option>Data Scientist</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.id} className={`rounded-xl border ${col.color} p-4 flex flex-col min-h-[500px]`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">{col.title}</h3>
              <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                {candidates.filter(c => c.status === col.id).length}
              </span>
            </div>
            
            <div className="flex-1 space-y-3">
              <AnimatePresence>
                {candidates.filter(c => c.status === col.id).map(candidate => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    key={candidate.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setViewingCandidate(candidate)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{candidate.name}</h4>
                      {candidate.matchScore > 90 && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-1.5 py-0.5 rounded border border-blue-200">
                          {candidate.matchScore}% Match
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-500">{candidate.department}</p>
                    <p className="text-xs font-bold text-gray-700 mt-1">CGPA: <span className="text-green-600">{candidate.cgpa}</span></p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                      {col.id === 'applied' && (
                        <button onClick={() => moveCandidate(candidate.id, 'shortlisted')} className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">Shortlist</button>
                      )}
                      {col.id === 'shortlisted' && (
                        <button onClick={() => moveCandidate(candidate.id, 'interviewing')} className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded hover:bg-amber-100 flex items-center gap-1"><Calendar size={10}/> Schedule</button>
                      )}
                      {col.id === 'interviewing' && (
                        <button onClick={() => moveCandidate(candidate.id, 'offered')} className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">Extend Offer</button>
                      )}
                      {col.id !== 'applied' && (
                        <button onClick={() => moveCandidate(candidate.id, 'applied')} className="text-[10px] font-bold text-gray-400 hover:text-gray-600">Reject</button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* View Student Profile Modal */}
      <AnimatePresence>
        {viewingCandidate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setViewingCandidate(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-2xl border-4 border-white shadow-sm">
                    {viewingCandidate.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{viewingCandidate.name}</h2>
                    <p className="text-gray-500 font-semibold">{viewingCandidate.department}</p>
                  </div>
                </div>
                <button onClick={() => setViewingCandidate(null)} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={24} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">Verified CGPA</p>
                    <p className="text-xl md:text-2xl font-black text-green-600">{viewingCandidate.cgpa}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">AI Match Score</p>
                    <p className="text-xl md:text-2xl font-black text-blue-600">{viewingCandidate.matchScore}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">12th Score</p>
                    <p className="text-xl md:text-2xl font-black text-gray-800">{viewingCandidate.twelfthMarks}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">10th Score</p>
                    <p className="text-xl md:text-2xl font-black text-gray-800">{viewingCandidate.tenthMarks}%</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><Award size={18} className="text-blue-500"/> About & Experience</h3>
                  <p className="text-sm text-gray-600 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">{viewingCandidate.about}</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2"><FileText size={18} className="text-blue-500"/> Top Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {viewingCandidate.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold rounded-full">{skill.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline">
                  <FileText size={16} /> Download Verified Resume
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setViewingCandidate(null)} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold text-sm hover:bg-white transition-colors bg-transparent">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Interview Modal */}
      <AnimatePresence>
        {schedulingCandidate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSchedulingCandidate(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#293d6b] to-blue-800 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Calendar size={20} /> Schedule Interview
                </h2>
                <button onClick={() => setSchedulingCandidate(null)} className="text-blue-200 hover:text-white transition-colors"><X size={24} /></button>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Select available time slots for <strong className="text-gray-900">{schedulingCandidate.name}</strong>. They will receive an email to confirm one of the options.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Interview Type</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                      <option>Technical Round 1 (Video)</option>
                      <option>HR Round (Video)</option>
                      <option>On-site Assessment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Time</label>
                    <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meeting Link / Location</label>
                    <div className="relative">
                      <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input type="text" defaultValue="https://meet.google.com/gen-er-ate" className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setSchedulingCandidate(null)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-900">Cancel</button>
                <button 
                  onClick={() => confirmSchedule(schedulingCandidate.id)}
                  className="px-6 py-2 bg-[#293d6b] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-900 flex items-center gap-2"
                >
                  <Mail size={16} /> Send Invite
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
