/*
  # Create system history table for tracking changes

  1. New Tables
    - `system_history`
      - `id` (uuid, primary key)
      - `system_id` (uuid, references systems)
      - `event_type` (text)
      - `details` (text)
      - `created_at` (timestamptz)
      - `owner_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on system_history table
    - Add policies for authenticated users to:
      - Read history for their own systems
      - Create history entries for their systems
*/

CREATE TABLE IF NOT EXISTS system_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id uuid REFERENCES systems ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  details text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  owner_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE system_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view history for their own systems"
  ON system_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create history entries"
  ON system_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);