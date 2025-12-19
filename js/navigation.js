// Global Navigation Logic
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle for main navbar
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Dashboard mobile menu toggle
  const dashboardMenuBtn = document.getElementById("dashboardMenuBtn")
  const dashboardMobileMenu = document.getElementById("dashboardMobileMenu")

  if (dashboardMenuBtn && dashboardMobileMenu) {
    dashboardMenuBtn.addEventListener("click", () => {
      dashboardMobileMenu.classList.toggle("active")
    })
  }

  // Close mobile menus when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      mobileMenu.classList.remove("active")
    }
    if (dashboardMobileMenu && !dashboardMobileMenu.contains(e.target) && !dashboardMenuBtn?.contains(e.target)) {
      dashboardMobileMenu.classList.remove("active")
    }
  })

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#") {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements with animation classes
  document.querySelectorAll(".feature-card, .action-card, .doctor-card, .clinic-card, .facility-card").forEach((el) => {
    observer.observe(el)
  })
})

// Utility function for logout (used in multiple pages)
function logout() {
  localStorage.removeItem("salone_health_user")
  localStorage.removeItem("salone_health_role")
  window.location.href = "index.html"
}
