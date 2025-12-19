"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DashboardNav } from "@/components/dashboard-nav"

const doctors = [
  {
    id: 1,
    name: "Dr. Amara Kamara",
    specialty: "general",
    title: "General Practitioner",
    hospital: "Connaught Hospital",
    location: "Freetown",
    rating: 4.9,
    reviews: 124,
    available: true,
  },
  {
    id: 2,
    name: "Dr. Fatmata Sesay",
    specialty: "pediatric",
    title: "Pediatrician",
    hospital: "Ola During Children's Hospital",
    location: "Freetown",
    rating: 4.8,
    reviews: 98,
    available: true,
  },
  {
    id: 3,
    name: "Dr. Mohamed Conteh",
    specialty: "surgery",
    title: "General Surgeon",
    hospital: "Choithram Memorial Hospital",
    location: "Freetown",
    rating: 4.7,
    reviews: 76,
    available: false,
  },
  {
    id: 4,
    name: "Dr. Isatu Bangura",
    specialty: "obstetrics",
    title: "Obstetrician & Gynecologist",
    hospital: "Princess Christian Maternity Hospital",
    location: "Freetown",
    rating: 4.9,
    reviews: 156,
    available: true,
  },
  {
    id: 5,
    name: "Dr. Ibrahim Koroma",
    specialty: "general",
    title: "General Practitioner",
    hospital: "34 Military Hospital",
    location: "Wilberforce",
    rating: 4.6,
    reviews: 89,
    available: true,
  },
  {
    id: 6,
    name: "Dr. Mariama Jalloh",
    specialty: "pediatric",
    title: "Pediatrician",
    hospital: "MedCare Clinic",
    location: "Aberdeen",
    rating: 4.8,
    reviews: 67,
    available: true,
  },
]

const clinics = [
  {
    id: 1,
    name: "Connaught Hospital",
    type: "Public Hospital",
    location: "Freetown Central",
    services: ["Emergency", "Surgery", "Outpatient"],
  },
  {
    id: 2,
    name: "Choithram Memorial Hospital",
    type: "Private Hospital",
    location: "Freetown",
    services: ["Surgery", "Maternity", "Diagnostics"],
  },
  {
    id: 3,
    name: "MedCare Clinic",
    type: "Private Clinic",
    location: "Aberdeen, Freetown",
    services: ["General Practice", "Pediatrics", "Lab"],
  },
  {
    id: 4,
    name: "HealthPlus Medical Center",
    type: "Private Clinic",
    location: "Hill Station",
    services: ["General Practice", "Pharmacy", "Diagnostics"],
  },
]

export default function DirectoryPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)

  const filteredDoctors = doctors.filter((doc) => {
    const matchesFilter = filter === "all" || doc.specialty === filter
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.location.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">Find Doctors & Clinics</h1>
          <p className="text-gray-500 text-lg">Connect with verified healthcare professionals across Sierra Leone</p>
        </header>

        {/* Search & Filters */}
        <div className="mb-10">
          <div className="flex gap-2 max-w-xl mx-auto mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialty, or location..."
              className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-600 focus:outline-none transition-colors"
            />
            <button className="px-5 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors">
              🔍
            </button>
          </div>
          <div className="flex justify-center flex-wrap gap-3">
            {["all", "general", "pediatric", "surgery", "obstetrics"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  filter === f
                    ? "bg-cyan-600 text-white"
                    : "bg-white border-2 border-gray-200 text-gray-600 hover:border-cyan-600 hover:text-cyan-600"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Available Doctors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className="bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={`/.jpg?height=200&width=200&query=${doc.name} African doctor portrait`}
                    alt={doc.name}
                    fill
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      doc.available ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
                    }`}
                  >
                    {doc.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-cyan-600 font-medium text-sm">{doc.title}</p>
                  <p className="text-gray-500 text-sm">🏥 {doc.hospital}</p>
                  <p className="text-gray-500 text-sm">📍 {doc.location}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-amber-500 font-semibold">⭐ {doc.rating}</span>
                    <span className="text-gray-400 text-sm">({doc.reviews} reviews)</span>
                  </div>
                  <button className="mt-4 w-full py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors text-sm">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clinics */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-gray-800">Healthcare Facilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {clinics.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer"
              >
                <Image
                  src={`/.jpg?height=200&width=300&query=${clinic.name} Sierra Leone hospital building`}
                  alt={clinic.name}
                  width={300}
                  height={140}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm">{clinic.name}</h3>
                  <p className="text-cyan-600 text-xs font-medium">{clinic.type}</p>
                  <p className="text-gray-500 text-xs">📍 {clinic.location}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {clinic.services.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6">Book Appointment</h2>
            <div className="flex gap-4 items-center pb-6 border-b border-gray-200 mb-6">
              <Image
                src={`/.jpg?height=80&width=80&query=${selectedDoctor.name} doctor`}
                alt={selectedDoctor.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-500">{selectedDoctor.title}</p>
                <p className="text-sm text-gray-500">🏥 {selectedDoctor.hospital}</p>
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Appointment booked successfully!")
                setSelectedDoctor(null)
              }}
            >
              <div>
                <label className="block mb-2 font-medium text-gray-700">Select Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Select Time</label>
                <select
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
                >
                  <option value="">Choose a time slot</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Reason for Visit</label>
                <textarea
                  placeholder="Briefly describe your symptoms..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

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
