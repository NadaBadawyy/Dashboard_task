"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "@/data/sales";

function formatRevenue(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2 shadow-lg shadow-navy/10">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-primary">{formatRevenue(payload[0].value)}</p>
    </div>
  );
}

export function SalesChart() {
  return (
    <section className="rounded-xl border border-border bg-white shadow-sm shadow-navy/5">
      <div className="flex items-start justify-between p-6 sm:p-8">
        <div><h2 className="text-base font-semibold text-navy">Sales activity</h2><p className="mt-1 text-sm text-muted-foreground">Revenue performance over the last 7 days</p></div>
        <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-primary">This week</span>
      </div>
      <div className="h-64 px-3 pb-6 sm:h-72 sm:px-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData} margin={{ top: 8, right: 12, left: 8, bottom: 4 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} tickFormatter={(value: number) => `$${value / 1000}k`} width={42} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--primary)", strokeOpacity: 0.2 }} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}