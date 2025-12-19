"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DoctorDashboard() {
  const [userName, setUserName] = useState("Doctor")
  const [isAvailable, setIsAvailable] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("salone_health_user")
    if (!user) {
      router.push("/auth")
      return
    }
    const userData = JSON.parse(user)
    setUserName(userData.name?.split(" ")[0] || "Doctor")
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userName={userName} isDoctor />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-cyan-600 to-cyan-700 p-8 md:p-10 rounded-2xl text-white mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, Dr. {userName}</h1>
            <p className="opacity-90">Manage your appointments and consultations</p>
          </div>
          <div className="bg-white text-gray-800 px-4 py-3 rounded-xl flex items-center gap-4">
            <span className="font-medium">Availability Status:</span>
            <label className="relative inline-block w-12 h-6 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="sr-only peer"
              />
              <span className="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-emerald-500 transition-colors"></span>
              <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></span>
            </label>
            <span className={`font-semibold ${isAvailable ? "text-emerald-500" : "text-red-500"}`}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </header>

        {/* Stats */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { icon: "📅", value: "12", label: "Today's Appointments" },
            { icon: "👥", value: "156", label: "Total Patients" },
            { icon: "📹", value: "89", label: "Consultations This Month" },
            { icon: "⭐", value: "4.8", label: "Average Rating" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <Link
              href="/teleconsultation"
              className="flex flex-col p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl shadow hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-4">📹</div>
              <h3 className="font-semibold mb-1">Join Consultation</h3>
              <p className="text-sm opacity-80 flex-1">Start or join a video consultation</p>
              <span className="text-xl mt-3">→</span>
            </Link>

            <Link
              href="/support"
              className="flex flex-col p-6 bg-white rounded-xl shadow border-2 border-transparent hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4">💬</div>
              <h3 className="font-semibold mb-1 text-gray-800">Support Center</h3>
              <p className="text-sm text-gray-500 flex-1">Get technical help and support</p>
              <span className="text-xl mt-3 text-gray-400">→</span>
            </Link>

            <a
              href="https://wa.me/23273095177"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-6 bg-white rounded-xl shadow border-2 border-[#25d366] hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4">📱</div>
              <h3 className="font-semibold mb-1 text-gray-800">WhatsApp Support</h3>
              <p className="text-sm text-gray-500 flex-1">Quick assistance via WhatsApp</p>
              <span className="text-xl mt-3 text-gray-400">→</span>
            </a>
          </div>
        </section>

        {/* Schedule & Patients */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-5 text-gray-800">Today's Schedule</h3>
            <div className="space-y-4">
              {[
                { time: "9:00 AM", patient: "Aminata Koroma", type: "General Checkup", status: "Waiting" },
                { time: "10:30 AM", patient: "Mohamed Bangura", type: "Follow-up Consultation", status: "Upcoming" },
                { time: "2:00 PM", patient: "Isatu Conteh", type: "New Patient Consultation", status: "Upcoming" },
                { time: "4:00 PM", patient: "Abu Sesay", type: "Prescription Review", status: "Upcoming" },
              ].map((apt, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="px-3 py-2 bg-cyan-600 text-white rounded-lg font-semibold text-sm min-w-[80px] text-center">
                    {apt.time}
                  </div>
                  <div className="flex-1">
                    <strong className="text-gray-800">{apt.patient}</strong>
                    <p className="text-sm text-gray-500">{apt.type}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${
                        apt.status === "Waiting" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <Link
                    href="/teleconsultation"
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                      apt.status === "Waiting"
                        ? "bg-cyan-600 text-white hover:bg-cyan-700"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {apt.status === "Waiting" ? "Start" : "View"}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-5 text-gray-800">Recent Patients</h3>
            <div className="space-y-3">
              {[
                { initials: "AK", name: "Aminata Koroma", lastVisit: "Dec 15, 2024" },
                { initials: "MB", name: "Mohamed Bangura", lastVisit: "Dec 14, 2024" },
                { initials: "FS", name: "Fatmata Sesay", lastVisit: "Dec 12, 2024" },
              ].map((patient, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {patient.initials}
                  </div>
                  <div>
                    <strong className="text-sm text-gray-800">{patient.name}</strong>
                    <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-gray-500 border-t border-gray-200">
        © 2025 Salone Health Connect |{" "}
        <Link href="/support" className="text-cyan-600">
          Need Help?
        </Link>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
