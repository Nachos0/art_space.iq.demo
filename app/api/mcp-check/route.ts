import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if we're in an MCP environment by testing for Supabase MCP functions
    const hasMCP = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (hasMCP) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'MCP is available',
          url: process.env.NEXT_PUBLIC_SUPABASE_URL
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'MCP is not available' 
        },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error checking MCP availability',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 