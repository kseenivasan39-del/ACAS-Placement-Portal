"use client";
import Marquee from "@/components/Marquee";

import Link from "next/link";
import DayOrderBar from "../../components/DayOrderBar";
import { Search, ChevronDown, AlignJustify } from "lucide-react";
import { placementData2022_2023, placementData2023_2024, placementData2024_2025 } from "./data";

export default function PlacementRecordPage() {
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

      {/* 5. Placement Record Content */}
      <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 py-12">
        <div className="bg-white p-6 md:p-10 border border-gray-200 shadow-sm rounded overflow-hidden">
          <div className="flex justify-between items-end mb-8 border-b-2 border-red-600 pb-4">
            <div>
              <h2 className="text-[#293d6b] text-3xl font-bold" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Placement Record
              </h2>
              <p className="text-gray-600 mt-2 font-semibold">Academic Year 2024-2025</p>
            </div>
            <div className="bg-[#293d6b] text-white px-4 py-2 rounded shadow-sm text-sm font-bold">
              Total Placements: {placementData2024_2025.length}
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded mb-16">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#293d6b]">
                  <th className="p-4 font-bold">S.No</th>
                  <th className="p-4 font-bold">Student Name</th>
                  <th className="p-4 font-bold">Dept</th>
                  <th className="p-4 font-bold">Employer Name</th>
                  <th className="p-4 font-bold">Off/On Campus</th>
                  <th className="p-4 font-bold">Annual Salary</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {placementData2024_2025.map((student, index) => (
                  <tr key={index} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 font-medium">{student.sno}</td>
                    <td className="p-4 font-bold text-gray-900">{student.name}</td>
                    <td className="p-4">
                      {student.dept && (
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                          {student.dept}
                        </span>
                      )}
                    </td>
                    <td className="p-4">{student.employer}</td>
                    <td className="p-4">
                      {student.type && (
                        <span className={`px-2 py-1 rounded text-xs font-bold ${student.type.toLowerCase().includes('on') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {student.type}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-semibold text-[#293d6b]">{student.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-end mb-8 border-b-2 border-red-600 pb-4">
            <div>
              <h2 className="text-[#293d6b] text-3xl font-bold" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Placement Record
              </h2>
              <p className="text-gray-600 mt-2 font-semibold">Academic Year 2023-2024</p>
            </div>
            <div className="bg-[#293d6b] text-white px-4 py-2 rounded shadow-sm text-sm font-bold">
              Total Placements: {placementData2023_2024.length}
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded mb-16">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#293d6b]">
                  <th className="p-4 font-bold">S.No</th>
                  <th className="p-4 font-bold">Student Name</th>
                  <th className="p-4 font-bold">Dept</th>
                  <th className="p-4 font-bold">Employer Name</th>
                  <th className="p-4 font-bold">Off/On Campus</th>
                  <th className="p-4 font-bold">Annual Salary</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {placementData2023_2024.map((student, index) => (
                  <tr key={index} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 font-medium">{student.sno}</td>
                    <td className="p-4 font-bold text-gray-900">{student.name}</td>
                    <td className="p-4">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                        {student.dept}
                      </span>
                    </td>
                    <td className="p-4">{student.employer}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${student.type.toLowerCase().includes('on') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {student.type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-[#293d6b]">{student.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-end mb-8 border-b-2 border-red-600 pb-4">
            <div>
              <h2 className="text-[#293d6b] text-3xl font-bold" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                Placement Record
              </h2>
              <p className="text-gray-600 mt-2 font-semibold">Academic Year 2022-2023</p>
            </div>
            <div className="bg-[#293d6b] text-white px-4 py-2 rounded shadow-sm text-sm font-bold">
              Total Placements: {placementData2022_2023.length}
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#293d6b]">
                  <th className="p-4 font-bold">S.No</th>
                  <th className="p-4 font-bold">Student Name</th>
                  <th className="p-4 font-bold">Dept</th>
                  <th className="p-4 font-bold">Employer Name</th>
                  <th className="p-4 font-bold">Off/On Campus</th>
                  <th className="p-4 font-bold">Annual Salary</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {placementData2022_2023.map((student, index) => (
                  <tr key={index} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 font-medium">{student.sno}</td>
                    <td className="p-4 font-bold text-gray-900">{student.name}</td>
                    <td className="p-4">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                        {student.dept}
                      </span>
                    </td>
                    <td className="p-4">{student.employer}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${student.type.toLowerCase().includes('on campus') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {student.type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-[#293d6b]">{student.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
