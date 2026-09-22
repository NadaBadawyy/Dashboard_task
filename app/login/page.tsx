import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

function BrandMark() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
      <span className="text-lg font-bold tracking-tight">P</span>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_80px_-36px_rgb(10_37_64/35%)] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden min-h-[680px] overflow-hidden bg-navy p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-28 -top-28 size-80 rounded-full border-[48px] border-primary/20" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full border-[32px] border-orange/20" aria-hidden="true" />
          <div className="relative space-y-8">
            <div className="flex items-center gap-3">
              <BrandMark />
              <span className="text-lg font-semibold tracking-tight">pulseboard</span>
            </div>
            <div className="max-w-sm space-y-5 pt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Operations, in focus</p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                A clearer view of the work that moves you forward.
              </h1>
              <p className="text-base leading-7 text-slate-300">
                Bring your team&apos;s signals into one calm, considered workspace.
              </p>
            </div>
          </div>
          <div className="relative space-y-4 text-sm text-slate-300">
            {["Decisions with better context", "A workspace built for momentum"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary"><Check className="size-3.5" /></span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex min-h-[680px] flex-col justify-center px-6 py-12 sm:px-14 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-md space-y-9">
            <div className="flex items-center gap-3 lg:hidden">
              <BrandMark />
              <span className="text-lg font-semibold tracking-tight text-navy">pulseboard</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary"><ShieldCheck className="size-4" /> Secure workspace access</div>
              <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">Welcome back</h2>
              <p className="text-base leading-7 text-muted-foreground">Sign in to pick up where you left off.</p>
            </div>
            <LoginForm />
            <div className="flex items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground">
              <span>Pulseboard workspace</span>
              <span className="inline-flex items-center gap-1 text-orange"><ArrowUpRight className="size-3.5" /> Private preview</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}