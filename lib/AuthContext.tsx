"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

export type UserRole = "farmer" | "officer" | null;

export interface UserProfile {
  id: string;
  email?: string;
  name: string;
  role: UserRole;
  roleTitleEn: string;
  roleTitleMr: string;
  location: string;
  phone: string;
  badge: string;
}

export const DEMO_USERS: Record<"farmer" | "officer", UserProfile> = {
  farmer: {
    id: "FARMER_MH_01",
    email: "farmer.demo@meghdrishti.in",
    name: "Ramesh Tukaram Patil (रमेश पाटील)",
    role: "farmer",
    roleTitleEn: "Farmer (Kisan)",
    roleTitleMr: "शेतकरी (किसान)",
    location: "Wagholi Gram Panchayat, Pune",
    phone: "9823456789",
    badge: "Verified Kisan Hub",
  },
  officer: {
    id: "OFFICER_IMD_2026",
    email: "officer.imd@meghdrishti.in",
    name: "Dr. Aniruddha Deshmukh (डॉ. अनिरुद्ध देशमुख)",
    role: "officer",
    roleTitleEn: "Agronomical & Meteorological Officer",
    roleTitleMr: "कृषी व हवामान विस्तार अधिकारी",
    location: "IMD District Nodal Cell, Pune Division",
    phone: "9876543210",
    badge: "IMD / MoES Nodal Officer",
  },
};

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  loginAs: (role: "farmer" | "officer", customName?: string, customPhone?: string) => void;
  signInWithEmail: (email: string, password: string, role?: "farmer" | "officer") => Promise<{ error: Error | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    role: "farmer" | "officer",
    name: string,
    phone?: string,
    location?: string
  ) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  loginAs: () => {},
  signInWithEmail: async () => ({ error: null }),
  signUpWithEmail: async () => ({ error: null }),
  logout: async () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Parse Supabase user to UserProfile
  const mapSupabaseUserToProfile = (sbUser: User): UserProfile => {
    const meta = sbUser.user_metadata || {};
    const role: UserRole = meta.role === "officer" ? "officer" : "farmer";
    const base = DEMO_USERS[role];

    return {
      id: sbUser.id,
      email: sbUser.email,
      name: meta.full_name || meta.name || sbUser.email?.split("@")[0] || base.name,
      role: role,
      roleTitleEn: role === "officer" ? "Agronomical & Meteorological Officer" : "Farmer (Kisan)",
      roleTitleMr: role === "officer" ? "कृषी व हवामान विस्तार अधिकारी" : "शेतकरी (किसान)",
      location: meta.location || base.location,
      phone: meta.phone || sbUser.phone || base.phone,
      badge: role === "officer" ? "IMD / MoES Nodal Officer" : "Verified Kisan Hub",
    };
  };

  useEffect(() => {
    // 1. Check active Supabase session
    const initAuth = async () => {
      try {
        const { data: { session: activeSession } } = await supabase.auth.getSession();
        setSession(activeSession);

        if (activeSession?.user) {
          const profile = mapSupabaseUserToProfile(activeSession.user);
          setUser(profile);
          localStorage.setItem("meghdrishti_auth_user", JSON.stringify(profile));
        } else {
          // Fallback to localStorage demo session if available
          const saved = localStorage.getItem("meghdrishti_auth_user");
          if (saved) {
            try {
              setUser(JSON.parse(saved));
            } catch (e) {
              // ignore
            }
          }
        }
      } catch (err) {
        console.error("Supabase auth initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // 2. Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          const profile = mapSupabaseUserToProfile(newSession.user);
          setUser(profile);
          localStorage.setItem("meghdrishti_auth_user", JSON.stringify(profile));
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          localStorage.removeItem("meghdrishti_auth_user");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginAs = (role: "farmer" | "officer", customName?: string, customPhone?: string) => {
    const base = DEMO_USERS[role];
    const newUser: UserProfile = {
      ...base,
      name: customName || base.name,
      phone: customPhone || base.phone,
    };
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("meghdrishti_auth_user", JSON.stringify(newUser));
    }
  };

  const signInWithEmail = async (email: string, password: string, role?: "farmer" | "officer") => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        const profile = mapSupabaseUserToProfile(data.user);
        if (role) {
          profile.role = role;
        }
        setUser(profile);
        localStorage.setItem("meghdrishti_auth_user", JSON.stringify(profile));
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    role: "farmer" | "officer",
    name: string,
    phone?: string,
    location?: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role,
            phone: phone || "",
            location: location || (role === "officer" ? "IMD Nodal Cell" : "Maharashtra Gram Panchayat"),
          },
        },
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        const profile = mapSupabaseUserToProfile(data.user);
        setUser(profile);
        localStorage.setItem("meghdrishti_auth_user", JSON.stringify(profile));
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setUser(null);
    setSession(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("meghdrishti_auth_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        loginAs,
        signInWithEmail,
        signUpWithEmail,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
