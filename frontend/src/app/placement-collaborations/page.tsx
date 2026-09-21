"use client";

import Link from "next/link";
import { Search, ChevronDown, Globe, Map, PenTool, FlaskConical, Building2, GraduationCap, Building, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function PlacementCollaborationsPage() {
  const testingServices = [
    { title: "Design of Concrete Mixes", desc: "Offering suggestions for consulting structures along seashore, etc.", icon: <PenTool className="w-8 h-8 text-red-500" /> },
    { title: "Testing of Building Materials", desc: "Cement, concrete, bricks, tiles, steel rods, soils etc. to ascertain suitability in construction.", icon: <FlaskConical className="w-8 h-8 text-blue-500" /> },
    { title: "Standard Penetration Test", desc: "Advanced testing for site exploration and soil properties.", icon: <Building className="w-8 h-8 text-green-500" /> },
    { title: "Geological Mapping", desc: "Comprehensive mapping and topographical analysis.", icon: <Map className="w-8 h-8 text-amber-500" /> }
  ];

  const clients = [
    "PWD", "TWAD Board", "Highways Department", "Southern Railways", "CPWD", "Coastal Eneregen PVT LTD",
    "SRC Projects, Salem", "Deccan Construction Co", "3K Constructions", "DCW Pvt Ltd, Sahupuram",
    "Coramendal Constructions", "Chidambaram Builders", "King of Kings Assembly & God", "Nellai Malai Murasu",
    "Asir Auto Agency", "NS Enviro Engineers, Chennai."
  ];

  const internationalUniversities = [
    { name: "University of Malaya", location: "Malaysia", bg: "bg-blue-600" },
    { name: "University of Nevada", location: "Las Vegas, USA", bg: "bg-indigo-600" },
    { name: "University Medical Centre", location: "Hamburg, Germany", bg: "bg-red-700" },
    { name: "University of Cincinnati", location: "Ohio, USA", bg: "bg-slate-800" },
    { name: "Shizuoka University", location: "Japan", bg: "bg-rose-600" },
    { name: "Kingston University", location: "London, UK", bg: "bg-emerald-600" },
  ];

  const drJijiVisits = [
    { date: "Dec 2010 - Feb 2011", role: "Visiting Professor", location: "University of Nevada Los Vegas", type: "visit" },
    { date: "Oct 2011 - Nov 2011", role: "Visiting Professor", location: "Kingston University London", type: "visit" },
    { date: "Nov 18, 2011", role: "Guest Speaker", location: "Quantitative Medical Imaging International Institute, Kingston University", desc: "Enhancing Research through Intelligent Techniques in Medical Imaging", type: "talk" },
    { date: "Nov 2012 - Dec 2012", role: "Visiting Professor", location: "University of Hamburg Germany", type: "visit" },
    { date: "Dec 1st, 2012", role: "Guest Speaker", location: "University of Hamburg, Germany", desc: "Segmentation of Lesions in MRI Images", type: "talk" },
    { date: "Mar 2015 - Jun 2015", role: "Collaborative Research", location: "Biomedical Engineering", desc: "Integrating Multi-Dimensional Data to Explore the Biomarkers of Bipolar Disorder (BPD) with Prof. Jing-Huei Lee", type: "research" },
    { date: "May 04-06, 2016", role: "Guest Speaker", location: "6th Int. Conf. on Clinical and Experimental Dermatology, Chicago, USA", desc: "Diagnosis of Dermatological lesion using intelligent Technique", type: "talk" }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* 1. Top Bar */}
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

      {/* 2. Main Header */}
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

      {/* Hero Section */}
      <div className="relative bg-[#293d6b] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="max-w-[1200px] mx-auto px-6 relative z-10 text-center"
        >
          <Globe className="w-16 h-16 mx-auto mb-6 text-red-400 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>Global & Industrial Collaborations</h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            The College is proud to have signed MoU’s with the leading industrial, academic and research centres in India and Abroad. Consultancy services have been heavily undertaken by Chemistry, Civil, and Computer Science Engineering departments.
          </p>
        </motion.div>
      </div>

      <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 py-16 space-y-24">
        
        {/* Consultancy & Testing Services */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#293d6b] mb-4">Consultancy & Testing Services</h3>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {testingServices.map((service, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-3">{service.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <h4 className="text-xl font-bold text-[#293d6b] mb-8 flex items-center gap-3">
              <Building2 className="text-red-500" />
              Our Esteemed Clients
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
              {clients.map((client, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                  <span className="text-sm font-medium">{client}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-8 italic">* Including various departments of State and Central Government.</p>
          </div>
        </section>

        {/* International Collaborations */}
        <section>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#293d6b] mb-4">International Academic Collaborations</h3>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalUniversities.map((uni, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`${uni.bg} rounded-2xl p-8 text-white relative overflow-hidden group cursor-default shadow-lg`}
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 group-hover:scale-150 transition-transform duration-700"></div>
                <GraduationCap className="w-10 h-10 mb-6 opacity-80" />
                <h4 className="text-xl font-bold mb-2 relative z-10">{uni.name}</h4>
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium relative z-10">
                  <Map className="w-4 h-4" />
                  {uni.location}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Faculty Spotlight Timeline */}
        <section className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-blue-600 to-[#293d6b]"></div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
            <h3 className="text-3xl font-bold text-[#293d6b] mb-4">Faculty Excellence Spotlight</h3>
            <p className="text-lg text-gray-600 font-medium">Global Engagements of Dr. G. Wiselin Jiji</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {drJijiVisits.map((visit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-6 mb-8 relative group"
              >
                {/* Timeline Line */}
                {idx !== drJijiVisits.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-[-32px] w-0.5 bg-gray-200 group-hover:bg-blue-300 transition-colors"></div>
                )}
                
                {/* Timeline Node */}
                <div className="relative z-10 w-12 h-12 flex-shrink-0 bg-white rounded-full border-4 border-blue-100 flex items-center justify-center text-blue-600 group-hover:border-blue-600 transition-colors shadow-sm">
                  {visit.type === 'visit' ? <Globe className="w-5 h-5" /> : visit.type === 'talk' ? <ExternalLink className="w-5 h-5" /> : <FlaskConical className="w-5 h-5" />}
                </div>

                {/* Content */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex-1 hover:shadow-md transition-shadow group-hover:border-blue-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h4 className="font-bold text-lg text-[#293d6b]">{visit.role}</h4>
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-white text-gray-500 rounded-full border border-gray-200 w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      {visit.date}
                    </span>
                  </div>
                  <p className="text-blue-600 font-semibold text-sm mb-2">{visit.location}</p>
                  {visit.desc && (
                    <p className="text-gray-600 text-sm leading-relaxed bg-white p-3 rounded-lg border border-gray-100 italic">
                      "{visit.desc}"
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

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
