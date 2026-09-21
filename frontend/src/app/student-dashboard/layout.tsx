import DashboardLayout from "@/components/DashboardLayout";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="student" userName="Sathish">
      {children}
    </DashboardLayout>
  );
}
