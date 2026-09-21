"use client";

import { FileText, BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Placement Reports & Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Detailed analytics and system activity logs.</p>
        </div>
      </div>
      
      <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
        <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100">
          <BarChart3 className="text-purple-600" size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Analytics Engine Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          We are currently building the comprehensive reporting dashboard. This is where you will be able to export placement statistics, view full system activity logs, and track year-over-year growth.
        </p>
      </div>
    </div>
  );
}
