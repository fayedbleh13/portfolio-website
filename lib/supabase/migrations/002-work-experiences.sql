-- Work Experience Table Schema for Supabase
-- Run this in your Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS work_experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    featured_projects TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for ordering
CREATE INDEX IF NOT EXISTS idx_work_experiences_order ON work_experiences(display_order ASC);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE work_experiences ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read/write (for admin panel)
CREATE POLICY "Allow authenticated users to read work experiences"
    ON work_experiences FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert work experiences"
    ON work_experiences FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update work experiences"
    ON work_experiences FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to delete work experiences"
    ON work_experiences FOR DELETE
    TO authenticated
    USING (true);

-- Allow public read access (for displaying on website)
CREATE POLICY "Allow public to read work experiences"
    ON work_experiences FOR SELECT
    TO anon
    USING (true);
