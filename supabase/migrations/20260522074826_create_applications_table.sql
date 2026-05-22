/*
  # Create applications table for podcast guest application form

  1. New Tables
    - `applications`
      - `id` (uuid, primary key, auto-generated)
      - `full_name` (text, not null)
      - `email` (text, not null)
      - `phone` (text, not null)
      - `business_name` (text, not null)
      - `package_interest` (text, not null, default 'standard')
      - `consent` (boolean, not null, default false)
      - `submitted_at` (timestamptz, defaults to now)
      - `status` (text, not null, default 'new')

  2. Security
    - Enable RLS on `applications` table
    - Add policies for anonymous access (insert, select, update, delete)
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_name text NOT NULL,
  package_interest text NOT NULL DEFAULT 'standard',
  consent boolean NOT NULL DEFAULT false,
  submitted_at timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'new'
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON applications FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous update" ON applications FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow anonymous delete" ON applications FOR DELETE TO anon USING (true);