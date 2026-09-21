"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Bell, Shield, AlertTriangle, Save, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentSettings() {
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      router.push('/student-dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your security preferences and notification settings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Security Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Lock className="text-blue-600" size={20} /> Security & Password
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" />
              </div>
              <div className="hidden md:block"></div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" />
              </div>
            </div>
            <div className="pt-2">
              <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Enable Two-Factor Authentication</button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bell className="text-blue-600" size={20} /> Notification Preferences
            </h2>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Email Notifications</h3>
                <p className="text-xs text-gray-500 mt-1">Receive updates about new job drives and application statuses directly in your inbox.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">SMS Alerts</h3>
                <p className="text-xs text-gray-500 mt-1">Get immediate SMS alerts for interview shortlists and urgent placement office messages.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Marketing & Newsletter</h3>
                <p className="text-xs text-gray-500 mt-1">Receive weekly tips on resume building, interview prep, and industry news.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Shield className="text-blue-600" size={20} /> Privacy & Visibility
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Profile Visibility</h3>
                <p className="text-xs text-gray-500 mt-1">Allow approved recruiters to view your full profile and contact you directly.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end pt-4">
          
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {saved && (
                <motion.span 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-bold text-green-600 flex items-center gap-1"
                >
                  <CheckCircle2 size={16} /> Settings saved!
                </motion.span>
              )}
            </AnimatePresence>
            <button type="submit" className="bg-[#293d6b] hover:bg-blue-900 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-all flex items-center gap-2">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
