// DOM Elements
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const contactForm = document.getElementById("contactForm")
const modal = document.getElementById("formModal")
const navLinks = document.querySelectorAll(".nav-link")
const pageSections = document.querySelectorAll(".page-section")
const galleryTabs = document.querySelectorAll(".gallery-tab")
const galleryItems = document.querySelectorAll(".gallery-item")

// Page Navigation System
function navigateToPage(pageName) {
    // Hide all sections
    pageSections.forEach((section) => {
        section.classList.remove("active")
    })

    // Show target section with delay for smooth transition
    const targetSection = document.getElementById(pageName)
    if (targetSection) {
        setTimeout(() => {
            targetSection.classList.add("active")
        }, 100)
    }

    // Update active nav link
    navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.dataset.page === pageName) {
            link.classList.add("active")
        }
    })

    // Update URL hash
    window.location.hash = pageName

    // Close mobile menu if open
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
}

// Navigation click handlers
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        const pageName = link.dataset.page
        navigateToPage(pageName)
    })
})

document.addEventListener("DOMContentLoaded", setupSmoothScroll);

// Gallery Filter System
function filterGallery(category) {
    galleryItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
            item.style.display = "block"
            setTimeout(() => {
                item.style.opacity = "1"
                item.style.transform = "scale(1)"
            }, 100)
        } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(() => {
                item.style.display = "none"
            }, 300)
        }
    })
}

// Gallery tab click handlers
galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        // Remove active class from all tabs
        galleryTabs.forEach((t) => t.classList.remove("active"))
        // Add active class to clicked tab
        tab.classList.add("active")
        // Filter gallery
        const category = tab.dataset.category
        filterGallery(category)
    })
})

// Welcome message with user's name
function updateWelcomeMessage() {
    const welcomeElement = document.getElementById("welcome-message")
    const userName = localStorage.getItem("userName")

    if (userName) {
        welcomeElement.textContent = `Hi, ${userName}!`
    } else {
        // Prompt for user's name if not stored
        const name = prompt("Siapa nama Anda?")
        if (name && name.trim() !== "") {
            localStorage.setItem("userName", name.trim())
            welcomeElement.textContent = `Hi, ${name.trim()}!`
        } else {
            welcomeElement.textContent = "Hi, Selamat Datang!"
        }
    }
}

// CTA button scroll to services
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Form validation functions
function validateName(name) {
    return name.trim().length >= 2
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-+()]{10,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
}

function validateMessage(message) {
    return message.trim().length >= 10
}

function validateService(service) {
    return service.trim().length > 0
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "Error")

    if (field && errorElement) {
        field.classList.add("error")
        errorElement.textContent = message
    }
}

// Clear error message
function clearError(fieldId) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "Error")

    if (field && errorElement) {
        field.classList.remove("error")
        errorElement.textContent = ""
    }
}

// Real-time validation
function setupFormValidation() {
    const namaField = document.getElementById("nama")
    const emailField = document.getElementById("email")
    const nohpField = document.getElementById("nohp")
    const pesanField = document.getElementById("pesan")
    const layananField = document.getElementById("layanan")

    if (namaField) {
        namaField.addEventListener("input", function () {
            if (this.value.trim().length > 0) {
                if (validateName(this.value)) {
                    clearError("nama")
                } else {
                    showError("nama", "Nama harus minimal 2 karakter")
                }
            } else {
                clearError("nama")
            }
        })
    }

    if (emailField) {
        emailField.addEventListener("input", function () {
            if (this.value.trim().length > 0) {
                if (validateEmail(this.value)) {
                    clearError("email")
                } else {
                    showError("email", "Format email tidak valid")
                }
            } else {
                clearError("email")
            }
        })
    }

    if (nohpField) {
        nohpField.addEventListener("input", function () {
            if (this.value.trim().length > 0) {
                if (validatePhone(this.value)) {
                    clearError("nohp")
                } else {
                    showError("nohp", "Nomor HP harus 10-15 digit")
                }
            } else {
                clearError("nohp")
            }
        })
    }

    if (pesanField) {
        pesanField.addEventListener("input", function () {
            if (this.value.trim().length > 0) {
                if (validateMessage(this.value)) {
                    clearError("pesan")
                } else {
                    showError("pesan", "Pesan harus minimal 10 karakter")
                }
            } else {
                clearError("pesan")
            }
        })
    }

    if (layananField) {
        layananField.addEventListener("change", function () {
            if (validateService(this.value)) {
                clearError("layanan")
            } else {
                showError("layanan", "Pilih jenis layanan")
            }
        })
    }
}

// Form submission
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
        nama: document.getElementById('nama').value.trim(),
        email: document.getElementById('email').value.trim(),
        nohp: document.getElementById('nohp').value.trim(),
        pesan: document.getElementById('pesan').value.trim()
    };

    // Clear previous errors
    ['nama', 'email', 'nohp', 'pesan'].forEach(field => clearError(field));

    // Validate all fields
    let isValid = true;

    if (!validateName(formData.nama)) {
        showError('nama', 'Nama harus minimal 2 karakter');
        isValid = false;
    }

    if (!validateEmail(formData.email)) {
        showError('email', 'Format email tidak valid');
        isValid = false;
    }

    if (!validatePhone(formData.nohp)) {
        showError('nohp', 'Nomor HP harus 10-15 digit');
        isValid = false;
    }

    if (!validateMessage(formData.pesan)) {
        showError('pesan', 'Pesan harus minimal 10 karakter');
        isValid = false;
    }

    // If form is valid, show the submitted data
    if (isValid) {
        displayFormResult(formData);
        contactForm.reset();
    }
});

// Display form result in modal
function displayFormResult(data) {
    const resultDiv = document.getElementById('formResult');

    resultDiv.innerHTML = `
                <div style="background: #f0f9ff; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #2563eb;">
                    <h4 style="color: #1e40af; margin-bottom: 1rem;">Data yang Anda kirim:</h4>
                    <div style="margin-bottom: 0.8rem;">
                        <strong>Nama:</strong> ${data.nama}
                    </div>
                    <div style="margin-bottom: 0.8rem;">
                        <strong>Email:</strong> ${data.email}
                    </div>
                    <div style="margin-bottom: 0.8rem;">
                        <strong>No. HP:</strong> ${data.nohp}
                    </div>
                    <div style="margin-bottom: 0.8rem;">
                        <strong>Pesan:</strong><br>
                        <div style="background: white; padding: 1rem; border-radius: 5px; margin-top: 0.5rem; border: 1px solid #e5e7eb;">
                            ${data.pesan}
                        </div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: #ecfdf5; border-radius: 5px; border: 1px solid #10b981;">
                        <p style="color: #059669; margin: 0;">
                            <i class="fas fa-check-circle"></i> 
                            Terima kasih! Pesan Anda telah diterima. Tim kami akan menghubungi Anda segera.
                        </p>
                    </div>
                </div>
            `;

    modal.style.display = 'block';
}

// Close modal function
function closeModal() {
    modal.style.display = "none"
}

// Navbar background change on scroll
function setupScrollEffects() {
    let lastScrollTop = 0
    const navbar = document.querySelector(".navbar")

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        // Change navbar background based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)"
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)"
            navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
        }

        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = "translateY(-100%)"
        } else {
            // Scrolling up
            navbar.style.transform = "translateY(0)"
        }

        lastScrollTop = scrollTop
    })
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        })
    })
}

// Add click effects for buttons
function setupButtonEffects() {
    // CTA buttons click effect
    document.querySelectorAll(".cta-button, .service-btn, .discount-btn, .submit-btn").forEach((button) => {
        button.addEventListener("click", function () {
            this.style.transform = "scale(0.95)"
            setTimeout(() => {
                this.style.transform = ""
            }, 150)
        })
    })
}

// Intersection Observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    // Observe elements for animation
    document
        .querySelectorAll(".service-card, .pricing-card, .discount-card, .gallery-item, .contact-item")
        .forEach((el) => {
            el.style.opacity = "0"
            el.style.transform = "translateY(30px)"
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
            observer.observe(el)
        })
}

// Statistics counter animation
function setupCounterAnimation() {
    const counters = document.querySelectorAll(".stat-number")
    const speed = 200 // The lower the slower

    const countUp = (counter) => {
        const target = Number.parseInt(counter.textContent.replace(/[^\d]/g, ""))
        const increment = target / speed
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[\d,]+/, target.toLocaleString())
                clearInterval(timer)
            } else {
                counter.textContent = counter.textContent.replace(/[\d,]+/, Math.floor(current).toLocaleString())
            }
        }, 1)
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                countUp(entry.target)
                observer.unobserve(entry.target)
            }
        })
    })

    counters.forEach((counter) => {
        observer.observe(counter)
    })
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]")

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target
                img.src = img.dataset.src
                img.classList.remove("lazy")
                imageObserver.unobserve(img)
            }
        })
    })

    images.forEach((img) => imageObserver.observe(img))
}

// Error handling for images
function setupImageErrorHandling() {
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", function () {
            this.src = "/placeholder.svg?height=300&width=400&text=Image+Not+Found"
            this.alt = "Image not available"
        })
    })
}

// Toggle Services Functionality
let servicesExpanded = false

function toggleAllServices() {
    const additionalServices = document.getElementById("additionalServices")
    const toggleBtn = document.getElementById("toggleServicesBtn")
    const toggleText = toggleBtn.querySelector(".toggle-text")
    const toggleIcon = toggleBtn.querySelector(".toggle-icon")

    if (!servicesExpanded) {
        // Show additional services
        additionalServices.classList.remove("hidden")
        additionalServices.classList.add("visible")

        // Update button
        toggleText.textContent = "Sembunyikan Layanan"
        toggleIcon.classList.add("fa-chevron-up")
        toggleIcon.classList.remove("fa-chevron-down")
        toggleBtn.classList.add("expanded")

        // Smooth scroll to additional services
        setTimeout(() => {
            additionalServices.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }, 100)

        servicesExpanded = true
    } else {
        // Hide additional services
        additionalServices.classList.remove("visible")
        additionalServices.classList.add("hidden")

        // Update button
        toggleText.textContent = "Lihat Semua Layanan"
        toggleIcon.classList.add("fa-chevron-down")
        toggleIcon.classList.remove("fa-chevron-up")
        toggleBtn.classList.remove("expanded")

        // Scroll back to toggle button
        setTimeout(() => {
            toggleBtn.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }, 100)

        servicesExpanded = false
    }
}

// Initialize services on page load
function initializeServices() {
    const additionalServices = document.getElementById("additionalServices")
    if (additionalServices) {
        additionalServices.classList.add("hidden")
    }
}

// Image Modal Functions
function openImageModal(button) {
    const modal = document.getElementById("imageModal")
    const modalImage = document.getElementById("modalImage")
    const modalTitle = document.getElementById("modalTitle")
    const modalDescription = document.getElementById("modalDescription")

    const galleryItem = button.closest(".gallery-item")
    const img = galleryItem.querySelector("img")
    const info = galleryItem.querySelector(".gallery-info")

    modalImage.src = img.src
    modalImage.alt = img.alt
    modalTitle.textContent = info.querySelector("h4").textContent
    modalDescription.textContent = info.querySelector("p").textContent

    modal.style.display = "block"
    document.body.style.overflow = "hidden"
}

function closeImageModal() {
    const modal = document.getElementById("imageModal")
    modal.style.display = "none"
    document.body.style.overflow = "auto"
}

// Setup Gallery Functionality
function setupGalleryHandlers() {
    const galleryTabs = document.querySelectorAll(".gallery-tab")

    galleryTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs
            galleryTabs.forEach((t) => t.classList.remove("active"))
            // Add active class to clicked tab
            tab.classList.add("active")
            // Filter gallery
            const category = tab.dataset.category
            filterGallery(category)
        })
    })

    // Close modal when clicking outside the image
    const modal = document.getElementById("imageModal")
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeImageModal()
            }
        })
    }

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeImageModal()
        }
    })
}

// Location Map Interaction
function setupLocationHandlers() {
    // Add click tracking for location buttons
    const locationBtns = document.querySelectorAll(".location-btn")

    locationBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Add click animation
            this.style.transform = "scale(0.95)"
            setTimeout(() => {
                this.style.transform = ""
            }, 150)
        })
    })
}

// Update the initializeApp function to include new handlers
function initializeApp() {
    updateWelcomeMessage()
    setupFormValidation()
    setupFormSubmission()
    setupScrollEffects()
    setupSmoothScroll()
    setupButtonEffects()
    setupScrollAnimations()
    setupCounterAnimation()
    setupLazyLoading()
    setupImageErrorHandling()
    setupGalleryHandlers()
    setupLocationHandlers()

    // Check URL hash on load
    const hash = window.location.hash.substring(1)
    if (hash && document.getElementById(hash)) {
        navigateToPage(hash)
    } else {
        navigateToPage("home")
    }

    console.log("Fresh Clean Laundry website initialized successfully! 🧺✨")
}

// Add to existing initialization
document.addEventListener("DOMContentLoaded", () => {
    initializeServices()
})

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp)
} else {
    initializeApp()
}

// Global functions for inline onclick handlers
window.navigateToPage = navigateToPage
window.closeModal = closeModal
window.toggleAllServices = toggleAllServices

// Add global functions for inline handlers
window.openImageModal = openImageModal
window.closeImageModal = closeImageModal

// Export functions for potential module use
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        navigateToPage,
        closeModal,
        updateWelcomeMessage,
        validateName,
        validateEmail,
        validatePhone,
        validateMessage,
    }
}