"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { type AppDispatch, type RootState } from "@/store/store";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isHydrated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) router.replace("/login");
  }, [isAuthenticated, isHydrated, router]);

  function handleLogout() {
    dispatch(logout());
    router.replace("/login");
  }

  if (!isHydrated || !isAuthenticated || !user) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading workspace...</main>;
  }

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-12">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-white">P</span><span className="font-semibold tracking-tight text-navy">pulseboard</span></div>
        <Button variant="outline" onClick={handleLogout} className="gap-2"><LogOut className="size-4" /> Log out</Button>
      </header>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-16">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Workspace ready</p>
          <h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-5xl">Your dashboard starts here.</h1>
          <p className="text-lg leading-8 text-muted-foreground">You are signed in as <span className="font-medium text-foreground">{user.email}</span>. The full operational dashboard will be added in a later feature.</p>
        </div>
        <div className="flex max-w-2xl items-start gap-4 rounded-2xl border border-primary/20 bg-secondary p-6 text-secondary-foreground">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
          <div className="space-y-1"><h2 className="font-semibold">Authentication is working</h2><p className="text-sm leading-6 text-muted-foreground">Your session is persisted locally, so refreshing this page will keep you signed in.</p></div>
        </div>
      </section>
    </main>
  );
}