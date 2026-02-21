"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signoutUser } from "@/server/user";
import { ChevronsUpDown, History, LogOut, Pencil, Sparkle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface userProps {
  email: string;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
}

export function AppSidebar({ user }: userProps) {
  const router = useRouter();
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex items-center justify-center gap-2 ">
                <Sparkle />
                {state !== "collapsed" && "AI text editor"}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Editor */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/editor">
                    <Pencil className="size-4" />
                    <span>Editor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* History */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/history">
                    <History className="size-4" />
                    <span>History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={`h-16 transition-all ${
                    state === "collapsed"
                      ? "justify-center px-0"
                      : "justify-start px-3 gap-2"
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={user.user_metadata.avatar_url} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {state !== "collapsed" && (
                    <div className="flex flex-col leading-tight">
                      <p className="font-semibold text-sm">
                        {user.user_metadata.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  )}
                  {state !== "collapsed" && (
                    <ChevronsUpDown className="ml-auto size-4" />
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/terms">Terms</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/privacy">Privacy & Policy</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await signoutUser();
                      router.push("/signin");
                    }}
                  >
                    <LogOut /> Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
