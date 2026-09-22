"use client";

import { BarChart3, LayoutDashboard, Settings, ShoppingBag, Users, X } from "lucide-react";
import { BrandMark } from "@/components/dashboard/BrandMark";

type SidebarProps = { open: boolean; onClose: () => void };

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Orders", icon: ShoppingBag },
  { label: "Customers", icon: Users },
  { label: "Performance", icon: BarChart3 },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && <button aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-30 bg-navy/30 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-navy px-5 py-6 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3"><BrandMark /><span className="font-semibold tracking-tight">Nada&apos;s Shop</span></div>
          <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-md p-2 text-slate-300 hover:bg-white/10 lg:hidden"><X className="size-5" /></button>
        </div>

        <div className="mt-12 flex-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
          <nav aria-label="Main navigation" className="mt-4 space-y-1">
            {navigation.map(({ label, icon: Icon, active }) => (
              <button key={label} type="button" disabled={!active} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${active ? "bg-primary text-white" : "text-slate-300 hover:bg-white/10 disabled:cursor-default disabled:hover:bg-transparent"}`}>
                <Icon className="size-[18px]" />
                {label}
                {!active && <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500">Soon</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-orange/15 text-orange"><Settings className="size-4" /></div>
          <p className="text-sm font-medium">Keep your workspace moving</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">More tools and insights are coming soon.</p>
        </div>
      </aside>
    </>
  );
}