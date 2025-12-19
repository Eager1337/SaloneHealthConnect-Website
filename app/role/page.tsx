"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function RolePage() {
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("salone_health_user")
    if (!user) router.push("/auth")
  }, [router])

  const selectRole = (role: "patient" | "doctor") => {
    localStorage.setItem("salone_health_role", role)
    router.push(role === "patient" ? "/patient" : "/doctor")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-12">
        <span className="text-6xl block mb-4">🏥</span>
        <h1 className="text-3xl font-bold mb-3 text-gray-800">Welcome to Salone Health Connect</h1>
        <p className="text-gray-500 text-lg">Please select how you'll be using the platform</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-8">
        <button
          onClick={() => selectRole("patient")}
          className="bg-white p-10 rounded-2xl text-center shadow-md hover:-translate-y-2 hover:shadow-xl hover:border-cyan-500 border-2 border-transparent transition-all"
        >
          <div className="text-6xl mb-5">🧑‍🤝‍🧑</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">I am a Patient</h2>
          <p className="text-gray-500 mb-6">Book appointments, consult doctors, and manage your health records</p>
          <ul className="text-left space-y-2 mb-6">
            <li className="text-gray-600">✓ Video consultations with doctors</li>
            <li className="text-gray-600">✓ Find nearby clinics & hospitals</li>
            <li className="text-gray-600">✓ Access health records</li>
            <li className="text-gray-600">✓ Book appointments easily</li>
          </ul>
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold">
            Continue as Patient
          </span>
        </button>

        <button
          onClick={() => selectRole("doctor")}
          className="bg-white p-10 rounded-2xl text-center shadow-md hover:-translate-y-2 hover:shadow-xl hover:border-cyan-500 border-2 border-transparent transition-all"
        >
          <div className="text-6xl mb-5">👨‍⚕️</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">I am a Doctor</h2>
          <p className="text-gray-500 mb-6">Manage appointments, conduct teleconsultations, and help patients</p>
          <ul className="text-left space-y-2 mb-6">
            <li className="text-gray-600">✓ Manage your schedule</li>
            <li className="text-gray-600">✓ Conduct video consultations</li>
            <li className="text-gray-600">✓ Access patient records</li>
            <li className="text-gray-600">✓ Grow your practice</li>
          </ul>
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold">
            Continue as Doctor
          </span>
        </button>
      </div>

      <Link href="/auth" className="text-gray-500 hover:text-cyan-600 transition-colors">
        ← Back to Login
      </Link>

      <WhatsAppButton />
    </div>
  )
}
