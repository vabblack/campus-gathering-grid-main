
// Animation utility functions
document.addEventListener('DOMContentLoaded', function() {
  // Scroll reveal animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  const scrollElements = document.querySelectorAll('.scroll-reveal');
  scrollElements.forEach(el => {
    observer.observe(el);
  });

  // Staggered animations
  const staggerItems = document.querySelectorAll('.staggered-item');
  staggerItems.forEach((item, index) => {
    item.style.animationDelay = `${0.1 * index}s`;
  });

  // Event category filter functionality
  const categoryButtons = document.querySelectorAll('.category-filter button');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => {
        btn.classList.remove('glass-button', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-800');
      });
      
      // Add active class to clicked button
      this.classList.remove('bg-gray-100', 'text-gray-800');
      this.classList.add('glass-button', 'text-white');
      
      // Filter events
      const category = this.getAttribute('data-category');
      filterEvents(category);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Glass card hover effects
  const glassCards = document.querySelectorAll('.glass-card');
  glassCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 15px 30px -10px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });
});

// Function to filter events (used in the events page)
function filterEvents(category) {
  const eventCards = document.querySelectorAll('.event-card');
  const noEventsMessage = document.getElementById('no-events-message');
  let visibleCount = 0;
  
  eventCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'All' || cardCategory === category) {
      card.style.display = 'block';
      visibleCount++;
      
      // Add animation effect
      card.classList.add('animate-fade-in');
      setTimeout(() => {
        card.classList.remove('animate-fade-in');
      }, 500);
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show or hide "no events" message
  if (noEventsMessage) {
    if (visibleCount === 0) {
      noEventsMessage.classList.remove('hidden');
    } else {
      noEventsMessage.classList.add('hidden');
    }
  }
}

// Add scroll-based navbar transparency
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');
  if (navbar) {
    if (window.scrollY > 10) {
      navbar.classList.add('glass-nav', 'shadow-md');
    } else {
      navbar.classList.remove('glass-nav', 'shadow-md');
    }
  }
});

// Form validation functions
function validateEventForm() {
  const title = document.getElementById('event-title').value;
  const description = document.getElementById('event-description').value;
  const date = document.getElementById('event-date').value;
  const time = document.getElementById('event-time').value;
  const location = document.getElementById('event-location').value;
  
  let isValid = true;
  const errorMessages = document.querySelectorAll('.error-message');
  
  // Clear previous error messages
  errorMessages.forEach(msg => {
    msg.textContent = '';
  });
  
  // Validate required fields
  if (!title.trim()) {
    document.getElementById('title-error').textContent = 'Title is required';
    isValid = false;
  }
  
  if (!description.trim()) {
    document.getElementById('description-error').textContent = 'Description is required';
    isValid = false;
  }
  
  if (!date) {
    document.getElementById('date-error').textContent = 'Date is required';
    isValid = false;
  }
  
  if (!time) {
    document.getElementById('time-error').textContent = 'Time is required';
    isValid = false;
  }
  
  if (!location.trim()) {
    document.getElementById('location-error').textContent = 'Location is required';
    isValid = false;
  }
  
  return isValid;
}
