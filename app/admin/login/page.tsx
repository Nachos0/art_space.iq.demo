"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simple validation
    if (formData.email === "admin_sop2990@gmail.com" && formData.password === "adminsoso@@CAFE") {
      // Set cookie to maintain login state
      document.cookie = "adminLoggedIn=true; path=/;"
      router.push("/admin")
    } else {
      setError("Invalid email or password")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 relative mb-4">
              <Image
                src="/images/art-space-logo.jpg"
                alt="Art Space Logo"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#3d4f39]">Admin Login</h1>
            <p className="text-[#3d4f39]/60 mt-2 text-center">
              Welcome back! Please enter your credentials to access the admin dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3d4f39] mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3d4f39] mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-[#d9bfa4]/30 focus:border-[#3d4f39] focus:ring-[#3d4f39]"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#3d4f39] hover:bg-[#3d4f39]/90 text-white py-6"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 