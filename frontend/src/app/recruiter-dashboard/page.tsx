"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, FileText, CheckCircle2, ChevronRight, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function RecruiterDashboardOverview() {
  const stats = [
    { label: "Active Job Postings", value: "3", icon: <Briefcase className="text-blue-500" />, change: "+1 this week" },
    { label: "Total Applications", value: "1,420", icon: <Users className="text-purple-500" />, change: "Top 10% Match: 142" },
    { label: "Pending Interviews", value: "45", icon: <FileText className="text-amber-500" />, change: "Starting next Monday" },
    { label: "Offers Extended", value: "12", icon: <CheckCircle2 className="text-green-500" />, change: "4 accepted" },
  ];

  const recentActivity = [
    { type: 'admin', message: "Placement Office APPROVED your SDE-1 drive request.", time: "10 mins ago", highlight: true, href: "/recruiter-dashboard/jobs" },
    { type: 'ats', message: "45 new students applied to Frontend Developer role.", time: "1 hour ago", highlight: false, href: "/recruiter-dashboard/ats" },
    { type: 'match', message: "AI Engine identified 5 high-match candidates for Data Scientist.", time: "2 hours ago", highlight: true, href: "/recruiter-dashboard/ats" },
    { type: 'admin', message: "Placement Office verified 3 Offer Letters.", time: "5 hours ago", highlight: false, href: "/recruiter-dashboard/offers" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Google HR</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your college recruitment pipeline and track applicants.</p>
        </div>
        
        <Link 
          href="/recruiter-dashboard/jobs"
          className="flex items-center gap-2 bg-[#293d6b] hover:bg-blue-900 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Briefcase size={18} /> Request New Drive
        </Link>
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
              <div className="p-2 bg-slate-50 rounded-lg border border-gray-100">{stat.icon}</div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-bold text-gray-500">{stat.label}</p>
              <p className="text-xs mt-2 font-semibold text-gray-400 flex items-center gap-1">
                <TrendingUp size={12} className="text-green-500"/> {stat.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Recruitment Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/recruiter-dashboard/ats" className="bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Applicant Tracking (ATS)</h3>
              <p className="text-sm text-gray-500 mb-4">Review student applications, run AI matching, and shortlist candidates using the Kanban board.</p>
              <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                Go to ATS <ChevronRight size={16} />
              </span>
            </Link>

            <Link href="/recruiter-dashboard/offers" className="bg-white p-6 rounded-xl border border-green-200 hover:border-green-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Secure Offers</h3>
              <p className="text-sm text-gray-500 mb-4">Upload and verify official offer letters to securely dispatch them to selected candidates.</p>
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                Manage Offers <ChevronRight size={16} />
              </span>
            </Link>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity size={20} className="text-blue-600" /> Hiring Updates
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <Link href={activity.href} key={i} className={`block p-3 rounded-lg border hover:shadow-sm transition-all ${activity.highlight ? 'bg-blue-50 border-blue-200 hover:border-blue-300' : 'bg-gray-50 border-gray-100 hover:border-gray-300'}`}>
                  <p className={`text-sm font-bold ${activity.highlight ? 'text-blue-900' : 'text-gray-700'}`}>
                    {activity.message}
                  </p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">{activity.time}</p>
                </Link>
              ))}
            </div>
            
            <Link href="/recruiter-dashboard/notifications" className="block text-center w-full mt-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-bold text-gray-600 rounded-lg transition-colors border border-gray-200">
              View All Logs
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
