import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";
import { getUser } from "@/server/user";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "12rem",
          "--sidebar-width-mobile": "8rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
