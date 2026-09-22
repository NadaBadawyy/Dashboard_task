"use client";

import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { hydrate, type AuthUser } from "@/features/auth/authSlice";
import { store, type RootState, type AppDispatch } from "@/store/store";

const AUTH_STORAGE_KEY = "pulseboard-auth";

function AuthPersistence() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    let user: AuthUser | null = null;

    if (storedUser) {
      try {
        user = JSON.parse(storedUser) as AuthUser;
      } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    dispatch(hydrate(user));
  }, [dispatch]);

  useEffect(() => {
    if (!auth.isHydrated) return;

    if (auth.user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth.user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [auth.isHydrated, auth.user]);

  return null;
}

export function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <AuthPersistence />
      {children}
    </Provider>
  );
}