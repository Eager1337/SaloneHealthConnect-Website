"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function TeleconsultationPage() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "system",
      text: "Welcome to the consultation room. The chat feature allows you to communicate during your session.",
    },
    {
      type: "received",
      sender: "Dr. Kamara",
      text: "Hello! I'll be with you shortly. Please make sure your camera and microphone are working.",
      time: "Just now",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const goBack = () => {
    const role = localStorage.getItem("salone_health_role")
    router.push(role === "doctor" ? "/doctor" : "/patient")
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      alert("Unable to access camera and microphone. Please grant permission and try again.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted
      })
      setIsMuted(!isMuted)
    }
  }

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff
      })
      setIsVideoOff(!isVideoOff)
    }
  }

  const endSession = () => {
    if (confirm("Are you sure you want to end this session?")) {
      stopCamera()
      goBack()
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setMessages([...messages, { type: "sent", sender: "You", text: newMessage, time }])
    setNewMessage("")

    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        "I understand. Could you tell me more about your symptoms?",
        "Thank you for sharing. How long have you been experiencing this?",
        "I see. Have you tried any medication for this?",
        "That's helpful information. Let me note that down.",
      ]
      setMessages((prev) => [
        ...prev,
        {
          type: "received",
          sender: "Dr. Kamara",
          text: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, 2000)
  }

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Nav */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <button onClick={goBack} className="text-gray-300 hover:text-white transition-colors">
          ← Back to Dashboard
        </button>
        <span className="text-emerald-400 font-medium">{stream ? "Connected" : "Ready to Connect"}</span>
      </nav>

      <main className="flex-1 grid lg:grid-cols-[1fr_350px] gap-6 p-6">
        {/* Video Section */}
        <div className="flex flex-col gap-5">
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${stream ? "" : "hidden"}`}
            />
            {!stream && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <span className="text-6xl mb-4">📹</span>
                <p>Click "Start Camera" to begin</p>
              </div>
            )}
            {/* Remote video placeholder */}
            <div className="absolute top-5 right-5 w-48 h-36 bg-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-400 text-sm">
              <span className="text-3xl mb-2">👨‍⚕️</span>
              <p>Waiting for doctor...</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 p-4 bg-gray-800 rounded-xl flex-wrap">
            <button
              onClick={stream ? stopCamera : startCamera}
              className={`flex flex-col items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                stream ? "bg-cyan-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              <span className="text-xl">📷</span>
              <span className="text-xs">{stream ? "Stop Camera" : "Start Camera"}</span>
            </button>
            <button
              onClick={toggleMute}
              disabled={!stream}
              className={`flex flex-col items-center gap-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isMuted ? "bg-cyan-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              <span className="text-xl">🎤</span>
              <span className="text-xs">{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            <button
              onClick={toggleVideo}
              disabled={!stream}
              className={`flex flex-col items-center gap-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isVideoOff ? "bg-cyan-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              <span className="text-xl">📹</span>
              <span className="text-xs">{isVideoOff ? "Camera On" : "Camera Off"}</span>
            </button>
            <button
              onClick={endSession}
              className="flex flex-col items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <span className="text-xl">📞</span>
              <span className="text-xs">End Session</span>
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-gray-800 rounded-2xl flex flex-col overflow-hidden hidden lg:flex">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-700">
            <h3 className="text-white font-semibold">Chat</h3>
            <span className="text-emerald-400 text-sm">● Online</span>
          </div>
          <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.type === "sent" ? "flex-row-reverse" : ""}`}>
                {msg.type === "system" ? (
                  <p className="bg-gray-700 text-gray-400 text-sm p-3 rounded-xl text-center w-full">{msg.text}</p>
                ) : (
                  <>
                    {msg.type === "received" && <span className="text-2xl">👨‍⚕️</span>}
                    <div
                      className={`max-w-[70%] p-3 rounded-xl ${msg.type === "sent" ? "bg-cyan-600" : "bg-gray-700"}`}
                    >
                      <span className="block text-xs text-gray-300 mb-1">{msg.sender}</span>
                      <p className="text-white text-sm">{msg.text}</p>
                      <span className="block text-xs text-gray-400 mt-1">{msg.time}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-4 bg-gray-700">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-xl placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-5 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </main>

      {/* Info Card */}
      <div className="p-6 lg:hidden">
        <div className="bg-gray-800 p-5 rounded-xl text-white mb-4">
          <h4 className="font-semibold mb-3">Consultation Tips</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Ensure you're in a quiet, well-lit area</li>
            <li>• Have your medical history ready if needed</li>
            <li>• Write down any questions beforehand</li>
          </ul>
        </div>
        <a
          href="https://wa.me/23273095177"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#25d366] text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2"
        >
          💬 Technical Issues? Contact Support
        </a>
      </div>

      <WhatsAppButton />
    </div>
  )
}
