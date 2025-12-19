"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { DashboardNav } from "@/components/dashboard-nav"

const faqs = [
  {
    q: "How do I book a teleconsultation?",
    a: 'To book a teleconsultation, go to "Find Doctors" from your dashboard, select a doctor, choose your preferred date and time, and confirm your booking. You\'ll receive a confirmation with a link to join the video call.',
  },
  {
    q: "What equipment do I need for a video consultation?",
    a: "You'll need a smartphone, tablet, or computer with a camera and microphone. Make sure you have a stable internet connection and are in a quiet, well-lit area for the best experience.",
  },
  {
    q: "Is my medical information secure?",
    a: "Yes, we take your privacy seriously. All consultations are encrypted, and your medical information is stored securely. We comply with healthcare data protection standards.",
  },
  {
    q: "How do I cancel or reschedule an appointment?",
    a: 'You can cancel or reschedule appointments from your dashboard up to 2 hours before the scheduled time. Go to "Upcoming Appointments" and select the appointment you wish to modify.',
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept mobile money (Orange Money, Africell Money), bank transfers, and cash payments at partner facilities. Payment details are provided when you book an appointment.",
  },
]

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tickets = JSON.parse(localStorage.getItem("support_tickets") || "[]")
    tickets.push({ ...formData, id: Date.now(), date: new Date().toISOString() })
    localStorage.setItem("support_tickets", JSON.stringify(tickets))
    alert("Thank you for your message! Our support team will get back to you within 24 hours.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />

      <main className="p-6 md:p-8 max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">How Can We Help You?</h1>
          <p className="text-gray-500 text-lg">Our support team is here to assist you 24/7</p>
        </header>

        {/* Support Options */}
        <section className="grid sm:grid-cols-3 gap-5 mb-12">
          <a
            href="https://wa.me/23273095177"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#25d366] to-[#20ba5a] p-8 rounded-2xl text-center text-white hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp Support</h3>
            <p className="text-sm opacity-90 mb-4">Get instant help via WhatsApp. Our team responds quickly!</p>
            <span className="font-semibold">Chat Now →</span>
          </a>
          <button
            onClick={() => document.getElementById("contactForm")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white p-8 rounded-2xl text-center shadow hover:-translate-y-1 hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition-all"
          >
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Send a Message</h3>
            <p className="text-sm text-gray-500 mb-4">Fill out our contact form and we'll get back to you</p>
            <span className="text-cyan-600 font-semibold">Contact Us →</span>
          </button>
          <button
            onClick={() => document.getElementById("faqSection")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white p-8 rounded-2xl text-center shadow hover:-translate-y-1 hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition-all"
          >
            <div className="text-4xl mb-4">❓</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">FAQs</h3>
            <p className="text-sm text-gray-500 mb-4">Find answers to commonly asked questions</p>
            <span className="text-cyan-600 font-semibold">View FAQs →</span>
          </button>
        </section>

        {/* FAQs */}
        <section id="faqSection" className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800"
                >
                  <span>{faq.q}</span>
                  <span className={`text-cyan-600 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section id="contactForm" className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+232 XX XXX XXXX"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
              >
                <option value="">Select a topic</option>
                <option value="technical">Technical Issue</option>
                <option value="appointment">Appointment Help</option>
                <option value="billing">Billing Question</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Your Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                placeholder="Describe your issue or question..."
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>

        {/* Contact Info */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Other Ways to Reach Us</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold mb-1 text-gray-800">Phone</h4>
              <p className="text-gray-500 text-sm">+232 73 095 177</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">📧</div>
              <h4 className="font-semibold mb-1 text-gray-800">Email</h4>
              <p className="text-gray-500 text-sm">support@salonehealthconnect.com</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">📍</div>
              <h4 className="font-semibold mb-1 text-gray-800">Address</h4>
              <p className="text-gray-500 text-sm">Freetown, Sierra Leone</p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/patient"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>

      <footer className="p-6 text-center text-gray-500 border-t border-gray-200">
        © 2025 Salone Health Connect | Proudly serving Sierra Leone
      </footer>

      <WhatsAppButton />
    </div>
  )
}
