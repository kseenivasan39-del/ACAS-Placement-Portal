"use client";

import Image from "next/image";
import Link from "next/link";
import DayOrderBar from "../components/DayOrderBar";
import { Search, ChevronDown, AlignJustify, ChevronRight, Target, Lightbulb, Users, Handshake, MapPin, Phone, Mail, GraduationCap, Building2, TrendingUp, BookOpen, Clock, FileText } from "lucide-react";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Top Bar (Dark Gray/Blue) */}
      <div className="bg-[#384a6c] text-white text-xs py-1.5 px-4 font-semibold tracking-wide border-b-2 border-black/10 hidden md:block">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center divide-x divide-white/40">
            <Link href="/login?role=student" className="pr-3 hover:text-gray-300 transition-colors">Student Login</Link>
            <Link href="/login?role=staff" className="px-3 hover:text-gray-300 transition-colors">Staff Login</Link>
            <Link href="/about" className="px-3 hover:text-gray-300 transition-colors">About</Link>
            <Link href="#" className="pl-3 hover:text-gray-300 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center divide-x divide-white/40">
            <a href="https://admission.aditanarcollege.com/" target="_blank" rel="noopener noreferrer" className="pr-3 hover:text-gray-300 transition-colors">Admission</a>
            <Link href="#" className="px-3 hover:text-gray-300 transition-colors">FAQs</Link>
            <a href="https://alumni.aei.edu.in/" target="_blank" rel="noopener noreferrer" className="pl-3 hover:text-gray-300 transition-colors">Alumni</a>
          </div>
        </div>
      </div>

      {/* 2. Main Header (White) */}
      <header className="bg-white py-4 px-4 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <img src="/logo.png" alt="Aditanar College Logo" className="w-24 h-24 object-contain" />
            <div className="text-center md:text-left">
              <h1 className="text-[#293d6b] text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Aditanar College of Arts & Science
              </h1>
              <p className="text-[#1a2b54] font-bold text-sm">Virapandianpatnam Tiruchendur</p>
              <p className="text-gray-800 text-sm font-semibold">Re-Accredited in the 4th cycle with 'A' Grade by NAAC</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center border border-gray-300 rounded overflow-hidden h-9">
              <span className="px-3 text-xs text-blue-900 font-semibold bg-gray-50 border-r border-gray-300 h-full flex items-center">
                An Institute of Eminence
              </span>
              <span className="px-3 text-sm font-bold bg-white text-gray-800 flex items-center h-full">
                Search on ACAS
              </span>
              <button className="px-3 h-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Search size={16} className="text-blue-900 font-bold" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Navigation Menu */}
      <nav className="bg-white border-b-2 border-gray-300 hidden md:block">
        <div className="max-w-[1400px] mx-auto">
          <ul className="flex items-center justify-center text-sm font-semibold text-gray-800">
            {['Home', 'About', 'Admission', 'Placement', 'Alumni'].map((item) => (
              <li key={item} className="relative px-4 py-3 hover:text-blue-800 cursor-pointer flex items-center gap-1 group">
                {item === 'Alumni' ? (
                  <a href="https://alumni.aei.edu.in/" target="_blank" rel="noopener noreferrer">{item}</a>
                ) : item === 'Admission' ? (
                  <a href="https://admission.aditanarcollege.com/" target="_blank" rel="noopener noreferrer">{item}</a>
                ) : item === 'About' ? (
                  <Link href="/about">{item}</Link>
                ) : item === 'Home' ? (
                  <Link href="/">{item}</Link>
                ) : (
                  item
                )}
                {item !== 'Home' && item !== 'Alumni' && item !== 'Admission' && <ChevronDown size={14} className="text-gray-500 group-hover:text-blue-800" />}
                
                {item === 'Placement' && (
                  <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-md w-[280px] hidden group-hover:block z-50 font-normal">
                    <ul className="flex flex-col text-base text-black">
                      {['About', 'Vission And Mission', 'Placement Record', 'Recruiters', 'Mou Signed', 'Collaborations', 'Placement / Training', 'Internship Policy'].map((subItem, index) => (
                        <li key={index} className="px-6 py-4 hover:text-blue-800 border-b border-dotted border-gray-300 last:border-b-0 whitespace-nowrap">
                          {subItem === 'About' ? (
                            <Link href="/placement-about">{subItem}</Link>
                          ) : subItem === 'Vission And Mission' ? (
                            <Link href="/placement-vision-mission">{subItem}</Link>
                          ) : subItem === 'Placement Record' ? (
                            <Link href="/placement-record">{subItem}</Link>
                          ) : subItem === 'Recruiters' ? (
                            <Link href="/placement-recruiters">{subItem}</Link>
                          ) : subItem === 'Mou Signed' ? (
                            <Link href="/placement-mou">{subItem}</Link>
                          ) : subItem === 'Collaborations' ? (
                            <Link href="/placement-collaborations">{subItem}</Link>
                          ) : subItem === 'Placement / Training' ? (
                            <Link href="/">{subItem}</Link>
                          ) : subItem === 'Internship Policy' ? (
                            <a href="/internship-policy.pdf" target="_blank" rel="noopener noreferrer">{subItem}</a>
                          ) : (
                            subItem
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. Marquee (Latest Announcements) */}
      <div className="bg-[#4a6491] text-white flex items-center border-b-2 border-red-600">
        <div className="bg-[#293d6b] px-6 py-2 font-bold text-sm whitespace-nowrap z-10 shadow-lg">
          Latest Announcements
        </div>
        <div className="overflow-hidden flex-1 py-2 bg-white text-blue-600 font-semibold italic text-sm">
          <Marquee scrollamount="5">
            <span className="mr-8">First Year PG classes commence on 16-07-2026 (Thursday).</span>
            <span className="text-red-600 px-2 font-bold border border-red-600 rounded mr-2 text-xs">NEW</span>
            <a href="https://admission.aditanarcollege.com/" target="_blank" rel="noopener noreferrer" className="mr-8 text-blue-500 underline cursor-pointer">
              Admission 2026 - Click Here For - Apply Online
            </a>
            <span className="mr-8 text-blue-500 underline cursor-pointer">Placement Drive 2026 Registration Open - Click Here</span>
            <span className="text-red-600 px-2 font-bold border border-red-600 rounded mr-2 text-xs">NEW</span>
            <a href="/Placement_Training_Schedule_2021-2022.pdf" target="_blank" rel="noopener noreferrer" className="mr-8 text-blue-500 underline cursor-pointer">
              Placement Training Schedule
            </a>
          </Marquee>
        </div>
      </div>

      {/* 5. Hero Section (Traditional Banner Layout with Carousel) */}
      <main className="flex-grow bg-white">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <div className="border border-gray-200 p-2 shadow-sm bg-white rounded">
            
            {/* Image Slider Component */}
            <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden group">
              <div 
                className="flex transition-transform duration-1000 ease-in-out h-full w-full"
                id="hero-slider"
              >
                {/* We fixed the width to w-1/3 because the parent slider is 300% wide. */}
                <img src="/campus.jpg" alt="Aditanar College Campus" className="w-1/3 h-full object-cover bg-gray-100 shrink-0" />
                <img src="/lab.jpg" alt="Computer Lab" className="w-1/3 h-full object-cover bg-gray-100 shrink-0" />
                <img src="/auditorium.jpg" alt="Centenary Auditorium" className="w-1/3 h-full object-cover bg-gray-100 shrink-0" />
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes slide {
                  0%, 25% { transform: translateX(0); }
                  33%, 58% { transform: translateX(-33.333%); }
                  66%, 91% { transform: translateX(-66.666%); }
                  100% { transform: translateX(0); }
                }
                #hero-slider {
                  animation: slide 15s infinite;
                  width: 300%;
                }
              `}} />
            </div>

            <div className="text-center p-4 bg-gray-50 mt-2 border border-gray-200">
              <h2 className="heading-primary text-xl">Official Placement Management Portal</h2>
              <p className="text-gray-600 mt-2 font-medium">Empowering our students with premium career opportunities globally.</p>
              <div className="mt-4 flex justify-center gap-4">
                <Link href="/login?role=student" className="bg-[#293d6b] text-white px-6 py-2 font-bold text-sm hover:bg-blue-900 transition-colors">
                  STUDENT LOGIN
                </Link>
                <Link href="/login?role=recruiter" className="border-2 border-[#293d6b] text-[#293d6b] px-6 py-2 font-bold text-sm hover:bg-gray-100 transition-colors">
                  RECRUITER LOGIN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 6. Sticky Sidebar Enquiry Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <Link href="/login" className="bg-[#384a6c] text-white font-bold text-xs tracking-widest py-3 px-2 flex flex-col items-center gap-2 hover:bg-[#293d6b] transition-colors rounded-l border border-r-0 border-white/20 shadow-xl" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          <span className="transform rotate-90 text-lg mb-2">⇪</span>
          PLACEMENT ENQUIRY
        </Link>
      </div>

      <DayOrderBar />

      {/* Footer */}
      <footer className="bg-[#415a7d] text-white pt-8 pb-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/20 pb-8 mb-4">
            
            {/* Left side: Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-1 shrink-0">
                <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain rounded-full" />
              </div>
              <div>
                <h3 className="font-extrabold text-base md:text-lg tracking-wide uppercase">ADITANAR COLLEGE OF ARTS & SCIENCE</h3>
                <p className="font-bold text-sm tracking-wide">Thiruchendur</p>
              </div>
            </div>

            {/* Right side: Contact Info */}
            <div className="text-sm space-y-1 md:text-right font-bold tracking-wide">
              <h4 className="font-extrabold mb-2 uppercase">CONTACT INFORMATION</h4>
              <p>Aditanar College of Arts & Science</p>
              <p>Virapandianpatnam - 628216, Thiruchendur.</p>
              <p>Phone: +91-04639-220625, +91-04639-220631, +91-04639-220630</p>
              <p>Email: aditanarcollege@aei.edu.in</p>
              <p>Website: www.aditanarcollege.com</p>
            </div>
          </div>

          {/* Bottom Copyright and Credits */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-semibold tracking-wide">
            <p>Copyrights © (2026) Aditanar College of Arts & Science All rights reserved.</p>
            <p>Designed and Developed by Kore Ventures</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-white p-2.5 rounded shadow-lg border border-gray-200 z-50 hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
      </button>
    </div>
  );
}
