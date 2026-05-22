/*
  # Create submissions table for CEO Media intake form

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key, auto-generated)
      - `full_name` (text, not null)
      - `email` (text, not null)
      - `annual_revenue` (text, not null)
      - `product_service` (text, not null)
      - `creates_content` (text, not null)
      - `instagram` (text, nullable)
      - `twitter` (text, nullable)
      - `tiktok` (text, nullable)
      - `youtube` (text, nullable)
      - `linkedin` (text, nullable)
      - `other_social` (text, nullable)
      - `submitted_at` (timestamptz, defaults to now)

  2. Security
    - Enable RLS on `submissions` table
    - Add insert-only policy for anonymous users so the public form can submit data
    - No select/update/delete policies — data is write-only from the client
*/

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  annual_revenue text NOT NULL,
  product_service text NOT NULL,
  creates_content text NOT NULL,
  instagram text,
  twitter text,
  tiktok text,
  youtube text,
  linkedin text,
  other_social text,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
