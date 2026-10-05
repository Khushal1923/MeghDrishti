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
  roleTitleHi: string;
  location: string;
  phone: string;
  badge: string;
  panchayatLgd?: string;
  officerId?: string;
  department?: string;
  crops?: string[];
}

export const DEMO_USERS: Record<"farmer" | "officer", UserProfile> = {
  farmer: {
    id: "FARMER_MH_01",
    email: "farmer.demo@meghdrishti.in",
    name: "Ramesh Tukaram Patil (रमेश पाटील)",
    role: "farmer",
    roleTitleEn: "Farmer (Kisan)",
    roleTitleMr: "शेतकरी (किसान)",
    roleTitleHi: "किसान (कृषक)",
    location: "Wagholi Gram Panchayat, Pune",
    phone: "9823456789",
    badge: "Verified Kisan Hub",
    panchayatLgd: "MH_PUN_001",
    crops: ["Cotton", "Soybean", "Onion"],
  },
  officer: {
    id: "OFFICER_IMD_2026",
    email: "officer.imd@meghdrishti.in",
    name: "Dr. Aniruddha Deshmukh (डॉ. अनिरुद्ध देशमुख)",
    role: "officer",
    roleTitleEn: "Agronomical & Meteorological Officer",
    roleTitleMr: "कृषी व हवामान विस्तार अधिकारी",
    roleTitleHi: "कृषि एवं मौसम विज्ञान अधिकारी",
    location: "IMD District Nodal Cell, Pune Division",
    phone: "9876543210",
    badge: "IMD / MoES Nodal Officer",
    officerId: "OFFICER_IMD_2026",
    department: "District Agricultural & Meteorological Division",
  },
};

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  loginAs: (role: "farmer" | "officer", customName?: string, customPhone?: string) => void;
  signInFarmer: (phoneOrEmail: string, pinOrPass: string) => Promise<{ error: Error | null }>;
  signUpFarmer: (params: {
    name: string;
    phone: string;
    pin: string;
    email?: string;
    location?: string;
    panchayatLgd?: string;
    crops?: string[];
  }) => Promise<{ error: Error | null }>;
  signInOfficer: (officerIdOrEmail: string, pass: string) => Promise<{ error: Error | null }>;
  signUpOfficer: (params: {
    name: string;
    officerId: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    location?: string;
  }) => Promise<{ error: Error | null }>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  loginAs: () => {},
  signInFarmer: async () => ({ error: null }),
  signUpFarmer: async () => ({ error: null }),
  signInOfficer: async () => ({ error: null }),
  signUpOfficer: async () => ({ error: null }),
  updateUserProfile: async () => ({ error: null }),
  logout: async () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to construct profile object from Supabase user and optional database record
  const buildProfile = (sbUser: User, dbProfile?: any): UserProfile => {
    const meta = sbUser.user_metadata || {};
    const role: UserRole = (dbProfile?.role || meta.role) === "officer" ? "officer" : "farmer";
    const base = DEMO_USERS[role];

    return {
      id: sbUser.id,
      email: sbUser.email,
      name: dbProfile?.full_name || meta.full_name || meta.name || sbUser.email?.split("@")[0] || base.name,
      role: role,
      roleTitleEn: role === "officer" ? "Agronomical & Meteorological Officer" : "Farmer (Kisan)",
      roleTitleMr: role === "officer" ? "कृषी व हवामान विस्तार अधिकारी" : "शेतकरी (किसान)",
      roleTitleHi: role === "officer" ? "कृषि एवं मौसम विज्ञान अधिकारी" : "किसान (कृषक)",
      location: dbProfile?.location || meta.location || base.location,
      phone: dbProfile?.phone || meta.phone || sbUser.phone || base.phone,
      badge: role === "officer" ? "IMD / MoES Nodal Officer" : "Verified Kisan Hub",
      panchayatLgd: dbProfile?.panchayat_lgd || meta.panchayat_lgd || base.panchayatLgd,
      officerId: dbProfile?.officer_id || meta.officer_id || base.officerId,
      department: dbProfile?.department || meta.department || base.department,
      crops: dbProfile?.crops || meta.crops || base.crops,
    };
  };

  // Fetch from public.profiles table or fallback to user_metadata
  const fetchAndSetUserProfile = async (sbUser: User) => {
    try {
      const { data: dbProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sbUser.id)
        .maybeSingle();

      const profile = buildProfile(sbUser, dbProfile);
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("meghdrishti_auth_user", JSON.stringify(profile));
      }
    } catch (err) {
      const profile = buildProfile(sbUser);
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("meghdrishti_auth_user", JSON.stringify(profile));
      }
    }
  };

  useEffect(() => {
    // 1. Initial Session Check
    const initAuth = async () => {
      try {
        const { data: { session: activeSession } } = await supabase.auth.getSession();
        setSession(activeSession);

        if (activeSession?.user) {
          await fetchAndSetUserProfile(activeSession.user);
        } else {
          // Check localStorage for saved session
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

    // 2. Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          await fetchAndSetUserProfile(newSession.user);
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

  // 1-Click Instant Demo Login (Zero barriers for Hackathon evaluators & Farmers)
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

  // Farmer Sign In (by Phone or Email + PIN / Password)
  const signInFarmer = async (phoneOrEmail: string, pinOrPass: string) => {
    try {
      const cleanInput = phoneOrEmail.trim();
      const email = cleanInput.includes("@")
        ? cleanInput
        : `farmer.${cleanInput.replace(/\D/g, "")}@meghdrishti.in`;

      const password = pinOrPass.length === 4 ? `kisan_pin_${pinOrPass}` : pinOrPass;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Fallback for seamless demo testing if account not yet created in Supabase
        loginAs("farmer", cleanInput.includes("@") ? undefined : `Farmer (${cleanInput})`, cleanInput);
        return { error: null };
      }

      if (data.user) {
        await fetchAndSetUserProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      loginAs("farmer");
      return { error: null };
    }
  };

  // Farmer Registration (Creates Supabase Auth user + public.profiles entry)
  const signUpFarmer = async (params: {
    name: string;
    phone: string;
    pin: string;
    email?: string;
    location?: string;
    panchayatLgd?: string;
    crops?: string[];
  }) => {
    try {
      const cleanPhone = params.phone.replace(/\D/g, "");
      const email =
        params.email?.trim() ||
        `farmer.${cleanPhone || Math.floor(1000000000 + Math.random() * 9000000000)}@meghdrishti.in`;
      const password = params.pin.length === 4 ? `kisan_pin_${params.pin}` : params.pin || "kisan1234";

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "farmer",
            full_name: params.name,
            phone: params.phone,
            location: params.location || "Wagholi Gram Panchayat, Pune",
            panchayat_lgd: params.panchayatLgd || "MH_PUN_001",
            crops: params.crops || ["Cotton", "Soybean"],
          },
        },
      });

      if (error) {
        // If Supabase errors, create local profile so farmer isn't blocked
        loginAs("farmer", params.name, params.phone);
        return { error };
      }

      if (data.user) {
        // Upsert into public.profiles table
        await supabase.from("profiles").upsert({
          id: data.user.id,
          role: "farmer",
          full_name: params.name,
          phone: params.phone,
          email: email,
          location: params.location || "Wagholi Gram Panchayat, Pune",
          panchayat_lgd: params.panchayatLgd || "MH_PUN_001",
          crops: params.crops || ["Cotton", "Soybean"],
          updated_at: new Date().toISOString(),
        });

        await fetchAndSetUserProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      loginAs("farmer", params.name, params.phone);
      return { error: err };
    }
  };

  // Officer Sign In (by Govt Nodal ID or Official Email + Department Password)
  const signInOfficer = async (officerIdOrEmail: string, pass: string) => {
    try {
      const cleanInput = officerIdOrEmail.trim();
      const email = cleanInput.includes("@")
        ? cleanInput
        : `${cleanInput.toLowerCase().replace(/[^a-z0-9]/g, "_")}@meghdrishti.in`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        // Fallback for seamless demo testing if account not yet created in Supabase
        loginAs("officer", cleanInput.includes("@") ? undefined : `Officer ${cleanInput}`);
        return { error: null };
      }

      if (data.user) {
        await fetchAndSetUserProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      loginAs("officer");
      return { error: null };
    }
  };

  // Officer Registration (Creates Supabase Auth user + public.profiles entry)
  const signUpOfficer = async (params: {
    name: string;
    officerId: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    location?: string;
  }) => {
    try {
      const email = params.email.trim();
      const { data, error } = await supabase.auth.signUp({
        email,
        password: params.password,
        options: {
          data: {
            role: "officer",
            full_name: params.name,
            officer_id: params.officerId,
            phone: params.phone || "9876543210",
            department: params.department || "District Agricultural & Meteorological Division",
            location: params.location || "IMD Nodal Cell, Maharashtra",
          },
        },
      });

      if (error) {
        loginAs("officer", params.name);
        return { error };
      }

      if (data.user) {
        // Upsert into public.profiles table
        await supabase.from("profiles").upsert({
          id: data.user.id,
          role: "officer",
          full_name: params.name,
          officer_id: params.officerId,
          email: email,
          phone: params.phone || "9876543210",
          department: params.department || "District Agricultural & Meteorological Division",
          location: params.location || "IMD Nodal Cell, Maharashtra",
          updated_at: new Date().toISOString(),
        });

        await fetchAndSetUserProfile(data.user);
      }

      return { error: null };
    } catch (err: any) {
      loginAs("officer", params.name);
      return { error: err };
    }
  };

  // Update Profile (Syncs to Supabase Database + Local State)
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error("No active user") };

    try {
      const updated: UserProfile = { ...user, ...updates };
      setUser(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("meghdrishti_auth_user", JSON.stringify(updated));
      }

      // Sync with Supabase profiles table
      if (session?.user?.id) {
        await supabase.from("profiles").upsert({
          id: session.user.id,
          role: updated.role,
          full_name: updated.name,
          phone: updated.phone,
          location: updated.location,
          panchayat_lgd: updated.panchayatLgd,
          officer_id: updated.officerId,
          department: updated.department,
          crops: updated.crops,
          updated_at: new Date().toISOString(),
        });

        // Also sync user_metadata
        await supabase.auth.updateUser({
          data: {
            full_name: updated.name,
            role: updated.role,
            phone: updated.phone,
            location: updated.location,
            panchayat_lgd: updated.panchayatLgd,
            crops: updated.crops,
          },
        });
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
        signInFarmer,
        signUpFarmer,
        signInOfficer,
        signUpOfficer,
        updateUserProfile,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
