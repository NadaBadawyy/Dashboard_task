"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Mail, MoveRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { type AppDispatch, type RootState } from "@/store/store";
import { Button } from "@/components/ui/button";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = { email?: string; password?: string };

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isHydrated } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (isHydrated && isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, isHydrated, router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!emailPattern.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";

    setErrors(nextErrors);
    setAuthError("");
    if (Object.keys(nextErrors).length > 0) return;

    if (email.toLowerCase() !== "admin@example.com" || password !== "123456") {
      setAuthError("Invalid email or password.");
      return;
    }

    dispatch(login({ email: email.toLowerCase() }));
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-navy">
          Work email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="h-12 w-full rounded-lg border border-input bg-white pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 aria-invalid:border-destructive"
            placeholder="you@company.com"
          />
        </div>
        {errors.email && <p id="email-error" className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-navy">
          Password
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="h-12 w-full rounded-lg border border-input bg-white pl-10 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 aria-invalid:border-destructive"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && <p id="password-error" className="text-xs text-destructive">{errors.password}</p>}
      </div>

      {authError && (
        <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-3 text-sm text-destructive">
          {authError}
        </p>
      )}

      <Button type="submit" className="h-12 w-full gap-2 bg-primary text-base font-semibold hover:bg-primary/90">
        Sign in
        <MoveRight className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}