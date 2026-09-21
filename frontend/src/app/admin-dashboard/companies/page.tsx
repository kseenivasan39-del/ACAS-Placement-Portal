"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, Search, Filter,
  CheckCircle2, AlertCircle, Building2, User, Mail, Briefcase, Calendar
} from "lucide-react";

type RecruiterRegistration = {
  id: string;
  companyName: string;
  fullName: string;
  jobTitle: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  logo?: string;
};

export default function CompanyApprovals() {
  const [registrations, setRegistrations] = useState<RecruiterRegistration[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Load from localStorage on mount
  useEffect(() => {
    const existing = localStorage.getItem('pending_company_registrations');
    let data: RecruiterRegistration[] = existing ? JSON.parse(existing) : [];
    
    // Seed mock data for demonstration if they don't exist
    if (!data.some(d => d.companyName === 'Cognizant')) {
      data.push({ id: 'REG-1001', companyName: 'Cognizant', fullName: 'Priya Sharma', jobTitle: 'Talent Acquisition Head', email: 'priya.s@cognizant.com', status: 'pending', date: new Date().toLocaleDateString() });
    }
    if (!data.some(d => d.companyName === 'Wipro')) {
      data.push({ id: 'REG-1002', companyName: 'Wipro', fullName: 'Arun Kumar', jobTitle: 'HR Manager', email: 'arun.k@wipro.com', status: 'approved', date: new Date(Date.now() - 86400000).toLocaleDateString(), logo: '/logos/Wipro-logo.png' });
    }
    if (!data.some(d => d.companyName === 'Infosys')) {
      data.push({ id: 'REG-1003', companyName: 'Infosys', fullName: 'Rahul Dev', jobTitle: 'University Recruiting', email: 'rahul.d@infosys.com', status: 'pending', date: new Date().toLocaleDateString() });
    }

    // Force Wipro logo update if it was seeded previously without a logo
    data = data.map(d => d.companyName === 'Wipro' && !d.logo ? { ...d, logo: '/logos/Wipro-logo.png' } : d);
    // Force VDART logo update for any VDART entries
    data = data.map(d => d.companyName.toUpperCase() === 'VDART' && !d.logo ? { ...d, logo: '/logos/vdart.png' } : d);
    // Force Cognizant logo update for any Cognizant entries
    data = data.map(d => d.companyName === 'Cognizant' && !d.logo ? { ...d, logo: '/logos/Cognizant-Logo-2018.png' } : d);
    // Force Infosys logo update for any Infosys entries
    data = data.map(d => d.companyName === 'Infosys' && !d.logo ? { ...d, logo: '/logos/infosysjpg.jpg' } : d);

    setRegistrations(data);
    localStorage.setItem('pending_company_registrations', JSON.stringify(data));
  }, []);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    const updated = registrations.map(req => 
      req.id === id ? { ...req, status: action } : req
    );
    setRegistrations(updated);
    localStorage.setItem('pending_company_registrations', JSON.stringify(updated));
  };

  const filteredRegistrations = registrations.filter(req => 
    (req.companyName.toLowerCase().includes(search.toLowerCase()) || 
     req.fullName.toLowerCase().includes(search.toLowerCase()) ||
     req.email.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'all' || req.status === statusFilter)
  );

  const pendingCount = registrations.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Approvals</h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage incoming recruiter registration requests.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm border border-blue-200 shadow-sm">
          <Building2 size={18} />
          {pendingCount} Pending Approvals
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Company, Name, or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full md:w-auto">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Status:</span>
            <select 
              className="bg-transparent text-sm font-bold text-blue-600 focus:outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs uppercase font-black text-gray-500 tracking-wider">
                <th className="p-4">Company details</th>
                <th className="p-4">Applicant (HR)</th>
                <th className="p-4">Contact</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredRegistrations.map((req) => (
                  <motion.tr 
                    key={req.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`hover:bg-slate-50 transition-colors ${req.status !== 'pending' ? 'bg-gray-50 opacity-60' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shrink-0 overflow-hidden">
                          {req.logo ? (
                            <img src={req.logo} alt={req.companyName} className="w-full h-full object-cover bg-white" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = req.companyName.charAt(0); }} />
                          ) : (
                            req.companyName.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-base">{req.companyName}</div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 mt-0.5">
                            <Calendar size={12}/> Applied on {req.date}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400"/>
                        <div className="font-bold text-gray-800">{req.fullName}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase size={14} className="text-gray-400"/>
                        <div className="text-xs font-bold text-blue-600">{req.jobTitle}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400"/>
                        <div className="text-sm font-semibold text-gray-600">{req.email}</div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {req.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleAction(req.id, 'rejected')}
                            className="px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            <X size={14} strokeWidth={3} /> Reject
                          </button>
                          <button 
                            onClick={() => handleAction(req.id, 'approved')}
                            className="px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1"
                          >
                            <Check size={14} strokeWidth={3} /> Approve
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1 text-xs font-bold">
                          {req.status === 'approved' ? (
                            <span className="text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-200"><CheckCircle2 size={14}/> Approved</span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1 bg-red-50 px-2 py-1 rounded border border-red-200"><AlertCircle size={14}/> Rejected</span>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredRegistrations.length === 0 && (
            <div className="p-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Building2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Registrations Found</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                There are no recruiter registrations matching your current filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
