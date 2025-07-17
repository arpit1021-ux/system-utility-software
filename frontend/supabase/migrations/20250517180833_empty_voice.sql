/*
  # Create systems table and security policies

  1. New Tables
    - `systems`
      - `id` (uuid, primary key)
      - `hostname` (text, unique)
      - `ip` (text)
      - `os` (text)
      - `os_version` (text)
      - `disk_encrypted` (boolean)
      - `os_updated` (boolean)
      - `antivirus_active` (boolean)
      - `inactivity_sleep` (integer)
      - `last_checkin` (timestamptz)
      - `model` (text)
      - `processor` (text)
      - `memory` (integer)
      - `serial_number` (text)
      - `user` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `owner_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on systems table
    - Add policies for authenticated users to:
      - Read their own systems
      - Create new systems
      - Update their own systems
      - Delete their own systems
*/

CREATE TABLE IF NOT EXISTS systems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hostname text UNIQUE NOT NULL,
  ip text NOT NULL,
  os text NOT NULL,
  os_version text NOT NULL,
  disk_encrypted boolean NOT NULL DEFAULT false,
  os_updated boolean NOT NULL DEFAULT false,
  antivirus_active boolean NOT NULL DEFAULT false,
  inactivity_sleep integer NOT NULL DEFAULT 10,
  last_checkin timestamptz NOT NULL DEFAULT now(),
  model text NOT NULL,
  processor text NOT NULL,
  memory integer NOT NULL,
  serial_number text NOT NULL,
  "user" text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  owner_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE systems ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own systems"
  ON systems
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create systems"
  ON systems
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own systems"
  ON systems
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own systems"
  ON systems
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_systems_updated_at
  BEFORE UPDATE ON systems
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();