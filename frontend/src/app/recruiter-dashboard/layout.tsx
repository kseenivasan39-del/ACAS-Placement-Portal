import { LayoutDashboard, Building, Briefcase, FileText, CheckSquare, Settings } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const recruiterLinks = [
    { href: "/recruiter-dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { href: "/recruiter-dashboard/profile", label: "Company Profile", icon: <Building size={20} /> },
    { href: "/recruiter-dashboard/jobs", label: "Job Postings", icon: <Briefcase size={20} /> },
    { href: "/recruiter-dashboard/ats", label: "Applicant Tracking", icon: <FileText size={20} /> },
    { href: "/recruiter-dashboard/offers", label: "Offer Verification", icon: <CheckSquare size={20} /> },
    { href: "/recruiter-dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <DashboardLayout 
      role="recruiter" 
      userName="Google HR" 
      links={recruiterLinks}
    >
      {children}
    </DashboardLayout>
  );
}
