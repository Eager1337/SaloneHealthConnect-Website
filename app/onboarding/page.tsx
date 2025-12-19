"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"

const slides = [
  {
    image: "/sierra-leone-hospital-with-doctors-helping-patient.jpg",
    title: "Connect with Local Doctors",
    description:
      "Access verified healthcare professionals from hospitals and clinics across Sierra Leone. Get expert medical advice from doctors who understand your needs.",
  },
  {
    image: "/video-teleconsultation-medical-appointment-on-phon.jpg",
    title: "Video Teleconsultations",
    description:
      "Speak face-to-face with doctors through secure video calls. No need to travel - receive quality healthcare from anywhere in Sierra Leone.",
  },
  {
    image: "/mobile-health-app-sierra-leone-patient-using-smart.jpg",
    title: "Healthcare in Your Hands",
    description:
      "Book appointments, manage prescriptions, and access your health records - all from your mobile device. Healthcare made simple for every Sierra Leonean.",
  },
]

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push("/auth")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-700 to-cyan-600">
      {/* Slides */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-lg text-center animate-fadeIn" key={currentSlide}>
          <div className="mb-10">
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              width={500}
              height={300}
              className="w-full h-72 object-cover rounded-2xl shadow-2xl"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{slides[currentSlide].title}</h2>
          <p className="text-white/90 text-lg leading-relaxed">{slides[currentSlide].description}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center p-6 bg-black/10">
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition-all ${i === currentSlide ? "w-8 bg-white" : "w-3 bg-white/30"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/auth")}
            className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-cyan-800 text-white rounded-xl font-semibold hover:bg-cyan-900 transition-colors"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-black/10">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      <WhatsAppButton />
    </div>
  )
}
