"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardNavProps {
  userName?: string
  isDoctor?: boolean
}

export function DashboardNav({ userName = "User", isDoctor = false }: DashboardNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("salone_health_user")
    localStorage.removeItem("salone_health_role")
    router.push("/")
  }

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between px-[5%] py-4 bg-white shadow">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-cyan-700">
          <span className="text-xl">🏥</span>
          <span>Salone Health</span>
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-gray-600 font-medium">Hello, {isDoctor ? `Dr. ${userName}` : userName}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>
        <button className="md:hidden text-2xl text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-lg p-5 flex flex-col gap-3 z-40 md:hidden">
          <Link
            href={isDoctor ? "/doctor" : "/patient"}
            className="p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/teleconsultation"
            className="p-3 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Consultation
          </Link>
          {!isDoctor && (
            <Link href="/directory" className="p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              Find Doctors
            </Link>
          )}
          <Link href="/support" className="p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
            Support
          </Link>
          <button onClick={logout} className="p-3 rounded-lg text-left hover:bg-gray-100 text-red-500">
            Logout
          </button>
        </div>
      )}
    </>
  )
}
