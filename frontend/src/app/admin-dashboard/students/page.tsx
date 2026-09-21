"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, AlertCircle, Search, Filter,
  CheckCircle2, AlertTriangle, FileText, ChevronRight
} from "lucide-react";

type VerificationRequest = {
  id: string;
  name: string;
  regNo: string;
  department: string;
  oldCgpa: string;
  newCgpa: string;
  proofUrl: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function CGPAVerification() {
  const [requests, setRequests] = useState<VerificationRequest[]>([
    { id: 'REQ-001', name: 'Rahul S', regNo: '26f2300145', department: 'B.Tech CS', oldCgpa: '8.45', newCgpa: '8.85', proofUrl: '#', status: 'pending' },
    { id: 'REQ-002', name: 'Priya M', regNo: '26f2300210', department: 'B.Tech IT', oldCgpa: '7.90', newCgpa: '8.10', proofUrl: '#', status: 'pending' },
    { id: 'REQ-003', name: 'Arjun K', regNo: '26f2300102', department: 'B.Tech CS', oldCgpa: '9.01', newCgpa: '9.20', proofUrl: '#', status: 'pending' },
  ]);

  const [search, setSearch] = useState("");
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  // Sync with Student Dashboard using localStorage
  useEffect(() => {
    const studentStatus = localStorage.getItem('student_cgpa_status');
    const studentCgpa = localStorage.getItem('student_cgpa');
    
    if (studentStatus === 'pending' && studentCgpa) {
      setRequests(prev => prev.map(req => 
        req.regNo === '26f2300145' // Sync with our dummy student Rahul
          ? { ...req, newCgpa: studentCgpa, status: 'pending' }
          : req
      ));
    }
  }, []);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        if (req.regNo === '26f2300145') {
          // Send decision back to student dashboard
          localStorage.setItem('student_cgpa_status', action === 'approved' ? 'verified' : 'rejected');
          if (action === 'approved') {
            localStorage.setItem('student_cgpa_verified_value', req.newCgpa);
          }
        }
        return { ...req, status: action };
      }
      return req;
    }));
  };

  const filteredRequests = requests.filter(req => 
    req.regNo.includes(search) || req.name.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student CGPA Verification</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve academic updates requested by students.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg font-bold text-sm border border-amber-200 shadow-sm">
          <AlertTriangle size={18} />
          {pendingCount} Pending Requests
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Name or Reg No..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap">
          <Filter size={16} /> Filter by Department
        </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs uppercase font-black text-gray-500 tracking-wider">
                <th className="p-4">Student</th>
                <th className="p-4">Department</th>
                <th className="p-4 text-center">CGPA Change</th>
                <th className="p-4">Proof</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredRequests.map((req) => (
                  <motion.tr 
                    key={req.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className={`hover:bg-slate-50 transition-colors ${req.status !== 'pending' ? 'bg-gray-50 opacity-60' : ''}`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{req.name}</div>
                      <div className="text-xs font-semibold text-gray-500">{req.regNo}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {req.department}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-mono text-sm text-gray-500 line-through">{req.oldCgpa}</span>
                        <ChevronRight size={14} className="text-gray-400" />
                        {req.status === 'pending' ? (
                          <input 
                            type="text" 
                            value={req.newCgpa}
                            onChange={(e) => setRequests(prev => prev.map(r => r.id === req.id ? { ...r, newCgpa: e.target.value } : r))}
                            className="font-mono font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-16 text-center"
                          />
                        ) : (
                          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {req.newCgpa}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => setSelectedProof(req.id)}
                        className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1.5 rounded-lg border border-blue-100 hover:border-blue-200 shadow-sm"
                      >
                        <FileText size={14} /> View Official College Proof
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      {req.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleAction(req.id, 'rejected')}
                            className="w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors border border-red-100"
                            title="Reject"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>
                          <button 
                            onClick={() => handleAction(req.id, 'approved')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded bg-green-500 hover:bg-green-600 text-white font-bold text-xs transition-colors shadow-sm shadow-green-500/20"
                          >
                            <Check size={16} strokeWidth={3} /> Approve
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1 text-xs font-bold">
                          {req.status === 'approved' ? (
                            <span className="text-green-600 flex items-center gap-1"><CheckCircle2 size={14}/> Approved</span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1"><AlertCircle size={14}/> Rejected</span>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredRequests.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-semibold">
              No verification requests found.
            </div>
          )}
        </div>
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {selectedProof && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedProof(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-[#293d6b] p-4 text-white flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2"><FileText size={18} /> Official College Transcript</h3>
                <button onClick={() => setSelectedProof(null)} className="text-blue-200 hover:text-white transition-colors"><X size={20} /></button>
              </div>
              
              <div className="p-8 bg-gray-100 flex items-center justify-center overflow-y-auto max-h-[70vh]">
                {/* Simulated Document Preview */}
                <div className="bg-white w-full max-w-[450px] min-h-[550px] shadow-lg border border-gray-200 p-8 flex flex-col items-center relative">
                  <div className="absolute top-8 right-8 w-16 h-16 border-4 border-red-500/20 rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-red-500/30 font-black text-xs">OFFICIAL</span>
                  </div>
                  
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 border-2 border-blue-200 shadow-sm">
                    <span className="font-black text-blue-800 text-xl">AEI</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg border-b-2 border-gray-900 pb-2 mb-8 w-full text-center">ACADEMIC TRANSCRIPT</h4>
                  
                  <div className="w-full space-y-6">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-bold text-gray-500">Student Name:</span>
                      <span className="text-sm font-black text-gray-900">{requests.find(r => r.id === selectedProof)?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-bold text-gray-500">Registration No:</span>
                      <span className="text-sm font-black text-gray-900">{requests.find(r => r.id === selectedProof)?.regNo}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm font-bold text-gray-500">Department:</span>
                      <span className="text-sm font-black text-gray-900">{requests.find(r => r.id === selectedProof)?.department}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2 bg-blue-50/50 p-2 rounded">
                      <span className="text-sm font-bold text-blue-800">Verified CGPA:</span>
                      <span className="text-sm font-black text-blue-700">{requests.find(r => r.id === selectedProof)?.newCgpa}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto w-full pt-12 flex justify-between items-end opacity-70">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 mb-1">Issue Date</p>
                      <p className="text-xs font-semibold text-gray-600">28 Oct 2026</p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-8 border-b border-gray-400 mb-2 relative">
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-['cursive'] text-lg text-blue-900/60 transform -rotate-3">Signature</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Registrar Office</p>
                    </div>
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
