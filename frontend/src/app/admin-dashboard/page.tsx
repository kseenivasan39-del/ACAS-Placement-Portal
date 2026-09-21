"use client";

import { motion } from "framer-motion";
import { Users, Building, Briefcase, GraduationCap, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardOverview() {
  const stats = [
    { label: "Total Students", value: "1,240", icon: <Users className="text-blue-500" />, change: "98% Registered" },
    { label: "Active Drives", value: "8", icon: <Briefcase className="text-green-500" />, change: "3 closing this week" },
    { label: "Total Offers", value: "450", icon: <GraduationCap className="text-purple-500" />, change: "Avg CTC: 6.5 LPA" },
    { label: "Partner Companies", value: "120", icon: <Building className="text-amber-500" />, change: "+15 this year" },
  ];

  const recentActivity = [
    { type: 'drive', message: "TCS Ninja drive registration is now open.", time: "10 mins ago", href: "/admin-dashboard/companies" },
    { type: 'verify', message: "45 new CGPA verification requests pending.", time: "1 hour ago", highlight: true, href: "/admin-dashboard/students" },
    { type: 'offer', message: "Amazon released 12 offers for SDE role.", time: "2 hours ago", href: "/admin-dashboard/reports" },
    { type: 'drive', message: "Zoho interview shortlists announced.", time: "5 hours ago", href: "/admin-dashboard/companies" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Placement Command Center</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor campus placements and verify student data.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
              <p className="text-xs mt-2 font-medium text-gray-400">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin-dashboard/students" className="bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Verify CGPA Requests</h3>
              <p className="text-sm text-gray-500 mb-4">Review and approve student CGPA updates to ensure data integrity.</p>
              <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                Go to Verification <ChevronRight size={16} />
              </span>
            </Link>

            <Link href="/admin-dashboard/companies" className="bg-white p-6 rounded-xl border border-amber-200 hover:border-amber-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Building size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Post New Drive</h3>
              <p className="text-sm text-gray-500 mb-4">Create a new placement drive and notify eligible students.</p>
              <span className="text-sm font-bold text-amber-600 flex items-center gap-1">
                Manage Drives <ChevronRight size={16} />
              </span>
            </Link>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity size={20} className="text-blue-600" /> Live Activity
            </h2>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <Link href={activity.href} key={i} className={`block p-3 rounded-lg border hover:shadow-sm transition-all ${activity.highlight ? 'bg-blue-50 border-blue-200 hover:border-blue-300' : 'bg-gray-50 border-gray-100 hover:border-gray-300'}`}>
                  <p className={`text-sm font-semibold ${activity.highlight ? 'text-blue-900' : 'text-gray-700'}`}>
                    {activity.message}
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">{activity.time}</p>
                </Link>
              ))}
            </div>
            
            <Link href="/admin-dashboard/reports" className="block text-center w-full mt-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-bold text-gray-600 rounded-lg transition-colors border border-gray-200">
              View All Logs
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
