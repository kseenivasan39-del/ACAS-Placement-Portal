"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock, Calendar, Check, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, type: "drive", title: "New Drive Request", message: "Google HR has requested to post a new SDE-1 placement drive.", time: "10 mins ago", unread: true },
    { id: 2, type: "verify", title: "Pending Verifications", message: "You have 45 new student CGPA verification requests pending review.", time: "1 hour ago", unread: true },
    { id: 3, type: "offer", title: "Offer Letter Uploaded", message: "Microsoft has uploaded 8 new offer letters requiring signature.", time: "5 hours ago", unread: false },
    { id: 4, type: "system", title: "Scheduled Maintenance", message: "System will undergo maintenance on Sunday from 6 PM to 11:55 PM.", time: "Just now", unread: true },
  ]);

  useEffect(() => {
    const existing = localStorage.getItem('pending_company_registrations');
    if (existing) {
      try {
        const data = JSON.parse(existing);
        const pendingCount = data.filter((d: any) => d.status === 'pending').length;
        
        if (pendingCount > 0) {
          setNotifications(prev => [
            { 
              id: 99, 
              type: "company", 
              title: "New Recruiter Registrations", 
              message: `You have ${pendingCount} new company registration requests pending approval.`, 
              time: "Just now", 
              unread: true 
            },
            ...prev
          ]);
        }
      } catch (e) {}
    }
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'company': return <Building2 size={18} className="text-purple-600" />;
      case 'drive': return <Calendar size={18} className="text-amber-600" />;
      case 'verify': return <CheckCircle2 size={18} className="text-blue-600" />;
      case 'offer': return <Check size={18} className="text-green-600" />;
      default: return <Bell size={18} className="text-gray-600" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'company': return 'bg-purple-100 border-purple-200';
      case 'drive': return 'bg-amber-100 border-amber-200';
      case 'verify': return 'bg-blue-100 border-blue-200';
      case 'offer': return 'bg-green-100 border-green-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications Inbox</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all your system alerts and updates.</p>
        </div>
        <button 
          onClick={markAllRead}
          className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
        >
          Mark all as read
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {notifications.map((notif, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={notif.id}
              className={`p-5 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${notif.unread ? 'bg-blue-50/30' : ''}`}
            >
              {notif.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>}
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${getColor(notif.type)}`}>
                {getIcon(notif.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h3>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 whitespace-nowrap">
                      <Clock size={12} /> {notif.time}
                    </div>
                    {notif.unread && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                        className="text-[10px] text-blue-600 font-bold hover:bg-blue-50 transition-colors flex items-center gap-1 bg-white border border-blue-200 px-2 py-1 rounded shadow-sm"
                      >
                        <Check size={12} strokeWidth={3} /> Mark as read
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-2xl">
                  {notif.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
