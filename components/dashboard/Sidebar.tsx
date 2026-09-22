"use client";

import { BarChart3, LayoutDashboard, LogOut, ShoppingBag, Users } from "lucide-react";
import { BrandMark } from "@/components/dashboard/BrandMark";
import { Button } from "@/components/ui/button";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: ShoppingBag },
  { label: "Customers", icon: Users },
  { label: "Performance", icon: BarChart3 },
];

type SidebarProps = { email: string; onLogout: () => void };

export function Sidebar({ email, onLogout }: SidebarProps) {
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3"><BrandMark /><span className="font-semibold tracking-tight">Nada&apos;s Shop</span></div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel className="text-primary/70">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map(({ label, icon: Icon, active }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton isActive={active} className="py-2">
                    <Icon className="size-5" />
                    {label}
                  
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="space-y-3 rounded-xl border border-primary/15 bg-white/60 p-4">
          <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">A</span><div className="min-w-0"><p className="truncate text-sm font-semibold text-primary">Admin</p><p className="truncate text-xs text-primary/70">{email}</p></div></div>
          <Button type="button" variant="outline" onClick={onLogout} className="w-full gap-2 border-primary/20 bg-white/70 text-primary hover:bg-primary/10"><LogOut className="size-4" /> Log out</Button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}