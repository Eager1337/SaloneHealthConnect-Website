// Authentication Logic
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".auth-tab")
  const forms = document.querySelectorAll(".auth-form")
  const switchForms = document.querySelectorAll(".switch-form")
  const signupForm = document.getElementById("signupForm")
  const loginForm = document.getElementById("loginForm")

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetForm = tab.dataset.tab

      tabs.forEach((t) => t.classList.remove("active"))
      forms.forEach((f) => f.classList.remove("active"))

      tab.classList.add("active")
      document.querySelector(`[data-form="${targetForm}"]`).classList.add("active")
    })
  })

  // Switch form links
  switchForms.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetForm = link.dataset.switch

      tabs.forEach((t) => {
        t.classList.toggle("active", t.dataset.tab === targetForm)
      })
      forms.forEach((f) => {
        f.classList.toggle("active", f.dataset.form === targetForm)
      })
    })
  })

  // Signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("signupName").value.trim()
    const email = document.getElementById("signupEmail").value.trim()
    const phone = document.getElementById("signupPhone").value.trim()
    const password = document.getElementById("signupPassword").value

    // Clear previous errors
    clearErrors()

    // Validation
    let isValid = true

    if (name.length < 2) {
      showError("nameError", "Please enter your full name")
      isValid = false
    }

    if (!isValidEmail(email)) {
      showError("emailError", "Please enter a valid email address")
      isValid = false
    }

    if (!isValidPhone(phone)) {
      showError("phoneError", "Please enter a valid phone number")
      isValid = false
    }

    if (password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters")
      isValid = false
    }

    if (isValid) {
      // Store user data
      const userData = {
        name,
        email,
        phone,
        password: btoa(password), // Basic encoding (NOT secure - for demo only)
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("salone_health_user", JSON.stringify(userData))

      // Redirect to role selection
      window.location.href = "role.html"
    }
  })

  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("loginEmail").value.trim()
    const password = document.getElementById("loginPassword").value

    // Clear previous errors
    clearErrors()

    // Get stored user
    const storedUser = JSON.parse(localStorage.getItem("salone_health_user"))

    if (!storedUser) {
      showError("loginEmailError", "No account found. Please sign up first.")
      return
    }

    if (email !== storedUser.email) {
      showError("loginEmailError", "Email address not found")
      return
    }

    if (btoa(password) !== storedUser.password) {
      showError("loginPasswordError", "Incorrect password")
      return
    }

    // Check for existing role
    const role = localStorage.getItem("salone_health_role")

    if (role === "patient") {
      window.location.href = "patient.html"
    } else if (role === "doctor") {
      window.location.href = "doctor.html"
    } else {
      window.location.href = "role.html"
    }
  })

  // Helper functions
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function isValidPhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return re.test(phone.replace(/\s/g, ""))
  }

  function showError(elementId, message) {
    const element = document.getElementById(elementId)
    if (element) {
      element.textContent = message
    }
  }

  function clearErrors() {
    const errors = document.querySelectorAll(".error-message")
    errors.forEach((error) => {
      error.textContent = ""
    })
  }
})
