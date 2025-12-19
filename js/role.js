// Role Selection Logic
function selectRole(role) {
  // Store the selected role
  localStorage.setItem("salone_health_role", role)

  // Redirect to appropriate dashboard
  if (role === "patient") {
    window.location.href = "patient.html"
  } else if (role === "doctor") {
    window.location.href = "doctor.html"
  }
}

// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("salone_health_user")

  if (!user) {
    // Redirect to auth if not logged in
    window.location.href = "auth.html"
  }
})
