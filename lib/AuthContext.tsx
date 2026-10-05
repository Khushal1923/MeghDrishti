"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "farmer" | "officer" | null;

export interface UserProfile {
  id: string;
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
  loginAs: (role: "farmer" | "officer", customName?: string, customPhone?: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginAs: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check if session is stored
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("meghdrishti_auth_user");
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    }
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

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("meghdrishti_auth_user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAs,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
