-- Skills Table Schema for Supabase
-- Run this in your Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    level INTEGER DEFAULT 50,
    status TEXT DEFAULT 'ACTIVE',
    category TEXT DEFAULT 'general',
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for ordering and category
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category ASC);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(is_featured ASC);

-- Add RLS (Row Level Security) policies
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read/write (for admin panel)
CREATE POLICY "Allow authenticated users to read skills"
    ON skills FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert skills"
    ON skills FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update skills"
    ON skills FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete skills"
    ON skills FOR DELETE
    TO authenticated
    WITH CHECK (true);

-- Allow public read access (for displaying on website)
CREATE POLICY "Allow public to read skills"
    ON skills FOR SELECT
    TO anon
    USING (true);
