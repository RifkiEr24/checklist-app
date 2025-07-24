import DashboardNavbar from "@/modules/dashboard/components/DashboardNavbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardNavbar />
      <main className="">
        {children}
      </main>
    </div>
  );
}

