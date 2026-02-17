import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "14rem",
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
