"use client";

import { useState, useEffect } from "react";
import { User, Link, Code, FileText, AlertCircle, CheckCircle2, Lock, Briefcase, Award, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentProfile() {
  const [fullName, setFullName] = useState("Sathish");
  const [cgpa, setCgpa] = useState("8.45");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [about, setAbout] = useState("Passionate Software Engineering student with a strong foundation in full-stack web development and algorithms. Always eager to learn new technologies and build scalable applications.");
  const [skills, setSkills] = useState("JavaScript, React, Node.js, Python, SQL, Git");
  const [experience, setExperience] = useState("1. Web Developer Intern at TechCorp (Summer 2025)\n- Built interactive dashboards using React and Tailwind CSS.\n- Optimized API response times by 20%.\n\n2. E-Commerce Platform (Academic Project)\n- Developed a full-stack e-commerce app using MERN stack.\n- Implemented Stripe payment gateway.");
  const [department] = useState("B.Tech Computer Science");
  const [tenthMarks, setTenthMarks] = useState("98");
  const [twelfthMarks, setTwelfthMarks] = useState("95");
  
  // Simulated state: if true, CGPA is verified and locked. If false, it's pending admin approval.
  const [cgpaStatus, setCgpaStatus] = useState<'verified' | 'pending' | 'unsubmitted' | 'rejected'>('verified');
  const [saved, setSaved] = useState(false);

  // Sync with Admin Dashboard using localStorage
  useEffect(() => {
    const savedCgpa = localStorage.getItem('student_cgpa');
    const savedStatus = localStorage.getItem('student_cgpa_status');
    if (savedCgpa) setCgpa(savedCgpa);
    if (savedStatus) setCgpaStatus(savedStatus as any);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    
    const lastVerified = localStorage.getItem('student_cgpa_verified_value') || "8.45";
    
    // If they changed the CGPA, it goes into pending state
    if (cgpa !== lastVerified) {
      setCgpaStatus('pending');
      localStorage.setItem('student_cgpa_status', 'pending');
    }
    
    localStorage.setItem('student_cgpa', cgpa);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your academic details and social links. Note that changes to CGPA require staff verification.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Basic Info */}
        <div className="p-6 border-b border-gray-200 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <User className="text-blue-600" size={20} /> Academic Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input type="text" disabled value={fullName} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Registration Number</label>
              <input type="text" disabled value="26f2300145" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <input type="text" disabled value={department} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed text-sm" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-semibold text-gray-700">10th Score (%)</label>
                <div className="relative overflow-hidden cursor-pointer">
                  <span className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Upload size={12} /> Upload Marksheet
                  </span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <input 
                type="number" step="0.1" required value={tenthMarks} onChange={(e) => setTenthMarks(e.target.value)}
                disabled={cgpaStatus === 'verified'}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                  cgpaStatus === 'verified' 
                    ? 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600'
                }`}
              />
            </div>
            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-semibold text-gray-700">12th Score (%)</label>
                <div className="relative overflow-hidden cursor-pointer">
                  <span className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                    <Upload size={12} /> Upload Marksheet
                  </span>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
              <input 
                type="number" step="0.1" required value={twelfthMarks} onChange={(e) => setTwelfthMarks(e.target.value)}
                disabled={cgpaStatus === 'verified'}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                  cgpaStatus === 'verified' 
                    ? 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600'
                }`}
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-semibold text-gray-700">Cumulative GPA (CGPA)</label>
                {cgpaStatus === 'verified' && <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> Verified</span>}
                {cgpaStatus === 'pending' && <span className="text-xs font-bold text-amber-600 flex items-center gap-1"><AlertCircle size={12}/> Pending Staff Verification</span>}
                {cgpaStatus === 'rejected' && <span className="text-xs font-bold text-red-600 flex items-center gap-1"><AlertCircle size={12}/> Rejected by Staff</span>}
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01"
                  max="10"
                  required
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  disabled={cgpaStatus === 'verified'}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none transition-all ${
                    cgpaStatus === 'verified' ? 'bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed' :
                    cgpaStatus === 'pending' ? 'border-amber-300 bg-amber-50 focus:ring-2 focus:ring-amber-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600'
                  }`}
                />
                {cgpaStatus === 'verified' && (
                   <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Lock size={12}/> Locked. Contact Placement Cell to request a change.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About & Skills */}
        <div className="p-6 border-b border-gray-200 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Award className="text-blue-600" size={20} /> About & Skills
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">About Me</label>
              <textarea 
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us a little about yourself, your career goals, and your passions." 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all resize-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Top Skills</label>
              <input 
                type="text" 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. JavaScript, Python, UI/UX Design (comma separated)" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Experience / Projects</label>
              <textarea 
                rows={4}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Briefly describe your past internships, part-time work, or major academic projects." 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all resize-none" 
              />
            </div>
          </div>
        </div>

        {/* Links & Resume */}
        <div className="p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} /> Career Links & Resume
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Profile URL <span className="text-red-500">*</span></label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="url" 
                  required
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile" 
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                GitHub Profile URL 
                {department.includes('B.Tech') && <span className="text-red-500 ml-1">* (Mandatory for B.Tech)</span>}
              </label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="url" 
                  required={department.includes('B.Tech')}
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/yourusername" 
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Resume (PDF) <span className="text-red-500">*</span></label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors">
                  <Upload className="text-blue-600" size={20} />
                </div>
                <p className="text-sm font-bold text-gray-700">Click to upload your resume</p>
                <p className="text-xs text-gray-500 mt-1">PDF only (Max 2MB)</p>
                <input type="file" accept=".pdf" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <AnimatePresence>
            {saved && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold text-green-600 flex items-center gap-1"
              >
                <CheckCircle2 size={16} /> Profile updated successfully!
              </motion.span>
            )}
          </AnimatePresence>
          <div className="flex-1"></div>
          <button type="submit" className="px-6 py-2 bg-[#293d6b] text-white font-bold rounded-lg hover:bg-blue-900 transition-colors">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
