// Stats Counter Animation
function animateCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            let currentValue;
            if (element.dataset.count.includes('.')) {
                currentValue = (progress * (end - start) + start).toFixed(1);
            } else {
                currentValue = Math.floor(progress * (end - start) + start);
            }
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseFloat(element.dataset.count);
                animateValue(element, 0, targetValue, 2000);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        stat.textContent = '0'; // Reset to 0
        observer.observe(stat);
    });
}

// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counter
    animateCounter();
    
    // Form submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your inquiry! Marci will contact you within 24 hours.');
            
            // Reset form
            inquiryForm.reset();
        });
    }
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
});