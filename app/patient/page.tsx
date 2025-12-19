"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DashboardNav } from "@/components/dashboard-nav"

export default function PatientDashboard() {
  const [userName, setUserName] = useState("Patient")
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("salone_health_user")
    if (!user) {
      router.push("/auth")
      return
    }
    const userData = JSON.parse(user)
    setUserName(userData.name?.split(" ")[0] || "Patient")
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userName={userName} />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-cyan-600 to-cyan-700 p-8 md:p-10 rounded-2xl text-white mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
            <p className="opacity-90">How can we help you today?</p>
          </div>
          <Image
            src="/patient-healthcare-wellness.jpg"
            alt="Patient Care"
            width={200}
            height={150}
            className="rounded-xl mt-4 md:mt-0 hidden md:block"
          />
        </header>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/teleconsultation"
              className="flex flex-col p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl shadow hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl mb-4">📹</div>
              <h3 className="font-semibold mb-1">Start Teleconsultation</h3>
              <p className="text-sm opacity-80 flex-1">Connect with a doctor via video call now</p>
              <span className="text-xl mt-3">→</span>
            </Link>

            <Link
              href="/directory"
              className="flex flex-col p-6 bg-white rounded-xl shadow border-2 border-transparent hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4">👨‍⚕️</div>
              <h3 className="font-semibold mb-1 text-gray-800">Find Doctors</h3>
              <p className="text-sm text-gray-500 flex-1">Browse our directory of verified doctors</p>
              <span className="text-xl mt-3 text-gray-400">→</span>
            </Link>

            <Link
              href="/support"
              className="flex flex-col p-6 bg-white rounded-xl shadow border-2 border-transparent hover:border-cyan-300 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-4">💬</div>
              <h3 className="font-semibold mb-1 text-gray-800">Customer Support</h3>
              <p className="text-sm text-gray-500 flex-1">Get help from our support team</p>
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
              <p className="text-sm text-gray-500 flex-1">Chat with us directly on WhatsApp</p>
              <span className="text-xl mt-3 text-gray-400">→</span>
            </a>
          </div>
        </section>

        {/* Dashboard Sections */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-5 text-gray-800">Upcoming Appointments</h3>
            <div className="space-y-4">
              {[
                { doctor: "Dr. Amara Kamara", type: "General Consultation", time: "Tomorrow, 10:00 AM" },
                { doctor: "Dr. Fatmata Sesay", type: "Follow-up Visit", time: "Dec 22, 2:00 PM" },
              ].map((apt, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl">📅</span>
                  <div className="flex-1">
                    <strong className="text-gray-800">{apt.doctor}</strong>
                    <p className="text-sm text-gray-500">{apt.type}</p>
                    <p className="text-sm text-cyan-600 font-medium">{apt.time}</p>
                  </div>
                  <Link
                    href="/teleconsultation"
                    className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/directory" className="inline-block mt-4 text-cyan-600 font-semibold hover:underline">
              Book New Appointment →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-5 text-gray-800">Health Tips</h3>
            <div className="space-y-3">
              {[
                { icon: "💧", tip: "Stay hydrated - drink at least 8 glasses of water daily" },
                { icon: "🏃", tip: "Regular exercise helps maintain good health" },
                { icon: "😴", tip: "Get 7-8 hours of sleep for optimal health" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">{item.icon}</span>
                  <p className="text-sm text-gray-600">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nearby Facilities */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800">Nearby Healthcare Facilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Connaught Hospital", location: "Freetown", distance: "2.5 km" },
              { name: "City Medical Center", location: "Aberdeen, Freetown", distance: "4.1 km" },
              { name: "HealthPlus Clinic", location: "Hill Station", distance: "5.8 km" },
            ].map((facility, i) => (
              <Link
                key={i}
                href="/directory"
                className="bg-white rounded-xl shadow overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <Image
                  src={`/.jpg?height=150&width=250&query=${facility.name} Sierra Leone hospital`}
                  alt={facility.name}
                  width={250}
                  height={150}
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{facility.name}</h4>
                  <p className="text-sm text-gray-500">{facility.location}</p>
                  <span className="text-sm text-cyan-600 font-medium">{facility.distance} away</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
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
