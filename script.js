// Load Upcoming Events from local images
function loadEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;
    
    // Array of event image names (UpcomingEvent1.png to UpcomingEvent10.png)
    const eventImages = [];
    for (let i = 1; i <= 10; i++) {
        eventImages.push(`images/events/UpcomingEvent${i}.png`);
    }
    
    let loadedEvents = 0;
    let eventsHtml = '';
    let validImages = [];
    
    // First, check which images exist
    eventImages.forEach((imgPath, index) => {
        const img = new Image();
        img.onload = function() {
            validImages.push(imgPath);
            loadedEvents++;
            
            if (loadedEvents === eventImages.length) {
                // All checks complete - render events
                if (validImages.length > 0) {
                    validImages.forEach((path, idx) => {
                        eventsHtml += `
                            <div class="event-card" onclick="openLightbox('${path}')">
                                <img src="${path}" alt="Upcoming Smagam ${idx + 1}" loading="lazy">
                                <div class="event-info">
                                    <h3>📅 Upcoming Smagam</h3>
                                    <p>Please join us for this blessed occasion at Guru Nanak Darbar Queenstown.</p>
                                    <p class="event-date"><i class="fas fa-map-marker-alt"></i> Queenstown, NZ</p>
                                </div>
                            </div>
                        `;
                    });
                    eventsContainer.innerHTML = eventsHtml;
                } else {
                    eventsContainer.innerHTML = `
                        <div class="coming-soon">
                            <i class="fas fa-calendar-alt" style="font-size: 3rem; color: var(--orange); margin-bottom: 1rem; display: block;"></i>
                            <h3>📢 No Upcoming Events Scheduled</h3>
                            <p>Please check back soon for Smagam and program announcements.</p>
                            <p style="margin-top: 0.5rem;">For inquiries, email us at gurunanakdarbarqueenstownnz@gmail.com</p>
                        </div>
                    `;
                }
            }
        };
        
        img.onerror = function() {
            loadedEvents++;
            if (loadedEvents === eventImages.length && validImages.length === 0) {
                eventsContainer.innerHTML = `
                    <div class="coming-soon">
                        <i class="fas fa-calendar-alt" style="font-size: 3rem; color: var(--orange); margin-bottom: 1rem; display: block;"></i>
                        <h3>📢 No Upcoming Events Scheduled</h3>
                        <p>Please check back soon for Smagam and program announcements.</p>
                        <p style="margin-top: 0.5rem;">For inquiries, email us at gurunanakdarbarqueenstownnz@gmail.com</p>
                    </div>
                `;
            }
        };
        
        img.src = imgPath;
    });
}

// Lightbox functionality
function openLightbox(imageSrc) {
    const modal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    if (modal && lightboxImage) {
        lightboxImage.src = imageSrc;
        modal.style.display = 'flex';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Lightbox close on click outside or escape key
const modal = document.getElementById('lightboxModal');
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeLightbox();
        }
    });
    
    const closeBtn = modal.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
}

// Initialize events on page load
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    
    // Add active class to current nav link
    const currentPath = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.style.color = 'var(--orange)';
        }
    });
});