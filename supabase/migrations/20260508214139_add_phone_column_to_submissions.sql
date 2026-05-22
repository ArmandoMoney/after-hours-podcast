/*
  # Add phone column to submissions

  1. Modified Tables
    - `submissions`
      - Added `phone` (text) - stores the applicant's phone number

  2. Notes
    - Column is nullable to preserve existing rows
    - New submissions will require phone via client-side validation
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'submissions' AND column_name = 'phone'
  ) THEN
    ALTER TABLE submissions ADD COLUMN phone text;
  END IF;
END $$;