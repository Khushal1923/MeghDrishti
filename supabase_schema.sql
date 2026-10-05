-- =========================================================
-- MeghDrishti: Supabase Authentication & Profile Schema
-- Supports Dual Roles: 'farmer' (शेतकरी) and 'officer' (कृषी अधिकारी)
-- =========================================================

-- 1. Create Profile Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'officer')),
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  location TEXT,
  panchayat_lgd TEXT,
  officer_id TEXT,
  department TEXT,
  crops TEXT[],
  language_preference TEXT DEFAULT 'mr',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. Trigger to automatically create profile on auth.users sign-up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    role,
    full_name,
    phone,
    email,
    location,
    panchayat_lgd,
    officer_id,
    department,
    crops,
    language_preference
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'farmer'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'MeghDrishti User'),
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone, ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'location', 'Maharashtra, India'),
    COALESCE(NEW.raw_user_meta_data->>'panchayat_lgd', 'MH_PUN_001'),
    COALESCE(NEW.raw_user_meta_data->>'officer_id', ''),
    COALESCE(NEW.raw_user_meta_data->>'department', 'Agriculture Department'),
    ARRAY[COALESCE(NEW.raw_user_meta_data->>'crops', 'Cotton,Soybean')]::text[],
    COALESCE(NEW.raw_user_meta_data->>'language_preference', 'mr')
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
