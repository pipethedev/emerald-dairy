import DashboardSideNavigation from "@/app/components/dashboard/side-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh]">
      <DashboardSideNavigation />
      <main className="flex-1 w-full h-[100vh] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
