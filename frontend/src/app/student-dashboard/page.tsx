"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, CheckCircle2, Clock, XCircle, ChevronRight, 
  MapPin, DollarSign, Building, AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboardOverview() {
  const stats = [
    { label: "Current CGPA", value: "8.45", icon: <CheckCircle2 className="text-green-500" />, change: "Verified by Placement Cell" },
    { label: "Jobs Applied", value: "12", icon: <Briefcase className="text-blue-500" />, change: "3 awaiting review" },
    { label: "Interviews", value: "2", icon: <Clock className="text-amber-500" />, change: "1 scheduled this week" },
    { label: "Offers", value: "0", icon: <Building className="text-purple-500" />, change: "Keep pushing!" },
  ];

  const recentJobs = [
    { title: "Software Development Engineer", company: "Amazon", logo: "/logos/Amazon-logo-meaning.jpg", location: "Chennai", salary: "12 LPA", deadline: "Oct 15", tags: ["SDE", "Java"] },
    { title: "Frontend Developer", company: "Zoho", logo: "/logos/Zoho.jpg", location: "Coimbatore", salary: "8 LPA", deadline: "Oct 20", tags: ["React", "UI"] },
    { title: "Systems Engineer", company: "TCS", logo: "/logos/tcs.png", location: "Pan India", salary: "4.5 LPA", deadline: "Oct 25", tags: ["IT", "Support"] },
  ];

  const applications = [
    { company: "Cognizant", role: "Programmer Analyst", status: "interview", date: "Applied 2 weeks ago" },
    { company: "Wipro", role: "Project Engineer", status: "shortlisted", date: "Applied 3 weeks ago" },
    { company: "Infosys", role: "Systems Engineer", status: "applied", date: "Applied yesterday" },
    { company: "Tech Mahindra", role: "Software Engineer", status: "rejected", date: "Applied 1 month ago" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'interview': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'shortlisted': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'applied': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Student!</h1>
          <p className="text-gray-500 text-sm mt-1">Here is what's happening with your placement journey.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <AlertCircle size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900">Resume Action Required</p>
            <p className="text-xs text-blue-700">Update your LinkedIn URL in your profile.</p>
          </div>
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
              <p className={`text-xs mt-2 font-medium ${stat.label === 'Current CGPA' ? 'text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded border border-blue-100' : 'text-gray-400'}`}>
                {stat.change}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs - Takes up 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-bold text-gray-900">Recommended Jobs</h2>
            <Link href="/student-dashboard/jobs" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentJobs.map((job, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center font-bold text-gray-400 text-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors overflow-hidden border border-gray-100 p-1">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain rounded" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = job.company.charAt(0); }} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    Ends {job.deadline}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-4">{job.company}</p>
                
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                </div>

                <div className="flex gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Tracker - Takes up 1 column */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-bold text-gray-900">Application Status</h2>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="space-y-6">
              {applications.map((app, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== applications.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-gray-100"></div>
                  )}
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 z-10 border border-white">
                    {app.status === 'interview' ? <Clock size={14} className="text-amber-500" /> :
                     app.status === 'rejected' ? <XCircle size={14} className="text-red-500" /> :
                     <CheckCircle2 size={14} className={app.status === 'shortlisted' ? "text-blue-500" : "text-gray-400"} />}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-gray-900">{app.company}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600">{app.role}</p>
                    <p className="text-xs text-gray-400 mt-1">{app.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/student-dashboard/applications" className="block text-center w-full mt-6 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-bold text-gray-600 rounded-lg transition-colors border border-gray-200">
              View All Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
