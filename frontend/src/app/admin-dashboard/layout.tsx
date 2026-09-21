import { LayoutDashboard, Users, Building, FileText, Settings } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminLinks = [
    { href: "/admin-dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { href: "/admin-dashboard/students", label: "Student Verification", icon: <Users size={20} /> },
    { href: "/admin-dashboard/companies", label: "Companies & Drives", icon: <Building size={20} /> },
    { href: "/admin-dashboard/reports", label: "Placement Reports", icon: <FileText size={20} /> },
    { href: "/admin-dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <DashboardLayout 
      role="admin" 
      userName="Rakesh Jha"
    >
      {children}
    </DashboardLayout>
  );
}
