# CareerConnect 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Hey there! Welcome to **CareerConnect**, the final year project built for the Aditanar College of Arts & Science Placement Cell. 🎓

This project was born out of a real need to bridge the gap between students, recruiters, and the college placement office. Let's be honest, managing spreadsheets of student data, tracking emails from recruiters, and manually scheduling interviews is a massive headache. CareerConnect solves all of that by bringing everyone into a single, seamless platform. 

## What does it actually do?

We've built three distinct dashboards to handle the entire placement lifecycle:

### 🎓 For Students
- **Smart Profile:** A central place for students to showcase their academic records (locked once verified!), skills, and resumes.
- **Job Board:** A live feed of all the companies visiting the campus. Students can apply with a single click.
- **Resume AI Analyzer:** This is my favorite part! Students can upload their resumes, paste a target job description, and get instant, AI-driven feedback on how to improve their chances. 
- **Interview Prep Hub:** A dedicated space packed with technical question banks, HR round strategies (STAR method), and company-specific interview patterns.

### 🏢 For Recruiters
- **Company Profile:** A clean interface for recruiters to set up their company profile (yes, the company logo is strictly mandatory now!).
- **Post & Manage Jobs:** Recruiters can post new drives and update job requirements instantly.
- **Applicant Tracking (ATS):** Instead of getting flooded with emails, recruiters can view all applicants in a clean pipeline, shortlist candidates, and schedule interviews right from the portal.

### 🛡️ For Placement Officers (Admin)
- **The Command Center:** The admin dashboard gives placement officers a bird's-eye view of everything happening on campus.
- **Verification:** They have the power to verify student academic records (which locks them from being edited by students) and approve/reject new company registrations.
- **Content Management:** Admins can dynamically upload new Technical Banks and Company Patterns (via PDF uploads!) that instantly sync to the student's Interview Prep hub.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Icons & Animations:** Lucide React, Framer Motion
- **State Management:** React hooks + localStorage (for the prototype/mocking data)
- **Styling Philosophy:** Vanilla CSS + Tailwind. We aimed for a modern, glassmorphism-inspired aesthetic with dynamic micro-animations to make the UI feel *alive*. No generic templates here!

## 🚀 Getting Started

If you want to spin this up locally and play around with the UI, it's super simple. 

1. **Clone the repo** (if you haven't already).
2. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Fire up the development server:**
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser. 

*Tip: The landing page has links to the different dashboards. Try using the global search bar and typing "help" to see the custom support routing in action!*

## 🚀 Future Add-Ons & Roadmap

While the platform is already packed with features, we have big plans for the future! Here are some of the ambitious add-ons we want to implement next:

- **Real-Time WebRTC Video Interviews:** Build a Zoom-like video conferencing tool directly into the Applicant Tracking System (ATS), complete with a shared code editor for live technical rounds.
- **Fully Functional AI Mock Interviewer:** Connect the Tech Interview Simulator UI to a real LLM backend (like OpenAI or Gemini) to provide dynamic, real-time technical and HR interview practice.
- **Automated Resume Matching Algorithm:** A smart matching engine that automatically scores every student in the database against a new job posting and suggests the top 10% of candidates directly to the recruiter.
- **Alumni Mentorship Network:** A module where verified alumni can log in, set their availability, and allow current students to book 1:1 mentorship or mock interview slots with them.
- **Full Backend Integration:** Connect the platform to a robust backend (Node.js/Express or Python/Django) with PostgreSQL to replace the current frontend mocking, complete with secure JWT role-based authentication.
- **Mobile Application:** Port the Next.js web application to React Native for a dedicated iOS and Android app with push notifications for instant interview alerts!

---

Built with a lot of coffee ☕ and late nights. Feel free to explore the codebase! If you run into any weird UI bugs, it's probably a feature. 😉

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
