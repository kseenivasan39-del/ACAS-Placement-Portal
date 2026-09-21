"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Upload, CheckCircle2, AlertCircle, 
  Search, Shield, Eye, Download, User
} from "lucide-react";

type Offer = {
  id: string;
  studentName: string;
  role: string;
  ctc: string;
  status: 'pending_admin' | 'verified' | 'accepted';
  dateUploaded: string;
};

export default function SecureOffersPage() {
  const [offers] = useState<Offer[]>([
    {
      id: "OFF-101",
      studentName: "Rahul Sharma",
      role: "SDE-1",
      ctc: "18.0 LPA",
      status: "pending_admin",
      dateUploaded: "Today, 10:30 AM"
    },
    {
      id: "OFF-102",
      studentName: "Priya Patel",
      role: "SDE-1",
      ctc: "18.0 LPA",
      status: "verified",
      dateUploaded: "Yesterday, 2:15 PM"
    },
    {
      id: "OFF-103",
      studentName: "Amit Kumar",
      role: "Data Scientist",
      ctc: "22.0 LPA",
      status: "accepted",
      dateUploaded: "Oct 12, 2023"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="text-green-600" size={28} /> Secure Offer Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Upload official offer letters for admin verification before releasing to students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload New Offer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Select Candidate</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-600 outline-none bg-white">
                  <option>Select from shortlisted...</option>
                  <option>Sneha Reddy (Frontend)</option>
                  <option>Karan Singh (Backend)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Final CTC (in LPA)</label>
                <input type="text" placeholder="e.g. 15.0" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Offer Letter Document (PDF)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-green-400 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-100 transition-colors">
                    <Upload className="text-green-600" size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-700">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF only (Max 5MB)</p>
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-[#293d6b] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-colors flex justify-center items-center gap-2 mt-4">
                <Shield size={16} /> Submit for Verification
              </button>
              
              <div className="bg-amber-50 p-3 rounded-lg flex gap-2 items-start border border-amber-200">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <p className="text-[11px] text-amber-800 leading-tight">
                  Uploaded documents are cryptographically hashed. The placement office must verify the hash before the student is notified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Offers List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Recent Dispatches</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search offers..." 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 bg-white w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-bold">Candidate</th>
                    <th className="p-4 font-bold">Role & CTC</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {offers.map((offer) => (
                    <motion.tr 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      key={offer.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                            {offer.studentName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{offer.studentName}</p>
                            <p className="text-[10px] text-gray-500">{offer.dateUploaded}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-gray-800">{offer.role}</p>
                        <p className="text-xs text-gray-500">{offer.ctc}</p>
                      </td>
                      <td className="p-4">
                        {offer.status === 'pending_admin' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                            <AlertCircle size={12} /> Pending Admin
                          </span>
                        )}
                        {offer.status === 'verified' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                            <Shield size={12} /> Verified, Awaiting Student
                          </span>
                        )}
                        {offer.status === 'accepted' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle2 size={12} /> Accepted by Student
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Student Profile">
                            <User size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" title="View Document">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Download Original">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
