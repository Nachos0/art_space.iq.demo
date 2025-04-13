"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import testImport from '@/lib/supabase-test'

export default function TestSupabase() {
  const [status, setStatus] = useState<string>('Testing...')
  const [connectionStatus, setConnectionStatus] = useState<'success' | 'error' | 'loading'>('loading')
  
  useEffect(() => {
    // Test the import
    const testResult = testImport()
    
    // Test the connection
    const testConnection = async () => {
      try {
        setStatus('Testing connection to Supabase...')
        // Just try to access the service
        const { data, error } = await supabase.from('_dummy_').select('*').limit(1)
        
        if (error && error.code !== 'PGRST116') { // Table does not exist error is fine
          throw error
        }
        
        setStatus('Supabase connection successful!')
        setConnectionStatus('success')
      } catch (error: any) {
        console.error('Supabase connection error:', error)
        setStatus(`Connection error: ${error.message || 'Unknown error'}`)
        setConnectionStatus('error')
      }
    }
    
    testConnection()
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
        
        <div className={`p-4 rounded-md mb-4 ${
          connectionStatus === 'success' ? 'bg-green-100 text-green-800' :
          connectionStatus === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          <p>{status}</p>
        </div>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Supabase Configuration</h2>
          <div className="grid gap-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium">API URL:</span>
              <span className="text-sm max-w-[220px] truncate">
                {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Connection Status:</span>
              <span className={`flex items-center ${
                connectionStatus === 'success' ? 'text-green-600' :
                connectionStatus === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                <span className={`h-2 w-2 rounded-full mr-2 ${
                  connectionStatus === 'success' ? 'bg-green-600' :
                  connectionStatus === 'error' ? 'bg-red-600' :
                  'bg-blue-600'
                }`}></span>
                {connectionStatus === 'success' ? 'Connected' :
                 connectionStatus === 'error' ? 'Failed' :
                 'Testing...'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <a 
            href="/"
            className="block w-full bg-[#3d4f39] text-white text-center py-2 px-4 rounded hover:bg-[#3d4f39]/90"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
} 