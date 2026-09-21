"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, Bot, FileText, CheckCircle2, 
  AlertTriangle, XCircle, Sparkles, Download, 
  ChevronRight, ScanSearch, FileCheck
} from "lucide-react";

export default function ResumeAnalyzer() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [jobDescription, setJobDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload();
    }
  };

  const handleDownloadTemplate = () => {
    const templateContent = `Name: [Your Name]\nEmail: [Your Email]\nPhone: [Your Phone]\nLinkedIn: [Your LinkedIn URL]\n\nEXPERIENCE\n[Company Name] - [Role]\n- [Action Word] [Task] resulting in [Metric]\n\nEDUCATION\n[University Name] - [Degree]`;
    const blob = new Blob([templateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ATS_Friendly_Template.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    setStatus('scanning');
    // Simulate AI scanning delay
    setTimeout(() => {
      setStatus('results');
    }, 3500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bot className="text-blue-600" size={28} /> AI Resume Analyzer
        </h1>
        <p className="text-gray-500 text-sm mt-1">Upload your resume to instantly receive ATS optimization feedback.</p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col items-center justify-center bg-white border-2 border-dashed border-blue-200 rounded-2xl p-12 min-h-[500px]"
          >
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <UploadCloud className="text-blue-500" size={48} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Drag & Drop your Resume</h2>
            <p className="text-gray-500 text-sm mb-8 text-center max-w-md">
              Supports PDF, DOCX, and TXT files up to 5MB. Our AI will scan your document against industry-standard ATS parsers.
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden" 
            />
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Optional: Paste the Job Description here to check if your resume matches specific role requirements..."
              className="w-full max-w-lg mb-6 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all resize-none shadow-sm"
              rows={4}
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#293d6b] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
            >
              <Sparkles size={18} /> Analyze Resume Now
            </button>
            
            <div className="mt-8 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
              <Bot size={14} /> 
              Self-Learning AI: Continuously adapting based on successful alumni placements
            </div>
          </motion.div>
        )}

        {status === 'scanning' && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-12 min-h-[500px]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-6 rounded-full relative z-10"
              >
                <ScanSearch className="text-white" size={48} />
              </motion.div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Analyzing Document...</h2>
            <div className="space-y-2 mt-4 text-sm font-semibold text-gray-400 text-center">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Extracting keywords...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Checking formatting against ATS rules...</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Generating improvement suggestions...</motion.p>
            </div>
          </motion.div>
        )}

        {status === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Pane: Preview */}
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FileCheck className="text-green-500" size={18} /> Document Parsed
                </h3>
                <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">rahul_resume_v2.pdf</span>
              </div>
              
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-4 relative overflow-hidden flex flex-col gap-3 min-h-[400px]">
                {/* Mock Resume Visual */}
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/3 h-2 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-px bg-gray-200 mb-2"></div>
                <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-2 bg-gray-200 rounded"></div>
                <div className="w-full h-2 bg-gray-200 rounded"></div>
                <div className="w-5/6 h-2 bg-gray-200 rounded mb-4"></div>
                
                <div className="w-3/4 h-3 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-2 bg-gray-200 rounded"></div>
                <div className="w-full h-2 bg-gray-200 rounded"></div>
                
                {/* Simulated scan line */}
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-green-400/50 shadow-[0_0_10px_rgba(74,222,128,0.5)] z-10"
                />
              </div>

              <button 
                onClick={() => setStatus('idle')}
                className="mt-4 w-full py-2 bg-gray-50 hover:bg-gray-100 text-sm font-bold text-gray-600 rounded-lg border border-gray-200 transition-colors"
              >
                Upload New Resume
              </button>
            </div>

            {/* Right Pane: AI Report */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Score Card */}
              <div className="bg-gradient-to-br from-blue-900 to-[#1a2b54] rounded-xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Bot size={120} />
                </div>
                <div className="flex items-center gap-8 relative z-10">
                  <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                      <path className="text-blue-900/50" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <motion.path 
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: "78, 100" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-amber-400" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black">{jobDescription ? '65' : '78'}</span>
                      <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{jobDescription ? 'Moderate Match.' : 'Good, but needs work.'}</h2>
                    <p className="text-blue-100 text-sm max-w-md leading-relaxed">
                      {jobDescription 
                        ? 'Your resume hits some of the job requirements, but misses key specific skills and experience highlights requested in the Job Description.' 
                        : 'Your resume has strong content, but the formatting may confuse some ATS systems. You are also missing some critical keywords for software engineering roles.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feedback Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strengths */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-green-500" size={18} /> Key Strengths
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      {jobDescription ? 'Your education matches the degree requirements perfectly.' : 'Excellent use of action verbs in the experience section.'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      {jobDescription ? 'You have successfully included several core technical requirements.' : 'Education section is perfectly formatted.'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      Contact information is easily parsable.
                    </li>
                  </ul>
                </div>

                {/* Improvements */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-amber-500" size={18} /> Critical Improvements
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {jobDescription ? 'Missing crucial skills mentioned in the JD (e.g. "React", "Docker").' : 'Missing a live GitHub profile link (Required for B.Tech roles).'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {jobDescription ? 'Your experience section does not heavily emphasize the required "3+ years of frontend experience".' : 'Multi-column layout detected. This often breaks standard ATS parsers.'}
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      {jobDescription ? 'The job description requires strong "communication skills", which are not explicitly highlighted.' : 'Missing keywords: "Agile", "REST APIs", "CI/CD".'}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 bg-[#293d6b] hover:bg-blue-900 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                  <Sparkles size={18} /> Auto-Fix Resume (Beta)
                </button>
                <button 
                  onClick={handleDownloadTemplate}
                  className="px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} /> ATS Template
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
