/*
  # Add Loaders Table

  1. New Tables
    - `loaders`
      - `id` (uuid, primary key) - Unique identifier
      - `title` (text) - Loader name (e.g., "Forge", "Fabric", "Optifine")
      - `description` (text) - Loader description
      - `image_url` (text) - Loader icon/image
      - `download_url` (text) - Direct download link
      - `version` (text) - Loader version
      - `sort_order` (integer) - Display order
      - `is_active` (boolean) - Whether loader is visible
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `loaders` table
    - Add policy for anyone to read loaders (public access)
    - Add policy for authenticated admins to manage loaders

  3. Notes
    - Loaders are modding tools/frameworks for games
    - Public read access allows all users to see available loaders
    - Only authenticated users can modify (for admin control)
*/

CREATE TABLE IF NOT EXISTS loaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  image_url text NOT NULL,
  download_url text NOT NULL,
  version text DEFAULT '1.0.0',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE loaders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active loaders"
  ON loaders FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert loaders"
  ON loaders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update loaders"
  ON loaders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete loaders"
  ON loaders FOR DELETE
  TO authenticated
  USING (true);