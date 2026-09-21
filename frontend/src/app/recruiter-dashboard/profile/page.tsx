"use client";

import { useState } from "react";
import { Building, Upload, Globe, Users, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CompanyProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Update your organization's details. This information will be visible to students applying to your drives.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Image Area */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-bold backdrop-blur-md transition-colors flex items-center gap-2 border border-white/30">
            <Upload size={16} /> Update Cover
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 sm:p-8 pt-0 relative">
          {/* Logo Upload */}
          <div className="flex justify-between items-end mb-8 relative -top-10">
            <div className="flex items-end gap-5">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 bg-white rounded-xl border-4 border-white shadow-md flex items-center justify-center p-2 overflow-hidden">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google Logo" className="w-full h-full object-contain" />
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="text-white" size={24} />
                </div>
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-black text-gray-900">Google India</h2>
                <p className="text-blue-600 font-bold text-sm">Verified Partner</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Building size={16} className="text-gray-400" /> Company Name
              </label>
              <input 
                type="text" 
                defaultValue="Google India Pvt Ltd" 
                disabled
                className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none cursor-not-allowed" 
              />
              <p className="text-[10px] text-gray-500">Name changes must be requested through the placement office.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Globe size={16} className="text-gray-400" /> Website URL
              </label>
              <input 
                type="url" 
                defaultValue="https://careers.google.com" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Building size={16} className="text-gray-400" /> Industry / Sector
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-shadow bg-white">
                <option>Information Technology</option>
                <option>Finance & FinTech</option>
                <option>Manufacturing</option>
                <option>Consulting</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Users size={16} className="text-gray-400" /> Company Size
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-shadow bg-white">
                <option>10,000+ Employees</option>
                <option>1,000 - 10,000 Employees</option>
                <option>100 - 1,000 Employees</option>
                <option>Startup (1-100 Employees)</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2 mt-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <FileText size={16} className="text-gray-400" /> About the Company
              </label>
              <textarea 
                rows={5}
                defaultValue="Google's mission is to organize the world's information and make it universally accessible and useful. We are looking for bright minds to join our engineering teams in Bangalore and Hyderabad."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-shadow resize-none" 
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
            {saved && (
              <motion.span 
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                className="text-green-600 text-sm font-bold flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Profile Updated Successfully!
              </motion.span>
            )}
            <button 
              type="submit"
              disabled={isSaving}
              className="bg-[#293d6b] hover:bg-blue-900 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors min-w-[140px] flex justify-center"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
