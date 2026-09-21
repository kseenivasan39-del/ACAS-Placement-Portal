"use client";

import { useState, useEffect } from "react";
import { Plus, Building, Trash2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

interface Pattern {
  name: string;
  rounds: string;
}

const DEFAULT_PATTERNS: Pattern[] = [
  { name: "TCS Ninja / Digital", rounds: "1. Aptitude & Coding, 2. Technical Interview, 3. HR" },
  { name: "Zoho", rounds: "1. C Programming, 2. Advanced Coding, 3. System Design, 4. HR" },
  { name: "Amazon", rounds: "1. Online Assessment, 2. Technical (DSA), 3. Technical (LLD), 4. Bar Raiser" }
];

export default function ManageCompanyPatterns() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [newName, setNewName] = useState("");
  const [newRounds, setNewRounds] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("company_patterns");
    if (stored) {
      setPatterns(JSON.parse(stored));
    } else {
      setPatterns(DEFAULT_PATTERNS);
      localStorage.setItem("company_patterns", JSON.stringify(DEFAULT_PATTERNS));
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRounds) return;

    const newPattern = { name: newName, rounds: newRounds };
    const updated = [...patterns, newPattern];
    setPatterns(updated);
    localStorage.setItem("company_patterns", JSON.stringify(updated));

    setNewName("");
    setNewRounds("");
  };

  const handleDelete = (name: string) => {
    const updated = patterns.filter(p => p.name !== name);
    setPatterns(updated);
    localStorage.setItem("company_patterns", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Building className="text-blue-600" size={28} /> Manage Company Patterns
        </h1>
        <p className="text-gray-500 text-sm mt-1">Upload and manage interview patterns and guides for various companies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form to Add New */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="text-blue-600" size={20} /> Add New Pattern
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                 onClick={() => document.getElementById('pdf-upload')?.click()}>
              <UploadCloud className="text-gray-400 mb-2" size={28} />
              <p className="text-sm font-bold text-gray-700">Upload Guide (PDF)</p>
              <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse</p>
              <input type="file" accept=".pdf" className="hidden" id="pdf-upload" onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewName(e.target.files[0].name.replace('.pdf', '').replace(/[-_]/g, ' '));
                  setNewRounds("1. Aptitude, 2. Technical, 3. HR (Parsed from PDF)");
                }
              }} />
              <button 
                type="button" 
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
              <input 
                type="text" 
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Google" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Interview Rounds</label>
              <input 
                type="text" 
                required
                value={newRounds}
                onChange={(e) => setNewRounds(e.target.value)}
                placeholder="e.g., 1. DSA, 2. System Design" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none text-gray-900"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#293d6b] hover:bg-blue-900 text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors mt-2"
            >
              Add Pattern
            </button>
          </form>
        </div>

        {/* List of Existing Patterns */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Current Active Patterns</h2>
          
          {patterns.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
              No company patterns currently available. Add one to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {patterns.map(pattern => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={pattern.name} 
                  className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm relative group"
                >
                  <button 
                    onClick={() => handleDelete(pattern.name)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Pattern"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-black text-gray-400 text-xl">
                      {pattern.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{pattern.name} Interview Pattern</h3>
                      <p className="text-sm text-gray-500 font-semibold">{pattern.rounds}</p>
                    </div>
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
