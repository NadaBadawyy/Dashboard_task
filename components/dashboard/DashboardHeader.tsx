"use client";

import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-white p-5 sm:px-8 lg:px-10"> 
    <SidebarTrigger />
    
      <div className="hidden items-center gap-3 text-sm text-muted-foreground sm:flex"><Search className="size-4" /><span>Good morning, Admin</span></div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button type="button" aria-label="Notifications" className="relative rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-navy"><Bell className="size-5" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-orange" /></button>
        <div className="hidden h-8 w-px bg-border sm:block" />
      </div>
    </header>
  );
}