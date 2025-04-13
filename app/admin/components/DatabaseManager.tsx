"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { initializeSupabaseTables, exec_sql } from '@/lib/supabase-service'
import { supabase } from '@/lib/supabase'

export default function DatabaseManager() {
  const [initStatus, setInitStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const [sqlQuery, setSqlQuery] = useState("")
  const [sqlResult, setSqlResult] = useState<{ success?: boolean; data?: any; error?: string } | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const [isCheckingConnection, setIsCheckingConnection] = useState(false)

  const checkConnection = async () => {
    setIsCheckingConnection(true)
    setConnectionStatus(null)
    
    try {
      // Try a simple query to see if we can connect to Supabase
      const { data, error } = await supabase.from('_connection_test_').select('*').limit(1)
      
      if (error && error.message.includes('does not exist')) {
        // This is actually good - we're connected but the table doesn't exist
        setConnectionStatus({
          success: true,
          message: 'Successfully connected to Supabase! Ready to initialize database.'
        })
      } else if (error) {
        setConnectionStatus({
          success: false,
          message: `Connection error: ${error.message}`
        })
      } else {
        setConnectionStatus({
          success: true,
          message: 'Successfully connected to Supabase!'
        })
      }
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    } finally {
      setIsCheckingConnection(false)
    }
  }

  const handleInitializeDatabase = async () => {
    setIsInitializing(true)
    setInitStatus(null)
    
    try {
      const result = await initializeSupabaseTables()
      setInitStatus(result)
    } catch (error) {
      setInitStatus({ 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      })
    } finally {
      setIsInitializing(false)
    }
  }

  const handleExecuteSql = async () => {
    if (!sqlQuery.trim()) return
    
    setIsExecuting(true)
    setSqlResult(null)
    
    try {
      const result = await exec_sql(sqlQuery)
      setSqlResult(result)
    } catch (error) {
      setSqlResult({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      })
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Management</CardTitle>
        <CardDescription>
          Initialize or query your Supabase database
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="connection">
          <TabsList className="mb-4">
            <TabsTrigger value="connection">Connection Test</TabsTrigger>
            <TabsTrigger value="init">Initialize Database</TabsTrigger>
            <TabsTrigger value="sql">SQL Query</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connection">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Check your connection to the Supabase database.
              </p>
              
              <Button 
                variant="default" 
                onClick={checkConnection}
                disabled={isCheckingConnection}
                className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
              >
                {isCheckingConnection ? "Checking Connection..." : "Check Connection"}
              </Button>
              
              {connectionStatus && (
                <div className={`p-4 rounded mt-4 ${connectionStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {connectionStatus.message}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="init">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Initialize your Supabase database with the required tables.
              </p>
              
              <Button 
                variant="default" 
                onClick={handleInitializeDatabase}
                disabled={isInitializing}
                className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
              >
                {isInitializing ? "Initializing..." : "Initialize Database"}
              </Button>
              
              {initStatus && (
                <div className={`p-4 rounded mt-4 ${initStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {initStatus.message}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sql">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Run custom SQL queries on your Supabase database.
              </p>
              
              <Textarea
                placeholder="Enter SQL query..."
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                rows={6}
                className="font-mono text-sm"
              />
              
              <Button 
                variant="default" 
                onClick={handleExecuteSql}
                disabled={isExecuting || !sqlQuery.trim()}
                className="bg-[#3d4f39] hover:bg-[#3d4f39]/90"
              >
                {isExecuting ? "Executing..." : "Execute Query"}
              </Button>
              
              {sqlResult && (
                <div className={`p-4 rounded mt-4 ${sqlResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <h4 className={`font-medium ${sqlResult.success ? 'text-green-700' : 'text-red-700'}`}>
                    {sqlResult.success ? 'Query executed successfully' : 'Error executing query'}
                  </h4>
                  
                  {sqlResult.error && (
                    <p className="mt-2 text-red-700">{sqlResult.error}</p>
                  )}
                  
                  {sqlResult.data && (
                    <pre className="mt-2 p-2 bg-gray-50 rounded overflow-auto max-h-60 text-xs">
                      {JSON.stringify(sqlResult.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 