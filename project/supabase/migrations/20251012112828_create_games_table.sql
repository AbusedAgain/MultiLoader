/*
  # Create Games Management System

  1. New Tables
    - `games`
      - `id` (uuid, primary key) - Unique identifier for each game
      - `title` (text) - Game title/name
      - `description` (text) - Game description
      - `image_url` (text) - URL to game image/cover art
      - `size` (text) - Game size (e.g., "45.2 GB")
      - `install_status` (text) - Status: 'not_installed', 'installed', 'installing', 'update_available'
      - `version` (text) - Current game version
      - `last_played` (timestamptz, nullable) - When game was last played
      - `install_path` (text, nullable) - Where game is installed on user's system
      - `sort_order` (integer) - Order to display games in loader
      - `is_active` (boolean) - Whether game should be shown in loader
      - `created_at` (timestamptz) - When game was added to catalog
      - `updated_at` (timestamptz) - When game info was last updated

  2. Security
    - Enable RLS on `games` table
    - Add policy for public read access (anyone can view game catalog)
    - Future: Add admin policies for managing games
*/

CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  size text NOT NULL DEFAULT '0 GB',
  install_status text NOT NULL DEFAULT 'not_installed',
  version text NOT NULL DEFAULT '1.0.0',
  last_played timestamptz,
  install_path text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active games (public catalog)
CREATE POLICY "Anyone can view active games"
  ON games
  FOR SELECT
  USING (is_active = true);

-- Create index for sorting
CREATE INDEX IF NOT EXISTS idx_games_sort_order ON games(sort_order, created_at);

-- Create index for active games
CREATE INDEX IF NOT EXISTS idx_games_active ON games(is_active) WHERE is_active = true;