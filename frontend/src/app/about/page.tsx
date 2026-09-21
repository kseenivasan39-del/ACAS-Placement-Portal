"use client";

import Link from "next/link";
import DayOrderBar from "../../components/DayOrderBar";
import { Search, ChevronDown } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 1. Top Bar (Dark Gray/Blue) */}
      <div className="bg-[#384a6c] text-white text-xs py-1.5 px-4 font-semibold tracking-wide border-b-2 border-black/10 hidden md:block">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center divide-x divide-white/40">
            <Link href="/login?role=student" className="pr-3 hover:text-gray-300 transition-colors">Student Login</Link>
            <Link href="/login?role=recruiter" className="px-3 hover:text-gray-300 transition-colors">Staff Login</Link>
            <Link href="/about" className="px-3 hover:text-gray-300 transition-colors text-blue-200">About</Link>
            <Link href="#" className="pl-3 hover:text-gray-300 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center divide-x divide-white/40">
            <Link href="#" className="pr-3 hover:text-gray-300 transition-colors">Facilities</Link>
            <Link href="#" className="px-3 hover:text-gray-300 transition-colors">Admission</Link>
            <Link href="#" className="px-3 hover:text-gray-300 transition-colors">FAQs</Link>
            <a href="https://alumni.aei.edu.in/" target="_blank" rel="noopener noreferrer" className="pl-3 hover:text-gray-300 transition-colors">Alumni</a>
          </div>
        </div>
      </div>

      {/* 2. Main Header (White) */}
      <header className="bg-white py-4 px-4 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <Link href="/">
              <img src="/logo.png" alt="Aditanar College Logo" className="w-24 h-24 object-contain cursor-pointer" />
            </Link>
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
            {['Home', 'About', 'Admission', 'Facilities', 'Placement', 'Alumni'].map((item) => (
              <li key={item} className="relative px-4 py-3 hover:text-blue-800 cursor-pointer flex items-center gap-1 group">
                {item === 'Alumni' ? (
                  <a href="https://alumni.aei.edu.in/" target="_blank" rel="noopener noreferrer">{item}</a>
                ) : item === 'Admission' ? (
                  <a href="https://admission.aditanarcollege.com/" target="_blank" rel="noopener noreferrer">{item}</a>
                ) : item === 'About' ? (
                  <Link href="/about" className="text-blue-800 border-b-2 border-blue-800 pb-1">{item}</Link>
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

      {/* 4. About Content */}
      <main className="flex-grow max-w-[1000px] mx-auto w-full px-4 py-12">
        <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm rounded">
          <h2 className="text-[#293d6b] text-3xl font-bold mb-6 border-b-2 border-red-600 inline-block pb-2" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            About the College
          </h2>
          
          <div className="text-gray-800 leading-relaxed space-y-6 text-lg text-justify">
            <p>
              Aditanar College of Arts and Science was established in the year 1965 by Sri. Si.Pa.Aditanar. 
              It is located in the Virapandiapatnam village of Tiruchendur Taluk in Thoothukudi District of TamilNadu on the sea shore between Thoothukudi and Kanyakumari. 
              The founder, Sri.Si.Pa.Aditanar, a native of Kayamozhi Village, wanted to serve his place of birth.
            </p>
            <p>
              After establishing Daily Thanthi, a renowned Tamil newspaper, he formed a trust called "Aditanar Educational Institution" (A.E.I). 
              As the first project, he established Aditanar college of Arts and Science with the sole aim of providing higher educational opportunities for the youth of this area.
            </p>
            <p>
              His son, Padmashri Dr.B.Sivanthi Adityan has been the Founder President of the college committee since its inception. 
              Now, Dr.B.Sivanthi Adityan's son Thiru.S.Balasubramanian Adityan has succeeded his father as the Chairman of Aditanar Educational Institution and President of the college.
            </p>
            <p>
              The college was affiliated to Madurai Kamaraj University, Madurai, from 1965 to 1990. 
              The college has been affiliated to Manonmaniam Sundaranar University, Tirunelveli, since 1990.
            </p>
          </div>

          <hr className="my-12 border-gray-200" />

          <h2 className="text-[#293d6b] text-2xl font-bold mb-8" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Messages from the Management
          </h2>

          <div className="space-y-12">
            {/* Chairman's Message */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 shrink-0 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                <img src="/chairman.jpg" alt="Chairman" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Chairman&background=293d6b&color=fff&size=128' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Chairman's Message</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  Education has for its object the formation of character. The foundation of every state 
                  is the education of its youth. This was the basis behind the creation of Aditanar 
                  College of Arts and Science in Tiruchendur in 1965 by my grandfather, the visionary 
                  Sri. Si. Pa. Aditanar, when the youth of this hamlet had nowhere to go due to 
                  educational and economic backwardness.
                </p>
              </div>
            </div>

            {/* Principal's Message */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 shrink-0 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                <img src="/principal.jpg" alt="Principal" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Principal&background=293d6b&color=fff&size=128' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Principal’s Message</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  My vision is to bring about a sea change in the quality of the higher education which is 
                  the need of the hour, and to enhance the moral fibre of the modern students uplifting 
                  their holistic personality to ultimately make the society a harmonious and peaceful 
                  place to live.
                </p>
              </div>
            </div>

            {/* Secretary's Message */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 shrink-0 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                <img src="/secretary.jpg" alt="Secretary" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Secretary&background=293d6b&color=fff&size=128' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Secretary’s Message</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  We promise to do everything to encourage you in furthering your aspirations. Our 
                  college provides ample opportunities for acquiring the right type of knowledge and 
                  skills along with a vibrant research environment.
                </p>
              </div>
            </div>
          </div>

          <hr className="my-12 border-gray-200" />

          <div className="mt-12 text-center pb-20">
            <h2 className="text-[#293d6b] text-xl font-bold mb-8 uppercase tracking-widest border-b border-gray-200 inline-block pb-2">
              Testimonials
            </h2>
            
            <div className="relative max-w-3xl mx-auto overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-md">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                id="testimonial-slider"
              >
                {[
                  {
                    name: "Sivalingam Kadarkarai",
                    title: "Senior Manager, Hewlett Packard Inc. Bangalore",
                    text: "\"(1983-1986) I fulfilled my engineering aspirations through the BSc Physics degree obtained from Aditanar College. With valuable guidance from the faculty, I further secured my B.Tech from M.I.T Chennai and M.S from BITS Pilani. After serving as a Scientist at DRDO for the Kaveri Engine project and contributing internationally at Motorola, I currently work as an R&D Leader at HP India, holding worldwide responsibility for Printer Development.\"",
                    img: "/sivalingam.jpg"
                  },
                  {
                    name: "Thirumal Raj",
                    title: "Global Chief Technology Officer",
                    text: "\"(1988-1991) As a proud alumnus from the inaugural batch of BSc Computer Science, my journey is a testament to the transformative power of education. The invaluable mentorship from ACAS faculty laid the foundation for my global odyssey. With over three decades in IT, I now serve as a Global Chief Technology Officer, driving digital transformation. I am deeply grateful to my Alma Mater for empowering me to make a meaningful impact.\"",
                    img: "/thirumal.jpg"
                  },
                  {
                    name: "Karthikeyan Natarajan",
                    title: "Lead Software Engineer, Zoho",
                    text: "\"The rigorous curriculum and dedicated faculty at Aditanar College gave me the confidence to excel in the software industry. The campus environment fosters continuous learning and innovation. Truly a remarkable institution that builds character and careers.\"",
                    img: "/karthikeyan.jpg"
                  },
                  {
                    name: "Meenakshi Sundaram",
                    title: "Financial Analyst, Standard Chartered",
                    text: "\"My years at ACAS shaped my analytical thinking. The placement cell played a huge role in kickstarting my career at a top multinational company. The foundational knowledge I gained here is something I rely on every single day.\"",
                    img: "/meenakshi.jpg"
                  },
                  {
                    name: "Anitha Rajasekar",
                    title: "Research Scientist",
                    text: "\"I am proud to be an alumna. The hands-on laboratory sessions and continuous mentorship provided a solid foundation for my research career. The faculty go out of their way to ensure every student reaches their full potential.\"",
                    img: "/anitha.jpg"
                  },
                  {
                    name: "Muthukumar V",
                    title: "Operations Head, Amazon India",
                    text: "\"A fantastic environment for holistic development. From academics to extracurriculars, the college prepares you for real-world challenges. The leadership skills I learned here have been instrumental in my corporate journey.\"",
                    img: "/muthukumar.jpg"
                  },
                  {
                    name: "Priya Krishnan",
                    title: "Data Scientist, TCS",
                    text: "\"The guidance I received here was unparalleled. The faculty always encouraged us to think beyond textbooks, which helped me clear competitive exams and secure a prestigious role in data analytics. I owe my success to ACAS.\"",
                    img: "/priya.jpg"
                  },
                  {
                    name: "Ramesh Balasubramaniam",
                    title: "Director of Engineering",
                    text: "\"An institution that truly values education and discipline. My journey from a rural background to a corporate leadership role started here. ACAS doesn't just give you a degree; it gives you the vision to dream big.\"",
                    img: "/ramesh.jpg"
                  }
                ].map((t, idx) => (
                  <div key={idx} className="shrink-0 p-8 flex flex-col items-center" style={{ width: "12.5%" }}>
                    <p className="text-gray-600 italic text-sm md:text-base leading-relaxed text-center mb-8">
                      {t.text}
                    </p>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${t.name.replace(' ', '+')}&background=293d6b&color=fff&size=80` }} />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-lg">{t.name}</h4>
                    <p className="text-gray-500 text-sm text-center">{t.title}</p>
                  </div>
                ))}
              </div>

              <style dangerouslySetInnerHTML={{__html: `
                @keyframes testimonialSlide {
                  0%, 9% { transform: translateX(0); }
                  12.5%, 21.5% { transform: translateX(-12.5%); }
                  25%, 34% { transform: translateX(-25%); }
                  37.5%, 46.5% { transform: translateX(-37.5%); }
                  50%, 59% { transform: translateX(-50%); }
                  62.5%, 71.5% { transform: translateX(-62.5%); }
                  75%, 84% { transform: translateX(-75%); }
                  87.5%, 96.5% { transform: translateX(-87.5%); }
                  100% { transform: translateX(0); }
                }
                #testimonial-slider {
                  animation: testimonialSlide 40s infinite;
                  width: 800%;
                }
              `}} />
            </div>
          </div>
        </div>
      </main>

      {/* 5. Sticky Sidebar Enquiry Button */}
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
