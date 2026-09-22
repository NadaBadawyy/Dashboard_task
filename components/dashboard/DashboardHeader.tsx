"use client";

import { Bell, Menu, Search } from "lucide-react";
import { BrandMark } from "@/components/dashboard/BrandMark";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = { onMenuClick: () => void; email: string; onLogout: () => void };

export function DashboardHeader({ onMenuClick, email, onLogout }: DashboardHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-white px-5 sm:px-8 lg:px-10">
      <div className="flex items-center gap-3 lg:hidden"><BrandMark /><span className="font-semibold tracking-tight text-navy">Nada&apos;s Shop</span></div>
      <div className="hidden items-center gap-3 text-sm text-muted-foreground sm:flex"><Search className="size-4" /><span>Good morning, Admin</span></div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button type="button" aria-label="Notifications" className="relative rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-navy"><Bell className="size-5" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-orange" /></button>
        <div className="hidden h-8 w-px bg-border sm:block" />
        <div className="hidden text-right md:block"><p className="text-sm font-medium text-navy">Admin</p><p className="max-w-[180px] truncate text-xs text-muted-foreground">{email}</p></div>
        <Button variant="outline" onClick={onLogout} className="hidden h-9 sm:inline-flex">Log out</Button>
        <button type="button" aria-label="Open navigation" onClick={onMenuClick} className="rounded-lg p-2 text-navy hover:bg-muted lg:hidden"><Menu className="size-5" /></button>
      </div>
    </header>
  );
}