/*
  # Clean up broken auth records and switch to anon policies

  1. Cleanup
    - Remove broken admin user identity from auth.identities
    - Remove broken admin user from auth.users
    - Drop "Allow authenticated select" policy on submissions
    - Drop "Allow authenticated update" policy on submissions

  2. New Policies
    - "Allow anon select" on submissions for anon role (dashboard protected by external Lambda gate)
    - "Allow anon update" on submissions for anon role

  3. Unchanged
    - "Allow anonymous inserts" policy remains
    - status column on submissions remains
*/

DELETE FROM auth.identities WHERE provider_id IN (SELECT id::text FROM auth.users WHERE email = 'admin@ceomedia.agency');
DELETE FROM auth.users WHERE email = 'admin@ceomedia.agency';

DROP POLICY IF EXISTS "Allow authenticated select" ON submissions;
DROP POLICY IF EXISTS "Allow authenticated update" ON submissions;

CREATE POLICY "Allow anon select" ON submissions FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon update" ON submissions FOR UPDATE TO anon USING (true) WITH CHECK (true);
