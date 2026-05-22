/*
  # Add Instagram column to applications table

  1. Modified Tables
    - `applications`
      - Added `instagram` (text, default '') - stores the applicant's Instagram username without @ prefix

  2. Notes
    - This is an optional field; existing rows will get an empty string default
    - No RLS changes needed as existing policies cover all columns
*/

ALTER TABLE applications ADD COLUMN IF NOT EXISTS instagram text DEFAULT '';
