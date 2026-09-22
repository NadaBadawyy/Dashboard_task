import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = { email: string };

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isHydrated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isHydrated = true;
    },
    hydrate: (state, action: PayloadAction<AuthUser | null>) => {
      state.isAuthenticated = Boolean(action.payload);
      state.user = action.payload;
      state.isHydrated = true;
    },
  },
});

export const { login, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;