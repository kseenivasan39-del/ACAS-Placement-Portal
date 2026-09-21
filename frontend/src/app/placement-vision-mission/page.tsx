"use client";

import Link from "next/link";
import DayOrderBar from "../../components/DayOrderBar";
import { Search, ChevronDown } from "lucide-react";

export default function PlacementAboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 1. Top Bar (Dark Gray/Blue) */}
      <div className="bg-[#384a6c] text-white text-xs py-1.5 px-4 font-semibold tracking-wide border-b-2 border-black/10 hidden md:block">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center divide-x divide-white/40">
            <Link href="/login?role=student" className="pr-3 hover:text-gray-300 transition-colors">Student Login</Link>
            <Link href="/login?role=recruiter" className="px-3 hover:text-gray-300 transition-colors">Staff Login</Link>
            <Link href="/about" className="px-3 hover:text-gray-300 transition-colors">About</Link>
            <Link href="#" className="pl-3 hover:text-gray-300 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center divide-x divide-white/40">
            <Link href="#" className="pr-3 hover:text-gray-300 transition-colors">Facilities</Link>
            <a href="https://admission.aditanarcollege.com/" target="_blank" rel="noopener noreferrer" className="px-3 hover:text-gray-300 transition-colors">Admission</a>
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
                ) : item === 'Placement' ? (
                  <span className="text-blue-800 border-b-2 border-blue-800 pb-1">{item}</span>
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
          <marquee scrollamount="5">
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
          </marquee>
        </div>
      </div>

      {/* 5. Placement About Content */}
      <main className="flex-grow max-w-[1000px] mx-auto w-full px-4 py-12">
        <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm rounded">
          <div className="mb-16">
            <div className="text-center">
              <h3 className="text-[#0d6efd] text-2xl font-bold uppercase tracking-wider mb-6 border-b-[3px] border-[#0d6efd] inline-block pb-2">
                VISION
              </h3>
            </div>
            <p className="text-gray-700 text-left mb-12 text-lg leading-relaxed text-justify">
              To empower every student with the right skills, knowledge, and confidence to build a successful career in leading organizations across the globe. We envision our institution as a premier hub of excellence where academic brilliance seamlessly integrates with industry readiness. By transforming passionate learners into innovative leaders and responsible global citizens, we strive to make a meaningful impact on both technological advancement and society at large.
            </p>

            <div className="text-center">
              <h3 className="text-[#0d6efd] text-2xl font-bold uppercase tracking-wider mb-6 border-b-[3px] border-[#0d6efd] inline-block pb-2">
                MISSION
              </h3>
            </div>
            <p className="text-gray-700 text-left mb-6 text-lg leading-relaxed text-justify">
              Our mission is to actively bridge the gap between academic learning and industry demands by fostering a culture of continuous growth, professional development, and ethical practices. We are deeply committed to nurturing talent through rigorous skill enhancement programs, equipping our students with the adaptability required to thrive in a rapidly evolving professional landscape.
            </p>
            <ul className="list-disc pl-6 space-y-4 text-gray-700 text-lg marker:text-[#0d6efd]">
              <li>To provide comprehensive training in technical, aptitude, and soft skills.</li>
              <li>To establish strong industry-academia partnerships.</li>
              <li>To ensure maximum placement opportunities through campus drives.</li>
            </ul>
          </div>

          <h2 className="text-[#293d6b] text-2xl font-bold mb-8 border-b-2 border-red-600 inline-block pb-2" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Placement Officer
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-8 rounded border border-gray-100 shadow-sm">
            <div className="w-32 h-32 shrink-0 rounded-full bg-gray-200 overflow-hidden border-2 border-[#293d6b]">
              <img 
                src="/placement_officer.jpg" 
                alt="Placement Officer" 
                className="w-full h-full object-cover bg-white" 
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23293d6b'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/></svg>"
                }}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-[#293d6b] mb-1">Dr. K. Muthukumar</h3>
              <p className="text-gray-500 font-semibold mb-4 text-sm uppercase tracking-wide border-b border-gray-200 inline-block pb-2">Placement Officer</p>
              
              <p className="text-gray-700 italic leading-relaxed text-justify relative">
                <span className="text-4xl text-gray-300 absolute -top-4 -left-4 font-serif">"</span>
                Welcome to the Placement Cell. Our primary goal is to empower students by bridging the gap between academia and industry. Through rigorous training programs, skill enhancement workshops, and robust industry partnerships, we ensure that every graduate is well-equipped to face the challenges of the dynamic professional world. We warmly invite recruiters to our campus to discover the exceptional talent nurtured at our institution.
                <span className="text-4xl text-gray-300 absolute -bottom-6 -right-4 font-serif">"</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <DayOrderBar />

      {/* Footer */}
      <footer className="bg-[#415a7d] text-white pt-8 pb-4">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/20 pb-8 mb-4">
            
            {/* Quick Links */}
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
              <ul className="space-y-2 font-medium">
                <li><Link href="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-blue-300 transition-colors">About Us</Link></li>
                <li><a href="https://admission.aditanarcollege.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">Admission</a></li>
                <li><a href="https://alumni.aei.edu.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">Alumni Network</a></li>
              </ul>
            </div>

            {/* Address */}
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Contact Us</h3>
              <p className="mb-2 font-medium">Aditanar College of Arts and Science</p>
              <p className="text-sm text-white/80 leading-relaxed mb-4">
                Virapandianpatnam,<br />
                Tiruchendur - 628216,<br />
                Thoothukudi District,<br />
                Tamil Nadu, India.
              </p>
            </div>

            {/* Contact details */}
            <div className="w-full md:w-1/3 bg-[#293d6b]/50 p-4 rounded flex items-center justify-between gap-4">
              <div className="w-24 h-24 shrink-0 bg-transparent rounded-lg shadow-sm">
                <img src="/logo.png" alt="Aditanar College Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-bold mb-4">Reach Out</h3>
                <p className="text-sm mb-2 text-white/90 font-bold">
                  <span className="font-extrabold text-base">Phone:</span> <br/>+91 4639 241505
                </p>
                <p className="text-sm text-white/90 font-bold">
                  <span className="font-extrabold text-base">Email:</span> <br/>aditanarcollegeplacement@aei.edu.in
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Credits */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-extrabold tracking-wide text-white/90">
            <p>Copyrights © (2026) Aditanar College of Arts & Science All rights reserved.</p>
            <p>Designed and Developed by <span className="text-white">Kore Ventures</span></p>
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
