"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  CreditCard,
  DollarSign,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { type AppDispatch, type RootState } from "@/store/store";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isHydrated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.replace("/login");
  }, [isAuthenticated, isHydrated, router]);

  function handleLogout() {
    dispatch(logout());
    router.replace("/login");
  }

  if (!isHydrated || !isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading workspace...
      </main>
    );
  }

  return (
    <SidebarProvider>
      <main className="flex min-h-screen bg-background w-full">
        <Sidebar email={user.email} onLogout={handleLogout} />
        <SidebarInset>
          <DashboardHeader />
          <section className="mx-auto bg-orange/3  w-full space-y-8 p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                  Good morning, Admin
                </h1>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Here&apos;s what&apos;s happening with your shop today.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Tuesday, September 22, 2026
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total revenue"
                value="$24,580"
                change="+12.8%"
                helper="vs last month"
                icon={DollarSign}
                tone="green"
              />
              <StatCard
                label="Orders"
                value="1,248"
                change="+8.4%"
                helper="vs last month"
                icon={ShoppingBag}
                tone="blue"
              />
              <StatCard
                label="Customers"
                value="3,842"
                change="+5.2%"
                helper="vs last month"
                icon={Users}
                tone="orange"
              />
              <StatCard
                label="Avg. order value"
                value="$86.40"
                change="+3.1%"
                helper="vs last month"
                icon={CreditCard}
                tone="teal"
              />
            </div>
            <OrdersTable />
            <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
              <SalesChart />
              <section className="rounded-xl border border-border bg-white p-6 shadow-sm shadow-navy/5 sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-navy">Recent activity</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Latest shop updates
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </div>
                <div className="mt-7 space-y-5">
                  <div className="flex gap-3">
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      <ShoppingBag className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-navy">
                        New order received
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Order #1048 · 12 min ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-orange">
                      <Users className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-navy">
                        New customer joined
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        sarah@example.com · 1 hr ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                      <DollarSign className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-navy">
                        Payment received
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Order #1043 · 3 hrs ago
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
