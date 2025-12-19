// Teleconsultation Camera Logic
let localStream = null
let isMuted = false
let isVideoOff = false

// Go back function
function goBack() {
  const role = localStorage.getItem("salone_health_role")
  if (role === "doctor") {
    window.location.href = "doctor.html"
  } else {
    window.location.href = "patient.html"
  }
}

// Toggle camera on/off
async function toggleCamera() {
  const video = document.getElementById("localVideo")
  const placeholder = document.getElementById("videoPlaceholder")
  const cameraBtn = document.getElementById("cameraBtn")
  const muteBtn = document.getElementById("muteBtn")
  const videoToggleBtn = document.getElementById("videoToggleBtn")
  const callStatus = document.getElementById("callStatus")

  if (!localStream) {
    try {
      // Request camera and microphone access
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      video.srcObject = localStream
      video.classList.add("active")
      placeholder.classList.add("hidden")

      cameraBtn.querySelector(".btn-label").textContent = "Stop Camera"
      cameraBtn.classList.add("active")
      muteBtn.disabled = false
      videoToggleBtn.disabled = false
      callStatus.textContent = "Connected"
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera and microphone. Please grant permission and try again.")
    }
  } else {
    // Stop the stream
    stopStream()
  }
}

// Stop all media streams
function stopStream() {
  const video = document.getElementById("localVideo")
  const placeholder = document.getElementById("videoPlaceholder")
  const cameraBtn = document.getElementById("cameraBtn")
  const muteBtn = document.getElementById("muteBtn")
  const videoToggleBtn = document.getElementById("videoToggleBtn")
  const callStatus = document.getElementById("callStatus")

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop())
    localStream = null
  }

  video.srcObject = null
  video.classList.remove("active")
  placeholder.classList.remove("hidden")

  cameraBtn.querySelector(".btn-label").textContent = "Start Camera"
  cameraBtn.classList.remove("active")
  muteBtn.disabled = true
  videoToggleBtn.disabled = true
  callStatus.textContent = "Ready to Connect"

  // Reset states
  isMuted = false
  isVideoOff = false
  muteBtn.querySelector(".btn-label").textContent = "Mute"
  muteBtn.classList.remove("active")
  videoToggleBtn.querySelector(".btn-label").textContent = "Camera Off"
  videoToggleBtn.classList.remove("active")
}

// Toggle mute
function toggleMute() {
  if (!localStream) return

  const muteBtn = document.getElementById("muteBtn")
  const audioTracks = localStream.getAudioTracks()

  isMuted = !isMuted

  audioTracks.forEach((track) => {
    track.enabled = !isMuted
  })

  muteBtn.querySelector(".btn-label").textContent = isMuted ? "Unmute" : "Mute"
  muteBtn.classList.toggle("active", isMuted)
}

// Toggle video
function toggleVideo() {
  if (!localStream) return

  const videoToggleBtn = document.getElementById("videoToggleBtn")
  const videoTracks = localStream.getVideoTracks()

  isVideoOff = !isVideoOff

  videoTracks.forEach((track) => {
    track.enabled = !isVideoOff
  })

  videoToggleBtn.querySelector(".btn-label").textContent = isVideoOff ? "Camera On" : "Camera Off"
  videoToggleBtn.classList.toggle("active", isVideoOff)
}

// End session
function endSession() {
  if (confirm("Are you sure you want to end this session?")) {
    stopStream()
    goBack()
  }
}

// Chat functionality
function sendMessage() {
  const input = document.getElementById("messageInput")
  const message = input.value.trim()

  if (!message) return

  const chatMessages = document.getElementById("chatMessages")
  const now = new Date()
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const messageHTML = `
    <div class="chat-message sent">
      <div class="message-content">
        <span class="message-sender">You</span>
        <p>${escapeHtml(message)}</p>
        <span class="message-time">${time}</span>
      </div>
    </div>
  `

  chatMessages.insertAdjacentHTML("beforeend", messageHTML)
  chatMessages.scrollTop = chatMessages.scrollHeight
  input.value = ""

  // Simulate doctor response after 2 seconds
  setTimeout(() => {
    const responses = [
      "I understand. Could you tell me more about your symptoms?",
      "Thank you for sharing. How long have you been experiencing this?",
      "I see. Have you tried any medication for this?",
      "That's helpful information. Let me note that down.",
    ]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    const responseHTML = `
      <div class="chat-message received">
        <div class="message-avatar">👨‍⚕️</div>
        <div class="message-content">
          <span class="message-sender">Dr. Kamara</span>
          <p>${randomResponse}</p>
          <span class="message-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    `

    chatMessages.insertAdjacentHTML("beforeend", responseHTML)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }, 2000)
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage()
  }
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Clean up on page unload
window.addEventListener("beforeunload", () => {
  stopStream()
})
