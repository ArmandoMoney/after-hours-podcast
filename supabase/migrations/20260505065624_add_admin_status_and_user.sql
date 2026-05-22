/*
  # Add admin dashboard support

  1. Modified Tables
    - `submissions`
      - Added `status` column (text, NOT NULL, default 'new') for tracking submission state

  2. Security
    - New SELECT policy for authenticated users to view all submissions
    - New UPDATE policy for authenticated users to update submissions
    - Existing anonymous INSERT policy remains unchanged

  3. Admin User
    - Creates admin user account (admin@ceomedia.agency) with default password
    - Creates corresponding identity record for email provider
*/

-- Add status column to submissions
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Allow authenticated users to read submissions
CREATE POLICY "Allow authenticated select"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update submissions
CREATE POLICY "Allow authenticated update"
  ON submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  aud,
  role,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@ceomedia.agency',
  crypt('changeme', gen_salt('bf')),
  now(),
  'authenticated',
  'authenticated',
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  ''
);

-- Create identity for admin user
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'admin@ceomedia.agency'),
  jsonb_build_object('sub', (SELECT id FROM auth.users WHERE email = 'admin@ceomedia.agency')::text, 'email', 'admin@ceomedia.agency'),
  'email',
  (SELECT id FROM auth.users WHERE email = 'admin@ceomedia.agency')::text,
  now(),
  now(),
  now()
);
