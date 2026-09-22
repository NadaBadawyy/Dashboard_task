import type { LucideIcon } from "lucide-react";

type StatCardProps = { label: string; value: string; change: string; helper: string; icon: LucideIcon; tone: "green" | "blue" | "orange" | "teal" };

const toneStyles = {
  green: "bg-secondary text-primary",
  blue: "bg-blue-50 text-brand-blue",
  orange: "bg-accent text-orange",
  teal: "bg-teal-50 text-brand-teal",
};

export function StatCard({ label, value, change, helper, icon: Icon, tone }: StatCardProps) {
  return (
    <article className="rounded-xl border border-border bg-white p-5 shadow-sm shadow-navy/5 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-muted-foreground">{label}</p><p className="mt-3 text-2xl font-semibold tracking-tight text-navy sm:text-3xl">{value}</p></div><span className={`flex size-10 items-center justify-center rounded-lg ${toneStyles[tone]}`}><Icon className="size-5" /></span></div>
      <div className="mt-5 flex items-center gap-2 text-xs"><span className="font-semibold text-primary">{change}</span><span className="text-muted-foreground">{helper}</span></div>
    </article>
  );
}