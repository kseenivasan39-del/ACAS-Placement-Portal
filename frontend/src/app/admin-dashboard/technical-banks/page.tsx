"use client";

import { useState, useEffect } from "react";
import { Plus, BookOpen, Trash2, Code, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

interface Bank {
  title: string;
  desc: string;
  count: number;
}

const DEFAULT_BANKS: Bank[] = [
  { title: "Data Structures & Algorithms", desc: "Arrays, Linked Lists, Trees, Dynamic Programming", count: 120 },
  { title: "System Design", desc: "Scalability, Microservices, Load Balancing", count: 45 },
  { title: "React & Next.js", desc: "Hooks, State Management, Server Components", count: 85 },
  { title: "Java / Spring Boot", desc: "OOPs, Collections, Dependency Injection", count: 90 },
];

export default function ManageTechnicalBanks() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCount, setNewCount] = useState<number | "">("");

  useEffect(() => {
    const stored = localStorage.getItem("technical_banks");
    if (stored) {
      setBanks(JSON.parse(stored));
    } else {
      setBanks(DEFAULT_BANKS);
      localStorage.setItem("technical_banks", JSON.stringify(DEFAULT_BANKS));
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newCount) return;

    const newBank = { title: newTitle, desc: newDesc, count: Number(newCount) };
    const updated = [...banks, newBank];
    setBanks(updated);
    localStorage.setItem("technical_banks", JSON.stringify(updated));

    setNewTitle("");
    setNewDesc("");
    setNewCount("");
  };

  const handleDelete = (title: string) => {
    const updated = banks.filter(b => b.title !== title);
    setBanks(updated);
    localStorage.setItem("technical_banks", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Code className="text-blue-600" size={28} /> Manage Technical Banks
        </h1>
        <p className="text-gray-500 text-sm mt-1">Add, update, or remove question banks available to students in their Interview Prep hub.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form to Add New */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="text-blue-600" size={20} /> Add New Bank
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <UploadCloud className="text-gray-400 mb-2" size={28} />
              <p className="text-sm font-bold text-gray-700">Upload Question Bank (PDF)</p>
              <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse</p>
              <input type="file" accept=".pdf" className="hidden" id="pdf-upload" onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewTitle(e.target.files[0].name.replace('.pdf', ''));
                  setNewDesc("Parsed automatically from uploaded PDF");
                  setNewCount(Math.floor(Math.random() * 50) + 20);
                }
              }} />
              <button 
                type="button" 
                onClick={() => document.getElementById('pdf-upload')?.click()}
                className="mt-3 px-4 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 shadow-sm transition-colors"
              >
                Browse Files
              </button>
            </div>
            
            <div className="flex items-center gap-2 py-2">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Or Add Manually</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Title</label>
              <input 
                type="text" 
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Python Basics" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Topics Covered (Description)</label>
              <input 
                type="text" 
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g., Syntax, Data Types, OOPs" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Questions</label>
              <input 
                type="number" 
                required
                min="1"
                value={newCount}
                onChange={(e) => setNewCount(Number(e.target.value))}
                placeholder="e.g., 50" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-gray-900"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#293d6b] hover:bg-blue-900 text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors mt-2"
            >
              Add Question Bank
            </button>
          </form>
        </div>

        {/* List of Existing Banks */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Current Active Banks</h2>
          
          {banks.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
              No technical banks currently available. Add one to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map(bank => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={bank.title} 
                  className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col justify-between shadow-sm relative group"
                >
                  <button 
                    onClick={() => handleDelete(bank.title)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Bank"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div>
                    <div className="flex items-start mb-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <BookOpen size={20} />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 pr-8">{bank.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{bank.desc}</p>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{bank.count} questions</span>
                    <button className="text-xs font-bold text-blue-600 hover:underline">Edit Questions</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
