"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (formData.name.length < 2) newErrors.name = "Please enter your full name"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Please enter a valid phone number"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    localStorage.setItem(
      "salone_health_user",
      JSON.stringify({
        ...formData,
        password: btoa(formData.password),
        createdAt: new Date().toISOString(),
      }),
    )
    router.push("/role")
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const storedUser = localStorage.getItem("salone_health_user")

    if (!storedUser) {
      setErrors({ loginEmail: "No account found. Please sign up first." })
      return
    }

    const user = JSON.parse(storedUser)
    if (formData.email !== user.email) {
      setErrors({ loginEmail: "Email address not found" })
      return
    }
    if (btoa(formData.password) !== user.password) {
      setErrors({ loginPassword: "Incorrect password" })
      return
    }

    const role = localStorage.getItem("salone_health_role")
    router.push(role === "doctor" ? "/doctor" : role === "patient" ? "/patient" : "/role")
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="relative hidden lg:flex items-center justify-center">
        <Image src="/sierra-leone-healthcare-medical-professionals.jpg" alt="Sierra Leone Healthcare" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/90 to-emerald-800/90 flex flex-col items-center justify-center text-center p-10 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to Salone Health Connect</h2>
          <p className="text-xl opacity-90">Your trusted healthcare partner in Sierra Leone</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center p-6 md:p-16 bg-white">
        <Link href="/" className="text-gray-500 mb-6 hover:text-cyan-600 transition-colors">
          ← Back to Home
        </Link>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🏥</span>
          <h1 className="text-2xl font-bold text-gray-800">Salone Health Connect</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 rounded-md font-semibold transition-all ${
              activeTab === "signup" ? "bg-white text-cyan-600 shadow" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 rounded-md font-semibold transition-all ${
              activeTab === "login" ? "bg-white text-cyan-600 shadow" : "text-gray-500"
            }`}
          >
            Login
          </button>
        </div>

        {activeTab === "signup" ? (
          <form onSubmit={handleSignup} className="space-y-5">
            <h2 className="text-xl font-bold">Create Your Account</h2>
            <p className="text-gray-500 mb-6">Join thousands of Sierra Leoneans accessing quality healthcare</p>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none transition-colors"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none transition-colors"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+232 XX XXX XXXX"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none transition-colors"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none transition-colors"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <button type="button" onClick={() => setActiveTab("login")} className="text-cyan-600 font-semibold">
                Login here
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <h2 className="text-xl font-bold">Welcome Back</h2>
            <p className="text-gray-500 mb-6">Login to access your healthcare dashboard</p>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none transition-colors"
              />
              {errors.loginEmail && <span className="text-red-500 text-sm">{errors.loginEmail}</span>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none transition-colors"
              />
              {errors.loginPassword && <span className="text-red-500 text-sm">{errors.loginPassword}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Login
            </button>

            <p className="text-center text-gray-500">
              Don't have an account?{" "}
              <button type="button" onClick={() => setActiveTab("signup")} className="text-cyan-600 font-semibold">
                Sign up here
              </button>
            </p>
          </form>
        )}

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-gray-400">Need help?</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <a
          href="https://wa.me/23273095177"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#25d366] text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors"
        >
          <span>💬</span>
          Contact Support on WhatsApp
        </a>
      </div>

      <WhatsAppButton />
    </div>
  )
}
