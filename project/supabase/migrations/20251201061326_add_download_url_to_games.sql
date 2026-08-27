/*
  # Add download_url column to games table
  
  1. Changes
    - Add download_url column to store game download links
*/

ALTER TABLE games ADD COLUMN IF NOT EXISTS download_url text;