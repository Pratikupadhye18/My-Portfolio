// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add slide-in animations to cards
    const cards = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add slide-in-left to about text
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }

    // Add slide-in-right to about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }

    // Add slide-in-left to contact info
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.classList.add('slide-in-left');
        observer.observe(contactInfo);
    }

    // Add slide-in-right to contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('slide-in-right');
        observer.observe(contactForm);
    }
});

// Animate skill bars with random filling
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute('data-width');
            const originalWidth = targetWidth;
            
            // Generate random width between 60% and 95% of original
            const minWidth = 60;
            const maxWidth = 95;
            const randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
            
            // Reset width to 0 first
            entry.target.style.width = '0%';
            
            // Animate to random width
            setTimeout(() => {
                entry.target.style.width = randomWidth + '%';
            }, Math.random() * 500 + 100); // Random delay between 100-600ms
            
            // Stop observing this element
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach((bar, index) => {
    // Initialize all skill bars to 0 width
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate counters when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll-to-top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.background = '#4f46e5';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.background = '#6366f1';
});

// Resume functionality - Fixed Version
function viewResume() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    } else {
        console.error('Resume modal not found');
    }
}

function closeResume() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        // Add fade-out animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function downloadResume() {
    // Create a simple text-based resume for download
    const resumeContent = `
PRATIK PRAVEEN UPADHYE
AI & Data Science Engineering Student

CONTACT INFORMATION
Email: pajuupadhye1008@gmail.com
GitHub: github.com/Pratikupadhye18
LinkedIn: linkedin.com/in/pratik-upadhye-9aa77625b/
Location: Bengaluru, Karnataka, India

EDUCATION
Bachelor of Engineering in Artificial Intelligence and Data Science
Don Bosco Institute of Technology, Bengaluru, Karnataka
2022 - 2026 (Expected) | CGPA: 7.8/10.0

Pre University Course
KLE Independent PU College, Chikkodi, Karnataka
2020 - 2022 | Percentage: 83.00%

High School
Shri Arihant High School, Borgaon, Karnataka
2017 - 2020 | Percentage: 91.8%

TECHNICAL SKILLS
Programming Languages: C, C++, Python, JavaScript, SQL
Frameworks & Technologies: React.js, Node.js, Next.js, TypeScript, HTML/CSS
AI/ML & Data Science: Machine Learning, Deep Learning, Power BI, Tableau, Matlab
Databases & Tools: MySQL, MongoDB, Git/GitHub, VS Code, Kaggle

PROJECTS
AI Mock Interview
TypeScript, Next.js, Tailwind, Firebase, Vapi AI, Google Gemini
Developed a customizable AI-driven interview system with real-time feedback and scoring.

LinkNest
React, Tanstack Query, Appwrite, Tailwind CSS, Shadcn/ui
Web application for sharing and discovering photos with authentication and social features.

Paste-App
React, Vite, Tailwind CSS
Project management application for collecting and organizing information.

CERTIFICATIONS
Database Management System - Infosys Springboard (55 hours course)
Cyber Security and Hacker Tactics Awareness Training - Infosys Springboard (14 hours course)
Python Programming - GUVI (10 hours course)

ACHIEVEMENTS
Research Paper Publication - Cureus (Part of Springer Nature) | 2024
"AI-Based Leaf Disease Detection and Context-Aware Advisory System for Indian Agriculture"
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Pratik_Praveen_Upadhye_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('resumeModal');
    if (event.target === modal) {
        closeResume();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeResume();
    }
});

// Dark/Light Mode Toggle - Perfect Version with Smooth Animations
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    if (!themeToggle || !themeIcon) {
        console.log('Theme toggle elements not found');
        return;
    }
    
    // Check for saved theme preference or default to light mode
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply initial theme immediately
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get current theme
        currentTheme = body.getAttribute('data-theme') || 'light';
        
        // Toggle theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Switching from', currentTheme, 'to', newTheme);
        
        // Add smooth transition to body
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Apply new theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with rotation animation
        themeIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            updateThemeIcon(newTheme);
            themeIcon.style.transform = 'rotate(0deg)';
        }, 150);
        
        // Add button press animation
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 100);
        
        // Remove transition after animation
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#fbbf24';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '#6366f1';
        }
    }
});

// Working Contact Form with Reliable Email Delivery
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create email content
            const emailContent = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
            
            // Method 1: Try to copy to clipboard and open email client
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(emailContent).then(() => {
                    // Show success message
                    showSuccessMessage();
                    
                    // Open email client
                    const mailtoLink = `mailto:pajuupadhye1008@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
                    window.location.href = mailtoLink;
                    
                    // Reset form
                    contactForm.reset();
                }).catch(() => {
                    // Fallback if clipboard fails
                    showEmailModal(emailContent);
                });
            } else {
                // Fallback if clipboard not available
                showEmailModal(emailContent);
            }
            
            // Reset button
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        successDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle"></i>
                <span>Email content copied! Opening email client...</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 5000);
    }
    
    function showEmailModal(emailContent) {
        const emailText = `${emailContent}\n\n---\nPlease send this email to: pajuupadhye1008@gmail.com`;
        
        // Create a modal to show email content
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: #6366f1; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-envelope"></i>
                Email Content
            </h3>
            <p style="margin-bottom: 1rem; color: #6b7280;">Please copy the content below and send it to: <strong style="color: #6366f1;">pajuupadhye1008@gmail.com</strong></p>
            <textarea readonly style="width: 100%; height: 200px; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 10px; font-family: monospace; resize: vertical; background: #f9fafb;">${emailText}</textarea>
            <div style="margin-top: 1.5rem; text-align: center; display: flex; gap: 1rem; justify-content: center;">
                <button onclick="copyToClipboard('${emailText.replace(/'/g, "\\'")}')" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500;">
                    <i class="fas fa-copy"></i> Copy Text
                </button>
                <button onclick="this.parentElement.parentElement.parentElement.remove(); document.getElementById('contactForm').reset();" style="background: #6366f1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 500;">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Also try to open email client
        const mailtoLink = `mailto:pajuupadhye1008@gmail.com?subject=${encodeURIComponent(document.getElementById('subject').value)}&body=${encodeURIComponent(emailContent)}`;
        window.open(mailtoLink, '_blank');
    }
    
    // Global function for copying to clipboard
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert('✅ Text copied to clipboard!');
            }).catch(() => {
                alert('❌ Failed to copy text. Please select and copy manually.');
            });
        } else {
            alert('❌ Clipboard not available. Please select and copy manually.');
        }
    };
});
