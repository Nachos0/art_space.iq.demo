import { supabase } from './supabase';

// Initialize Database Tables
export async function initializeDatabase() {
  try {
    console.log("Attempting to initialize database tables...");
    
    // Check if tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (tablesError) {
      console.error("Error checking tables:", tablesError);
      return false;
    }
    
    const tableNames = tables?.map(t => t.tablename) || [];
    console.log("Existing tables:", tableNames);
    
    // Create artworks table if it doesn't exist
    if (!tableNames.includes('artworks')) {
      console.log("Creating artworks table...");
      const { error: artworksError } = await supabase.rpc('create_artworks_table');
      if (artworksError) {
        console.error("Error creating artworks table:", artworksError);
      }
    }
    
    // Create events table if it doesn't exist
    if (!tableNames.includes('events')) {
      console.log("Creating events table...");
      const { error: eventsError } = await supabase.rpc('create_events_table');
      if (eventsError) {
        console.error("Error creating events table:", eventsError);
      }
    }
    
    // Create cafe_items table if it doesn't exist
    if (!tableNames.includes('cafe_items')) {
      console.log("Creating cafe_items table...");
      const { error: cafeItemsError } = await supabase.rpc('create_cafe_items_table');
      if (cafeItemsError) {
        console.error("Error creating cafe_items table:", cafeItemsError);
      }
    }
    
    // Create hours table if it doesn't exist
    if (!tableNames.includes('hours')) {
      console.log("Creating hours table...");
      const { error: hoursError } = await supabase.rpc('create_hours_table');
      if (hoursError) {
        console.error("Error creating hours table:", hoursError);
      }
    }
    
    console.log("Database initialization completed");
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
}

// Function to create database functions for table creation
export async function createDatabaseFunctions() {
  try {
    console.log("Creating database functions...");
    
    // Function to create artworks table
    const createArtworksTableFn = `
    CREATE OR REPLACE FUNCTION create_artworks_table() RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS artworks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        medium TEXT,
        description TEXT,
        image TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    END;
    $$;
    `;
    
    // Function to create events table
    const createEventsTableFn = `
    CREATE OR REPLACE FUNCTION create_events_table() RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        description TEXT,
        image TEXT,
        type TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    END;
    $$;
    `;
    
    // Function to create cafe_items table
    const createCafeItemsTableFn = `
    CREATE OR REPLACE FUNCTION create_cafe_items_table() RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS cafe_items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        description TEXT,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    END;
    $$;
    `;
    
    // Function to create hours table
    const createHoursTableFn = `
    CREATE OR REPLACE FUNCTION create_hours_table() RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS hours (
        id TEXT PRIMARY KEY,
        sunday JSONB,
        monday JSONB,
        tuesday JSONB,
        wednesday JSONB,
        thursday JSONB,
        friday JSONB,
        saturday JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    END;
    $$;
    `;
    
    // Execute the function creation queries
    const { error: artworksFnError } = await supabase.rpc('create_artworks_table_function', { 
      function_definition: createArtworksTableFn 
    });
    if (artworksFnError) {
      console.error("Error creating artworks table function:", artworksFnError);
    }
    
    const { error: eventsFnError } = await supabase.rpc('create_events_table_function', { 
      function_definition: createEventsTableFn 
    });
    if (eventsFnError) {
      console.error("Error creating events table function:", eventsFnError);
    }
    
    const { error: cafeItemsFnError } = await supabase.rpc('create_cafe_items_table_function', { 
      function_definition: createCafeItemsTableFn 
    });
    if (cafeItemsFnError) {
      console.error("Error creating cafe_items table function:", cafeItemsFnError);
    }
    
    const { error: hoursFnError } = await supabase.rpc('create_hours_table_function', { 
      function_definition: createHoursTableFn 
    });
    if (hoursFnError) {
      console.error("Error creating hours table function:", hoursFnError);
    }
    
    console.log("Database functions created successfully");
    return true;
  } catch (error) {
    console.error("Error creating database functions:", error);
    return false;
  }
}

// Run database initialization on import
(() => {
  console.log("Database initialization module loaded");
})(); 