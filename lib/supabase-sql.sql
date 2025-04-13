-- Function to create the events table
CREATE OR REPLACE FUNCTION create_events_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Drop table if it exists
  DROP TABLE IF EXISTS events;
  
  -- Create events table
  CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    time TEXT,
    image TEXT,
    type TEXT,
    featured BOOLEAN DEFAULT false,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  
  -- Set RLS policies
  ALTER TABLE events ENABLE ROW LEVEL SECURITY;
  
  -- Create policy for authenticated users to read all rows
  CREATE POLICY events_select_policy ON events
    FOR SELECT USING (true);
    
  -- Create policy for authenticated users to insert rows
  CREATE POLICY events_insert_policy ON events
    FOR INSERT WITH CHECK (true);
    
  -- Create policy for authenticated users to update rows
  CREATE POLICY events_update_policy ON events
    FOR UPDATE USING (true);
    
  -- Create policy for authenticated users to delete rows
  CREATE POLICY events_delete_policy ON events
    FOR DELETE USING (true);
END;
$$;

-- Function to create the artworks table
CREATE OR REPLACE FUNCTION create_artworks_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Drop table if it exists
  DROP TABLE IF EXISTS artworks;
  
  -- Create artworks table
  CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    medium TEXT,
    description TEXT,
    image TEXT,
    category TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  
  -- Set RLS policies
  ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
  
  -- Create policy for authenticated users to read all rows
  CREATE POLICY artworks_select_policy ON artworks
    FOR SELECT USING (true);
    
  -- Create policy for authenticated users to insert rows
  CREATE POLICY artworks_insert_policy ON artworks
    FOR INSERT WITH CHECK (true);
    
  -- Create policy for authenticated users to update rows
  CREATE POLICY artworks_update_policy ON artworks
    FOR UPDATE USING (true);
    
  -- Create policy for authenticated users to delete rows
  CREATE POLICY artworks_delete_policy ON artworks
    FOR DELETE USING (true);
END;
$$;

-- Function to create the cafe_items table
CREATE OR REPLACE FUNCTION create_cafe_items_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Drop table if it exists
  DROP TABLE IF EXISTS cafe_items;
  
  -- Create cafe_items table
  CREATE TABLE cafe_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
  
  -- Set RLS policies
  ALTER TABLE cafe_items ENABLE ROW LEVEL SECURITY;
  
  -- Create policy for authenticated users to read all rows
  CREATE POLICY cafe_items_select_policy ON cafe_items
    FOR SELECT USING (true);
    
  -- Create policy for authenticated users to insert rows
  CREATE POLICY cafe_items_insert_policy ON cafe_items
    FOR INSERT WITH CHECK (true);
    
  -- Create policy for authenticated users to update rows
  CREATE POLICY cafe_items_update_policy ON cafe_items
    FOR UPDATE USING (true);
    
  -- Create policy for authenticated users to delete rows
  CREATE POLICY cafe_items_delete_policy ON cafe_items
    FOR DELETE USING (true);
END;
$$; 