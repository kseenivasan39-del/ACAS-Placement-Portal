"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Code, Users, Building, 
  Send, Bot, User as UserIcon, BookOpen, ChevronRight, Briefcase
} from "lucide-react";

type Tab = 'mock' | 'technical' | 'hr' | 'company';

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState<Tab>('mock');
  
  return (
    <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Interview Preparation Hub</h1>
        <p className="text-gray-500 text-sm mt-1">Master your technical and HR rounds with AI-powered practice.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200">
        <TabButton active={activeTab === 'mock'} onClick={() => setActiveTab('mock')} icon={<MessageSquare size={18} />} label="AI Mock Interview" />
        <TabButton active={activeTab === 'technical'} onClick={() => setActiveTab('technical')} icon={<Code size={18} />} label="Technical Bank" />
        <TabButton active={activeTab === 'hr'} onClick={() => setActiveTab('hr')} icon={<Users size={18} />} label="HR & Behavioral" />
        <TabButton active={activeTab === 'company'} onClick={() => setActiveTab('company')} icon={<Building size={18} />} label="Company Patterns" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'mock' && <MockInterviewTab key="mock" />}
          {activeTab === 'technical' && <TechnicalBankTab key="technical" />}
          {activeTab === 'hr' && <HRTab key="hr" />}
          {activeTab === 'company' && <CompanyTab key="company" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap ${
        active 
          ? 'bg-white text-blue-700 border-t-2 border-x border-blue-600 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 border-t-2 border-transparent'
      }`}
    >
      {icon} {label}
    </button>
  );
}

// 1. AI Mock Interviewer
function MockInterviewTab() {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: "Hello! I am your AI Mock Interviewer. Are you ready to begin? We can practice a Technical round or an HR round. Let me know which you prefer!" }
  ]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add User Message
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Great! Let's start with a classic Core CS question: Can you explain the difference between a process and a thread in an Operating System?" 
      }]);
    }, 1000);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-[#1a2b54] p-4 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg"><Bot size={20} /></div>
          <div>
            <h2 className="font-bold text-sm">Tech Interview Simulator</h2>
            <p className="text-xs text-blue-200">Session active • AI is listening</p>
          </div>
        </div>
        <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors border border-white/20">
          End Session
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
              {msg.role === 'ai' ? <Bot size={16} /> : <UserIcon size={16} />}
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'ai' ? 'bg-white border border-gray-200 text-gray-700 rounded-tl-none' : 'bg-[#293d6b] text-white rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer here..." 
            className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50 text-gray-900"
          />
          <button 
            type="submit"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors shrink-0 shadow-sm"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// 2. Technical Bank
function TechnicalBankTab() {
  const [topics, setTopics] = useState<{title: string, desc: string, count: number}[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("technical_banks");
    if (stored) {
      setTopics(JSON.parse(stored));
    } else {
      setTopics([
        { title: "Data Structures & Algorithms", desc: "Arrays, Linked Lists, Trees, Dynamic Programming", count: 120 },
        { title: "System Design", desc: "Scalability, Microservices, Load Balancing", count: 45 },
        { title: "React & Next.js", desc: "Hooks, State Management, Server Components", count: 85 },
        { title: "Java / Spring Boot", desc: "OOPs, Collections, Dependency Injection", count: 90 },
      ]);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto pr-2 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map(topic => (
          <div key={topic.title} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen size={20} />
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{topic.count} questions</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{topic.title}</h3>
            <p className="text-sm text-gray-500">{topic.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// 3. HR Tab
function HRTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto pb-8">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">The STAR Method</h2>
        <p className="text-amber-800 text-sm mb-6 max-w-2xl">
          The secret to passing behavioral rounds is structuring your answers using the STAR method. 
          It ensures you are concise, impactful, and memorable.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Situation', 'Task', 'Action', 'Result'].map((s, i) => (
            <div key={s} className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
              <h3 className="font-black text-amber-600 mb-1">S{i === 0 ? '' : i === 1 ? 'T' : i === 2 ? 'A' : 'R'} - {s}</h3>
              <p className="text-xs text-gray-600 font-medium">
                {i === 0 ? 'Set the scene and give the necessary details of your example.' : 
                 i === 1 ? 'Describe what your responsibility was in that situation.' :
                 i === 2 ? 'Explain exactly what steps you took to address it.' :
                 'Share what outcomes your actions achieved.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// 4. Company Tab
function CompanyTab() {
  const [patterns, setPatterns] = useState<{name: string, rounds: string}[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("company_patterns");
    if (stored) {
      setPatterns(JSON.parse(stored));
    } else {
      setPatterns([
        { name: "TCS Ninja / Digital", rounds: "1. Aptitude & Coding, 2. Technical Interview, 3. HR" },
        { name: "Zoho", rounds: "1. C Programming, 2. Advanced Coding, 3. System Design, 4. HR" },
        { name: "Amazon", rounds: "1. Online Assessment, 2. Technical (DSA), 3. Technical (LLD), 4. Bar Raiser" }
      ]);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto pb-8">
      <div className="grid grid-cols-1 gap-4">
        {patterns.map(company => (
          <div key={company.name} className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-black text-gray-400 text-xl">
                {company.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{company.name} Interview Pattern</h3>
                <p className="text-sm text-gray-500 font-semibold">{company.rounds}</p>
              </div>
            </div>
            <button className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
              Read Guide <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
