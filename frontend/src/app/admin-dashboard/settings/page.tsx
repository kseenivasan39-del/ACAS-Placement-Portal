"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Bell, Save, Mail, Key } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      router.push("/admin-dashboard");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account preferences and security.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#293d6b] hover:bg-[#1a2b54] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "profile" 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <User size={18} />
            Profile Details
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "security" 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Shield size={18} />
            Security
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "notifications" 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Bell size={18} />
            Notifications
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-500">Update your account's personal details.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full border-2 border-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700">
                    R
                  </div>
                  <button className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100">
                    Change Avatar
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue="Rakesh Jha" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 text-sm font-medium cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role / Designation</label>
                    <input type="text" defaultValue="Placement Officer" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 text-sm font-medium cursor-not-allowed" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      <input type="email" defaultValue="placement@aei.edu.in" disabled className="w-full pl-9 pr-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 text-sm font-medium cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
                <p className="text-sm text-gray-500">Manage your password and authentication methods.</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-medium text-gray-900" />
                  </div>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      <input type="password" placeholder="Enter new password" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-medium text-gray-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 text-gray-400" size={16} />
                      <input type="password" placeholder="Confirm new password" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-medium text-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Choose what updates you want to receive.</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">Email Alerts</p>
                    <p className="text-xs text-gray-500 mt-1">Receive daily summaries of pending approvals.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">New Drive Requests</p>
                    <p className="text-xs text-gray-500 mt-1">Get instant notifications when a company requests a drive.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">SMS Notifications</p>
                    <p className="text-xs text-gray-500 mt-1">Receive text messages for urgent system alerts.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
