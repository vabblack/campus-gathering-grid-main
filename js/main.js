
// Sample event data
const events = [
  {
    id: 1,
    title: "Tech Startup Showcase",
    description: "Network with innovative student startups and see their cutting-edge projects in action.",
    date: "2023-09-15",
    time: "3:00 PM - 7:00 PM",
    location: "Innovation Center, Main Campus",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Technology",
    featured: true,
    ticketPrice: 0
  },
  {
    id: 2,
    title: "International Food Festival",
    description: "Experience culinary delights from around the world prepared by student cultural organizations.",
    date: "2023-09-20",
    time: "12:00 PM - 4:00 PM",
    location: "University Quad",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
    category: "Cultural",
    featured: true,
    ticketPrice: 5
  },
  {
    id: 3,
    title: "Fall Music Concert",
    description: "Annual concert featuring performances from all university musical groups and special guest artists.",
    date: "2023-10-05",
    time: "7:30 PM - 10:00 PM",
    location: "University Auditorium",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Arts",
    featured: true,
    ticketPrice: 10
  },
  {
    id: 4,
    title: "Research Symposium",
    description: "Undergraduate and graduate students present their research findings across all disciplines.",
    date: "2023-09-25",
    time: "10:00 AM - 4:00 PM",
    location: "Science Building",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Academic",
    featured: false,
    ticketPrice: 0
  },
  {
    id: 5,
    title: "Volunteer Fair",
    description: "Connect with local non-profits and community organizations to find volunteer opportunities.",
    date: "2023-10-10",
    time: "11:00 AM - 2:00 PM",
    location: "Student Union",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Community",
    featured: false,
    ticketPrice: 0
  },
  {
    id: 6,
    title: "Homecoming Game",
    description: "Annual homecoming football game against our biggest rivals. Pre-game tailgate included!",
    date: "2023-10-15",
    time: "1:00 PM - 5:00 PM",
    location: "University Stadium",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Sports",
    featured: true,
    ticketPrice: 15
  },
  {
    id: 7,
    title: "Career & Internship Fair",
    description: "Meet with recruiters from top companies looking to hire students for jobs and internships.",
    date: "2023-09-28",
    time: "10:00 AM - 3:00 PM",
    location: "Recreation Center",
    image: "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Career",
    featured: false,
    ticketPrice: 0
  },
  {
    id: 8,
    title: "Environmental Film Festival",
    description: "Screening of documentaries focused on environmental issues followed by panel discussions.",
    date: "2023-10-08",
    time: "6:00 PM - 9:00 PM",
    location: "Film Studies Building",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    category: "Arts",
    featured: false,
    ticketPrice: 5
  },
  {
    id: 9,
    title: "Wellness Workshop",
    description: "Learn stress management techniques, mindfulness practices, and healthy habits for student life.",
    date: "2023-10-12",
    time: "2:00 PM - 4:00 PM",
    location: "Health Center",
    image: "https://images.unsplash.com/photo-1598387181942-6ab202651504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    category: "Wellness",
    featured: false,
    ticketPrice: 0
  }
];

// Get unique categories from events data
const categories = ['All', ...new Set(events.map(event => event.category))];

document.addEventListener('DOMContentLoaded', function() {
  // Toggle mobile menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const isVisible = mobileMenu.classList.contains('hidden');
      
      if (isVisible) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
  }

  // Load featured events
  const featuredEventsContainer = document.getElementById('featured-events');
  if (featuredEventsContainer) {
    const featuredEvents = events.filter(event => event.featured);
    featuredEvents.forEach(event => {
      featuredEventsContainer.appendChild(createEventCard(event));
    });
  }

  // Create category filters
  const categoryFiltersContainer = document.getElementById('category-filters');
  if (categoryFiltersContainer) {
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = `px-4 py-2 text-sm font-medium rounded-full ${category === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`;
      button.textContent = category;
      button.setAttribute('data-category', category);
      button.addEventListener('click', filterEventsByCategory);
      categoryFiltersContainer.appendChild(button);
    });
  }

  // Load all events initially
  loadEvents('All');
});

function filterEventsByCategory(e) {
  const category = e.target.getAttribute('data-category');
  
  // Update active filter button
  document.querySelectorAll('#category-filters button').forEach(button => {
    if (button.getAttribute('data-category') === category) {
      button.className = 'px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white';
    } else {
      button.className = 'px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  });
  
  loadEvents(category);
}

function loadEvents(category) {
  const eventsGrid = document.getElementById('events-grid');
  const noEventsMessage = document.getElementById('no-events');
  
  if (!eventsGrid) return;
  
  // Clear current events
  eventsGrid.innerHTML = '';
  
  // Filter events by category
  const filteredEvents = category === 'All' 
    ? events 
    : events.filter(event => event.category === category);
  
  // Show or hide "no events" message
  if (filteredEvents.length === 0) {
    noEventsMessage.classList.remove('hidden');
  } else {
    noEventsMessage.classList.add('hidden');
    
    // Add events to grid
    filteredEvents.forEach(event => {
      eventsGrid.appendChild(createEventCard(event));
    });
  }
}

function createEventCard(event) {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow-md overflow-hidden event-card';
  
  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  
  card.innerHTML = `
    <div class="relative">
      <img 
        src="${event.image}" 
        alt="${event.title}" 
        class="w-full h-48 object-cover"
      />
      ${event.featured ? '<span class="badge badge-featured absolute top-4 right-4">Featured</span>' : ''}
    </div>
    <div class="p-5">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold text-gray-900 truncate">${event.title}</h3>
      </div>
      <p class="text-gray-600 text-sm mb-4 truncate-2">${event.description}</p>
      <div class="space-y-2">
        <div class="flex items-center text-gray-500 text-sm">
          <i class="fas fa-calendar text-indigo-500 mr-2"></i>
          <span>${formattedDate}</span>
        </div>
        <div class="flex items-center text-gray-500 text-sm">
          <i class="fas fa-clock text-indigo-500 mr-2"></i>
          <span>${event.time}</span>
        </div>
        <div class="flex items-center text-gray-500 text-sm">
          <i class="fas fa-map-marker-alt text-indigo-500 mr-2"></i>
          <span class="truncate">${event.location}</span>
        </div>
        <div class="flex items-center text-gray-500 text-sm">
          <i class="fas fa-dollar-sign text-indigo-500 mr-2"></i>
          <span>${event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}</span>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <span class="badge badge-category">${event.category}</span>
        <a href="event-details.php?id=${event.id}" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
          View Details →
        </a>
      </div>
    </div>
  `;
  
  return card;
}
