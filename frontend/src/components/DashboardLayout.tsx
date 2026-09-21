"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, User, Briefcase, FileText, Bot, BookOpen, 
  Settings, LogOut, Menu, X, Bell, Search, Building
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'recruiter' | 'admin';
  userName: string;
}

export default function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pendingCompanyCount, setPendingCompanyCount] = useState(0);
  const [hasUnread, setHasUnread] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = e.currentTarget.value.toLowerCase();
      if (val.includes('help') || val.includes('support')) {
        const basePath = role === 'student' ? '/student-dashboard' : role === 'recruiter' ? '/recruiter-dashboard' : '/admin-dashboard';
        router.push(`${basePath}/support`);
      }
    }
  };

  useEffect(() => {
    if (role === 'admin' || role === 'Placement Officer' || role === 'staff') {
      const existing = localStorage.getItem('pending_company_registrations');
      if (existing) {
        try {
          const data = JSON.parse(existing);
          const count = data.filter((d: any) => d.status === 'pending').length;
          setPendingCompanyCount(count);
        } catch (e) {}
      }
    }
  }, [role, notificationsOpen]);

  const studentLinks: SidebarItem[] = [
    { name: "Overview", href: "/student-dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Profile", href: "/student-dashboard/profile", icon: <User size={20} /> },
    { name: "Job Board", href: "/student-dashboard/jobs", icon: <Briefcase size={20} /> },
    { name: "My Applications", href: "/student-dashboard/applications", icon: <FileText size={20} /> },
    { name: "Resume AI", href: "/student-dashboard/resume-ai", icon: <Bot size={20} /> },
    { name: "Interview Prep", href: "/student-dashboard/interview-prep", icon: <BookOpen size={20} /> },
  ];

  const recruiterLinks: SidebarItem[] = [
    { name: "Overview", href: "/recruiter-dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Company Profile", href: "/recruiter-dashboard/profile", icon: <User size={20} /> },
    { name: "Job Postings", href: "/recruiter-dashboard/jobs", icon: <Briefcase size={20} /> },
    { name: "Applicant Tracking", href: "/recruiter-dashboard/ats", icon: <FileText size={20} /> },
  ];

  const adminLinks: SidebarItem[] = [
    { name: "Analytics", href: "/admin-dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Student Verification", href: "/admin-dashboard/students", icon: <User size={20} /> },
    { name: "Company Approvals", href: "/admin-dashboard/companies", icon: <Briefcase size={20} /> },
    { name: "Manage Drives", href: "/admin-dashboard/drives", icon: <FileText size={20} /> },
    { name: "Technical Banks", href: "/admin-dashboard/technical-banks", icon: <BookOpen size={20} /> },
    { name: "Company Patterns", href: "/admin-dashboard/company-patterns", icon: <Building size={20} /> },
  ];

  const links = role === 'student' ? studentLinks : role === 'recruiter' ? recruiterLinks : adminLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#293d6b] text-white z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 bg-white rounded-full p-1" />
              <span className="font-bold text-lg font-serif tracking-wide">CareerConnect</span>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={20} className="text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4 px-3">
              Menu
            </div>
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600/50 text-white font-semibold' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className={isActive ? 'text-white' : 'text-gray-400'}>{link.icon}</div>
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-300 hover:bg-white/5 transition-colors">
              <LogOut size={20} />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex relative items-center bg-slate-100 px-3 py-1.5 rounded-md border border-gray-200">
              <Search size={16} className="text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                onKeyDown={handleSearch}
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-48 text-gray-700 placeholder-gray-400"
              />
              
              {/* Search Suggestions Dropdown */}
              {(searchQuery.toLowerCase().includes('help') || searchQuery.toLowerCase().includes('support')) && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <button 
                    onClick={() => {
                      const basePath = role === 'student' ? '/student-dashboard' : role === 'recruiter' ? '/recruiter-dashboard' : '/admin-dashboard';
                      router.push(`${basePath}/support`);
                      setSearchQuery("");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-3 transition-colors border-l-2 border-transparent hover:border-blue-600 group"
                  >
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Search size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Help & Support</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Contact Placement Office</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <button 
              className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={20} />
              {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
            </button>

            {notificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setNotificationsOpen(false)}
                ></div>
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                    <button onClick={() => setHasUnread(false)} className="text-xs text-blue-600 font-semibold hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    
                    {/* SYSTEM NOTIFICATIONS (All Roles) */}
                    <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-blue-50/20' : ''}`}>
                      {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>}
                      <p className="text-sm text-gray-800 font-bold mb-1">Scheduled Maintenance</p>
                      <p className="text-xs text-gray-500 leading-tight">System will undergo maintenance on Sunday from 6 PM to 11:55 PM.</p>
                      <p className="text-[10px] text-purple-600 font-bold mt-2">Just now</p>
                    </div>

                    {/* STUDENT NOTIFICATIONS */}
                    {role === 'student' && (
                      <>
                        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-blue-50/20' : ''}`}>
                          {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                          <p className="text-sm text-gray-800 font-bold mb-1">New Drive Posted</p>
                          <p className="text-xs text-gray-500 leading-tight">Google has posted a new SDE drive. Eligibility: 9.0 CGPA.</p>
                          <p className="text-[10px] text-blue-600 font-bold mt-2">2 hours ago</p>
                        </div>
                        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-blue-50/20' : ''}`}>
                          {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                          <p className="text-sm text-gray-800 font-bold mb-1">CGPA Verification Approved</p>
                          <p className="text-xs text-gray-500 leading-tight">Your recent CGPA update request has been approved by the placement office.</p>
                          <p className="text-[10px] text-blue-600 font-bold mt-2">1 day ago</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                          <p className="text-sm text-gray-800 font-semibold mb-1">Interview Shortlist</p>
                          <p className="text-xs text-gray-500 leading-tight">You have been shortlisted for the Zoho second round. Please check your email.</p>
                          <p className="text-[10px] text-gray-400 font-bold mt-2">3 days ago</p>
                        </div>
                      </>
                    )}

                    {/* ADMIN NOTIFICATIONS */}
                    {(role === 'admin' || role === 'Placement Officer' || role === 'staff') && (
                      <>
                        {pendingCompanyCount > 0 && (
                          <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-blue-50/20' : ''}`}>
                            {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                            <p className="text-sm text-gray-800 font-bold mb-1">New Recruiter Registrations</p>
                            <p className="text-xs text-gray-500 leading-tight">You have {pendingCompanyCount} new company registration requests pending approval.</p>
                            <p className="text-[10px] text-blue-600 font-bold mt-2">Just now</p>
                          </div>
                        )}
                        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-amber-50/20' : ''}`}>
                          {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>}
                          <p className="text-sm text-gray-800 font-bold mb-1">New Drive Request</p>
                          <p className="text-xs text-gray-500 leading-tight">Google HR has requested to post a new SDE-1 placement drive.</p>
                          <p className="text-[10px] text-amber-600 font-bold mt-2">10 mins ago</p>
                        </div>
                        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-amber-50/20' : ''}`}>
                          {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>}
                          <p className="text-sm text-gray-800 font-bold mb-1">Pending Verifications</p>
                          <p className="text-xs text-gray-500 leading-tight">You have 45 new student CGPA verification requests pending review.</p>
                          <p className="text-[10px] text-amber-600 font-bold mt-2">1 hour ago</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                          <p className="text-sm text-gray-800 font-semibold mb-1">Offer Letter Uploaded</p>
                          <p className="text-xs text-gray-500 leading-tight">Microsoft has uploaded 8 new offer letters requiring signature.</p>
                          <p className="text-[10px] text-gray-400 font-bold mt-2">5 hours ago</p>
                        </div>
                      </>
                    )}

                    {/* RECRUITER NOTIFICATIONS */}
                    {role === 'recruiter' && (
                      <>
                        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-green-50/20' : ''}`}>
                          {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>}
                          <p className="text-sm text-gray-800 font-bold mb-1">Drive Approved</p>
                          <p className="text-xs text-gray-500 leading-tight">The Placement Office has APPROVED your SDE-1 drive request. It is now live.</p>
                          <p className="text-[10px] text-green-600 font-bold mt-2">10 mins ago</p>
                        </div>
                        <div className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative ${hasUnread ? 'bg-blue-50/20' : ''}`}>
                          {hasUnread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
                          <p className="text-sm text-gray-800 font-bold mb-1">New Applications Received</p>
                          <p className="text-xs text-gray-500 leading-tight">15 new students have applied to your Frontend Developer role.</p>
                          <p className="text-[10px] text-blue-600 font-bold mt-2">1 hour ago</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                          <p className="text-sm text-gray-800 font-semibold mb-1">Interview Slot Confirmed</p>
                          <p className="text-xs text-gray-500 leading-tight">Rahul S. has confirmed their technical interview slot for Thursday at 2 PM.</p>
                          <p className="text-[10px] text-gray-400 font-bold mt-2">2 hours ago</p>
                        </div>
                      </>
                    )}

                  </div>
                  <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                    <Link 
                      href={pathname.startsWith('/admin') ? '/admin-dashboard/notifications' : pathname.startsWith('/recruiter') ? '/recruiter-dashboard/notifications' : '/student-dashboard/notifications'} 
                      className="text-xs font-bold text-gray-600 hover:text-gray-900 block w-full py-1"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              </>
            )}

            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            <div className="relative">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-md transition-colors"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{userName}</p>
                  <p className="text-xs text-gray-500 capitalize">{role === 'staff' ? 'Admin' : role}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                  {userName.charAt(0)}
                </div>
              </div>

              {profileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setProfileOpen(false)}
                  ></div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 py-1">
                    {!pathname.startsWith('/admin') && (
                      <Link href={`${pathname.startsWith('/recruiter') ? '/recruiter-dashboard' : '/student-dashboard'}/profile`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">
                        <User size={16} /> My Profile
                      </Link>
                    )}
                    <Link href={`${pathname.startsWith('/admin') ? '/admin-dashboard' : pathname.startsWith('/recruiter') ? '/recruiter-dashboard' : '/student-dashboard'}/settings`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors">
                      <Settings size={16} /> Settings
                    </Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                      <LogOut size={16} /> Logout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
