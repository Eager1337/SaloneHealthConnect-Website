import Link from "next/link"
import Image from "next/image"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { MobileMenu } from "@/components/mobile-menu"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] py-4 bg-white/95 backdrop-blur-md shadow-sm">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-cyan-700">
          <span className="text-2xl">🏥</span>
          <span>Salone Health Connect</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/directory" className="text-gray-600 font-medium hover:text-cyan-600 transition-colors">
            Find Doctors
          </Link>
          <Link href="/support" className="text-gray-600 font-medium hover:text-cyan-600 transition-colors">
            Support
          </Link>
          <Link
            href="/auth"
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            Login
          </Link>
        </div>
        <MobileMenu />
      </nav>

      {/* Hero Section */}
      <main className="grid lg:grid-cols-2 gap-16 items-center px-[5%] pt-28 pb-16 min-h-screen">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="block">Healthcare,</span>
            <span className="block bg-gradient-to-r from-cyan-600 to-emerald-500 bg-clip-text text-transparent">
              Connected
            </span>
            <span className="block">— Sierra Leone</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Access quality healthcare from anywhere in Sierra Leone. Connect with verified local doctors through secure
            teleconsultations, anytime, anywhere.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href="/onboarding"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
            <a
              href="https://wa.me/23273095177"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25d366] text-white rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>💬</span>
              Chat on WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-emerald-500">✓</span>
              <span>Verified Doctors</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span>📱</span>
              <span>Mobile Friendly</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative h-[400px] lg:h-[500px]">
          <Image
            src="/modern-healthcare-in-sierra-leone-with-doctors-and.jpg"
            alt="Healthcare in Sierra Leone"
            fill
            className="object-cover rounded-2xl shadow-2xl"
          />
          {/* Floating Elements */}
          <div className="absolute top-[20%] -left-5 w-28 h-48 bg-gray-800 rounded-3xl p-2 shadow-2xl animate-float hidden lg:block">
            <div className="bg-white rounded-2xl h-full p-2">
              <div className="bg-cyan-600 text-white text-xs px-2 py-1 rounded-lg text-center mb-2">Salone Health</div>
              <div className="space-y-2">
                <div className="bg-gray-100 h-6 rounded-md"></div>
                <div className="bg-gray-100 h-6 rounded-md"></div>
                <div className="bg-cyan-600 h-4 rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-[10%] -right-2 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3 animate-float-delay hidden lg:flex">
            <span className="text-3xl">👨‍⚕️</span>
            <div>
              <div className="h-2 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-2 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
          <div className="absolute bottom-[20%] right-[10%] bg-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium animate-float-fast hidden lg:flex">
            <span className="text-emerald-500">📞</span>
            <span>Dr. Kamara is available</span>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-[5%] py-20 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Salone Health Connect?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: "📹",
              title: "Video Consultations",
              desc: "Connect face-to-face with doctors from the comfort of your home",
            },
            {
              icon: "👨‍⚕️",
              title: "Local Doctors",
              desc: "Access verified healthcare professionals across Sierra Leone",
            },
            { icon: "⚡", title: "Quick Access", desc: "Get medical advice when you need it, without the wait" },
            {
              icon: "💚",
              title: "24/7 Support",
              desc: "Our team is always here to help you navigate your health journey",
            },
          ].map((feature, i) => (
            <Link
              key={i}
              href="/onboarding"
              className="bg-gray-50 p-8 rounded-2xl text-center hover:-translate-y-2 hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition-all cursor-pointer"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white px-[5%] py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5 text-xl font-semibold">
            <span>🏥</span>
            <span>Salone Health Connect</span>
          </div>
          <div className="flex gap-8">
            <Link href="/directory" className="text-gray-300 hover:text-white transition-colors">
              Find Doctors
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
              Support
            </Link>
            <Link href="/auth" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
          </div>
          <p className="text-gray-400 text-sm">© 2025 Salone Health Connect. Proudly serving Sierra Leone.</p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
