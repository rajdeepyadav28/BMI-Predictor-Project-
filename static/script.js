// Particle Background Animation
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.particles = []
    this.colors = ["#00bfff", "#8a2be2", "#ff69b4", "#00ffff"]

    this.resizeCanvas()
    this.createParticles()
    this.animate()

    window.addEventListener("resize", () => this.resizeCanvas())
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    const particleCount = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 15000))

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Update and draw particles
    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1

      // Draw particle
      this.ctx.save()
      this.ctx.globalAlpha = particle.opacity
      this.ctx.fillStyle = particle.color
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()
    })

    // Draw connections
    this.particles.forEach((particle, i) => {
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.ctx.save()
          this.ctx.globalAlpha = ((100 - distance) / 100) * 0.2
          this.ctx.strokeStyle = "#00bfff"
          this.ctx.lineWidth = 1
          this.ctx.beginPath()
          this.ctx.moveTo(particle.x, particle.y)
          this.ctx.lineTo(otherParticle.x, otherParticle.y)
          this.ctx.stroke()
          this.ctx.restore()
        }
      })
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Floating Card Animation
class FloatingCardAnimator {
  constructor() {
    this.observeCards()
  }

  observeCards() {
    const cards = document.querySelectorAll(".floating-card")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number.parseFloat(entry.target.dataset.delay) || 0

            setTimeout(() => {
              entry.target.classList.add("animate")
            }, delay * 1000)

            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    cards.forEach((card) => observer.observe(card))
  }
}

// Mobile Menu Toggle
class MobileMenu {
  constructor() {
    this.toggle = document.querySelector(".mobile-menu-toggle")
    this.navLinks = document.querySelector(".nav-links")

    if (this.toggle) {
      this.toggle.addEventListener("click", () => this.toggleMenu())
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.toggle.contains(e.target) && !this.navLinks.contains(e.target)) {
        this.closeMenu()
      }
    })
  }

  toggleMenu() {
    this.navLinks.classList.toggle("active")
    this.toggle.classList.toggle("active")
  }

  closeMenu() {
    this.navLinks.classList.remove("active")
    this.toggle.classList.remove("active")
  }
}

// Form Validation
class FormValidator {
  constructor() {
    this.initValidation()
  }

  initValidation() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select")

      inputs.forEach((input) => {
        input.addEventListener("blur", () => this.validateField(input))
        input.addEventListener("input", () => this.clearError(input))
      })
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const type = field.type
    const required = field.hasAttribute("required")

    this.clearError(field)

    if (required && !value) {
      this.showError(field, "This field is required")
      return false
    }

    if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        this.showError(field, "Please enter a valid email address")
        return false
      }
    }

    if (type === "number" && value) {
      const num = Number.parseFloat(value)
      const min = Number.parseFloat(field.getAttribute("min"))
      const max = Number.parseFloat(field.getAttribute("max"))

      if (isNaN(num)) {
        this.showError(field, "Please enter a valid number")
        return false
      }

      if (min !== null && num < min) {
        this.showError(field, `Value must be at least ${min}`)
        return false
      }

      if (max !== null && num > max) {
        this.showError(field, `Value must be at most ${max}`)
        return false
      }
    }

    return true
  }

  showError(field, message) {
    field.classList.add("error")

    let errorElement = field.parentNode.querySelector(".error-message")
    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.className = "error-message"
      field.parentNode.appendChild(errorElement)
    }

    errorElement.textContent = message
  }

  clearError(field) {
    field.classList.remove("error")
    const errorElement = field.parentNode.querySelector(".error-message")
    if (errorElement) {
      errorElement.remove()
    }
  }
}

// Flash Message Auto-Hide
class FlashMessageManager {
  constructor() {
    this.initAutoHide()
  }

  initAutoHide() {
    const flashMessages = document.querySelectorAll(".flash-message")

    flashMessages.forEach((message) => {
      setTimeout(() => {
        message.style.opacity = "0"
        message.style.transform = "translateX(100%)"
        setTimeout(() => message.remove(), 300)
      }, 5000)
    })
  }
}

// Scroll Progress Indicator
class ScrollProgress {
  constructor() {
    this.createProgressBar()
    this.updateProgress()
  }

  createProgressBar() {
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.innerHTML = '<div class="progress-fill"></div>'
    document.body.appendChild(progressBar)

    this.progressFill = progressBar.querySelector(".progress-fill")
  }

  updateProgress() {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      this.progressFill.style.width = `${Math.min(scrollPercent, 100)}%`
    })
  }
}

// Loading Animation
class LoadingAnimator {
  constructor() {
    this.createLoadingOverlay()
  }

  createLoadingOverlay() {
    const overlay = document.createElement("div")
    overlay.className = "loading-overlay"
    overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `

    document.body.appendChild(overlay)

    window.addEventListener("load", () => {
      setTimeout(() => {
        overlay.style.opacity = "0"
        setTimeout(() => overlay.remove(), 500)
      }, 1000)
    })
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.initSmoothScroll()
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particle system
  const canvas = document.getElementById("particleCanvas")
  if (canvas) {
    new ParticleSystem(canvas)
  }

  // Initialize other components
  new FloatingCardAnimator()
  new MobileMenu()
  new FormValidator()
  new FlashMessageManager()
  new ScrollProgress()
  new SmoothScroll()

  // Add loading animation
  if (document.readyState === "loading") {
    new LoadingAnimator()
  }

  // Add scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".glass-card, .feature-card, .stat-card")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load
})

// Utility Functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `flash-message flash-${type} floating-card`
  notification.innerHTML = `
        <div class="glass-card flash-content">
            <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-triangle" : "info-circle"}"></i>
            <span>${message}</span>
            <button class="flash-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  const container =
    document.querySelector(".flash-messages") ||
    (() => {
      const container = document.createElement("div")
      container.className = "flash-messages"
      document.body.appendChild(container)
      return container
    })()

  container.appendChild(notification)

  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  }, 5000)
}

// Export for use in other scripts
window.BMIPredictor = {
  showNotification,
  FloatingCardAnimator,
  MobileMenu,
  FormValidator,
}

        // Note: The predict section functionality is not implemented as it would require
        // actual ML model integration and backend processing. You would need to:
        // 1. Create a form for user input (height, weight, etc.)
        // 2. Send data to a backend server
        // 3. Process with ML model
        // 4. Return prediction results
