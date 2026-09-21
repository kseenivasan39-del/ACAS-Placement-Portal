"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, User, FileText, Briefcase, LogOut } from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 1. Top Bar (Dark Gray/Blue) */}
      <div className="bg-[#384a6c] text-white text-xs py-1.5 px-4 font-semibold tracking-wide border-b-2 border-black/10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="pr-3">Welcome, John Doe (B.Sc Computer Science)</span>
          </div>
          <div className="flex items-center divide-x divide-white/40">
            <Link href="/" className="pr-3 hover:text-gray-300 transition-colors">College Home</Link>
            <Link href="/login" className="pl-3 hover:text-red-300 transition-colors flex items-center gap-1">
              <LogOut size={12} /> Logout
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Header (White) */}
      <header className="bg-white py-4 px-4 border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center gap-6">
          <img src="/logo.png" alt="Aditanar College Logo" className="w-16 h-16 object-contain" />
          <div>
            <h1 className="text-[#293d6b] text-xl md:text-2xl font-bold mb-1" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              Aditanar College of Arts & Science
            </h1>
            <p className="text-[#1a2b54] font-bold text-sm">Placement Portal - Student Dashboard</p>
          </div>
        </div>
      </header>

      {/* 3. Main Dashboard Layout */}
      <main className="max-w-[1400px] mx-auto w-full px-4 py-8 flex-grow flex flex-col md:flex-row gap-6">
        
        {/* Traditional Sidebar Menu */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-[#293d6b] text-white p-3 font-bold text-sm">
              STUDENT MENU
            </div>
            <ul className="divide-y divide-gray-200 text-sm font-semibold text-gray-700">
              <li className="p-3 hover:bg-gray-50 hover:text-blue-800 cursor-pointer flex items-center gap-2 bg-blue-50 border-l-4 border-[#293d6b]">
                <LayoutDashboard size={16} /> Overview
              </li>
              <li className="p-3 hover:bg-gray-50 hover:text-blue-800 cursor-pointer flex items-center gap-2">
                <User size={16} /> My Profile
              </li>
              <li className="p-3 hover:bg-gray-50 hover:text-blue-800 cursor-pointer flex items-center gap-2">
                <FileText size={16} /> Resume Builder
              </li>
              <li className="p-3 hover:bg-gray-50 hover:text-blue-800 cursor-pointer flex items-center gap-2">
                <Briefcase size={16} /> My Applications
              </li>
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {/* Status Box */}
          <div className="bg-white border border-blue-200 rounded p-4 mb-6 shadow-sm border-t-4 border-t-[#293d6b]">
            <h3 className="font-bold text-[#293d6b] border-b border-gray-200 pb-2 mb-3">PLACEMENT STATUS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="text-2xl font-bold text-[#293d6b]">3</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Applied</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="text-2xl font-bold text-[#293d6b]">1</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Interviews</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="text-2xl font-bold text-[#293d6b]">0</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Offers</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-200 rounded">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Profile</p>
              </div>
            </div>
          </div>

          {/* Traditional Data Table */}
          <div className="bg-white border border-gray-200 rounded overflow-hidden shadow-sm">
            <div className="bg-[#293d6b] text-white p-3 font-bold text-sm flex justify-between items-center">
              <span>UPCOMING PLACEMENT DRIVES</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-bold">
                  <tr>
                    <th className="p-3 border-r border-gray-200">Company Name</th>
                    <th className="p-3 border-r border-gray-200">Role Profile</th>
                    <th className="p-3 border-r border-gray-200">Drive Date</th>
                    <th className="p-3 border-r border-gray-200">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border-r border-gray-200 font-bold text-[#293d6b]">TCS (Tata Consultancy Services)</td>
                    <td className="p-3 border-r border-gray-200 text-gray-700">Ninja / Digital</td>
                    <td className="p-3 border-r border-gray-200 text-gray-700">15-Aug-2026</td>
                    <td className="p-3 border-r border-gray-200"><span className="text-green-600 font-bold">Registration Open</span></td>
                    <td className="p-3 text-center">
                      <button className="bg-[#293d6b] text-white px-3 py-1 text-xs font-bold rounded hover:bg-blue-900">Apply</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 border-r border-gray-200 font-bold text-[#293d6b]">Infosys</td>
                    <td className="p-3 border-r border-gray-200 text-gray-700">Systems Engineer</td>
                    <td className="p-3 border-r border-gray-200 text-gray-700">22-Aug-2026</td>
                    <td className="p-3 border-r border-gray-200"><span className="text-green-600 font-bold">Registration Open</span></td>
                    <td className="p-3 text-center">
                      <button className="bg-[#293d6b] text-white px-3 py-1 text-xs font-bold rounded hover:bg-blue-900">Apply</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a2b54] text-white py-6 border-t-4 border-red-600 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 text-center text-sm">
          <p className="font-bold mb-1">Aditanar College of Arts & Science - Placement Cell</p>
          <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
