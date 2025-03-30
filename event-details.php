
<?php
// This would normally get the event from a database using the ID
// For this demo, we'll just simulate it using the GET parameter

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// In a real app, this would be a database query
// For now, we'll just use a static array of hardcoded events that matches the JavaScript data
$events = [
  1 => [
    "id" => 1,
    "title" => "Tech Startup Showcase",
    "description" => "Network with innovative student startups and see their cutting-edge projects in action. This event brings together the brightest entrepreneurial minds on campus to display their tech innovations. Visitors will have the opportunity to interact with demos, talk to founders, and learn about the development process. Perfect for anyone interested in technology, entrepreneurship, or innovation.",
    "date" => "2023-09-15",
    "time" => "3:00 PM - 7:00 PM",
    "location" => "Innovation Center, Main Campus",
    "image" => "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "category" => "Technology",
    "featured" => true,
    "ticketPrice" => 0,
    "organizer" => "Student Entrepreneurs Association",
    "contactEmail" => "sea@university.edu",
    "maxAttendees" => 200,
    "currentAttendees" => 127
  ],
  2 => [
    "id" => 2,
    "title" => "International Food Festival",
    "description" => "Experience culinary delights from around the world prepared by student cultural organizations. The International Food Festival is our most popular cultural event of the year, featuring dishes from over 20 countries. Each cultural student organization prepares authentic cuisine from their represented regions, offering samples to attendees. Come hungry and ready to explore global flavors without leaving campus!",
    "date" => "2023-09-20",
    "time" => "12:00 PM - 4:00 PM",
    "location" => "University Quad",
    "image" => "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
    "category" => "Cultural",
    "featured" => true,
    "ticketPrice" => 5,
    "organizer" => "International Student Association",
    "contactEmail" => "isa@university.edu",
    "maxAttendees" => 500,
    "currentAttendees" => 342
  ],
  3 => [
    "id" => 3,
    "title" => "Fall Music Concert",
    "description" => "Annual concert featuring performances from all university musical groups and special guest artists. The Fall Music Concert showcases the talents of our university's symphony orchestra, jazz ensemble, chamber choir, and a cappella groups. This year, we're also featuring alumni guest artists who have gone on to professional music careers. The program includes classical masterpieces, contemporary arrangements, and original compositions by students.",
    "date" => "2023-10-05",
    "time" => "7:30 PM - 10:00 PM",
    "location" => "University Auditorium",
    "image" => "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "category" => "Arts",
    "featured" => true,
    "ticketPrice" => 10,
    "organizer" => "University Music Department",
    "contactEmail" => "music@university.edu",
    "maxAttendees" => 800,
    "currentAttendees" => 523
  ],
  6 => [
    "id" => 6,
    "title" => "Homecoming Game",
    "description" => "Annual homecoming football game against our biggest rivals. Pre-game tailgate included! Join thousands of current students and alumni as we cheer on our team in the biggest game of the season. The event starts with a massive tailgate party featuring food trucks, live music, and games. Show your school spirit by wearing our colors and participating in traditional homecoming celebrations before heading into the stadium for an unforgettable game.",
    "date" => "2023-10-15",
    "time" => "1:00 PM - 5:00 PM",
    "location" => "University Stadium",
    "image" => "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "category" => "Sports",
    "featured" => true,
    "ticketPrice" => 15,
    "organizer" => "Athletics Department",
    "contactEmail" => "athletics@university.edu",
    "maxAttendees" => 25000,
    "currentAttendees" => 18750
  ]
];

// Get the event if it exists
$event = isset($events[$id]) ? $events[$id] : null;

// Calculate attendance percentage for progress bar
$attendancePercentage = 0;
if ($event && $event["maxAttendees"] > 0) {
  $attendancePercentage = round(($event["currentAttendees"] / $event["maxAttendees"]) * 100);
}

// Format date
$formattedDate = "";
if ($event) {
  $eventDate = new DateTime($event["date"]);
  $formattedDate = $eventDate->format('l, F j, Y');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?php echo $event ? htmlspecialchars($event["title"]) : "Event Not Found"; ?> - Campus Events</title>
  <meta name="description" content="<?php echo $event ? htmlspecialchars(substr($event["description"], 0, 160)) : "Event details"; ?>" />
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: '#4f46e5',
              dark: '#4338ca',
              light: '#818cf8'
            }
          }
        }
      }
    }
  </script>
  <!-- Custom CSS -->
  <link rel="stylesheet" href="css/styles.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body class="bg-gray-50">
  <!-- Navigation -->
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <a href="index.html" class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="images/logo.svg" alt="Campus Events">
            <span class="ml-2 text-2xl font-bold text-indigo-600">CampusEvents</span>
          </a>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <a href="index.html" class="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Home
            </a>
            <a href="index.html#events" class="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Events
            </a>
            <a href="#" class="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Create Event
            </a>
            <a href="#" class="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              About
            </a>
          </div>
        </div>
        <div class="hidden md:flex items-center">
          <button class="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none">
            Sign In
          </button>
        </div>

        <div class="-mr-2 flex md:hidden">
          <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
            <i class="fas fa-bars h-6 w-6" id="menu-icon"></i>
          </button>
        </div>
      </div>
    </div>

    <div id="mobile-menu" class="hidden md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="index.html" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">
          Home
        </a>
        <a href="index.html#events" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">
          Events
        </a>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">
          Create Event
        </a>
        <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50">
          About
        </a>
      </div>
    </div>
  </nav>

  <main class="py-10">
    <?php if ($event): ?>
      <!-- Event Details -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <a href="index.html" class="text-indigo-600 hover:text-indigo-800 flex items-center">
            <i class="fas fa-arrow-left mr-2"></i> Back to Events
          </a>
        </div>
        
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="relative h-80 sm:h-96">
            <img 
              src="<?php echo htmlspecialchars($event["image"]); ?>" 
              alt="<?php echo htmlspecialchars($event["title"]); ?>" 
              class="w-full h-full object-cover"
            />
            <?php if ($event["featured"]): ?>
              <span class="badge badge-featured absolute top-4 right-4">Featured</span>
            <?php endif; ?>
          </div>
          
          <div class="p-6 md:p-8">
            <div class="flex flex-wrap justify-between items-start mb-4">
              <h1 class="text-3xl font-bold text-gray-900 mb-2 md:mb-0 w-full md:w-auto">
                <?php echo htmlspecialchars($event["title"]); ?>
              </h1>
              <span class="badge badge-category text-base">
                <?php echo htmlspecialchars($event["category"]); ?>
              </span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="md:col-span-2">
                <p class="text-gray-600 mb-6 text-lg">
                  <?php echo htmlspecialchars($event["description"]); ?>
                </p>
                
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
                
                <div class="bg-gray-50 rounded-lg p-5 mb-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                        <i class="fas fa-calendar text-indigo-600 text-xl"></i>
                      </div>
                      <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-500">Date</h3>
                        <p class="text-base font-medium text-gray-900"><?php echo $formattedDate; ?></p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                        <i class="fas fa-clock text-indigo-600 text-xl"></i>
                      </div>
                      <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-500">Time</h3>
                        <p class="text-base font-medium text-gray-900"><?php echo htmlspecialchars($event["time"]); ?></p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                        <i class="fas fa-map-marker-alt text-indigo-600 text-xl"></i>
                      </div>
                      <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-500">Location</h3>
                        <p class="text-base font-medium text-gray-900"><?php echo htmlspecialchars($event["location"]); ?></p>
                      </div>
                    </div>
                    
                    <div class="flex items-start">
                      <div class="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                        <i class="fas fa-dollar-sign text-indigo-600 text-xl"></i>
                      </div>
                      <div class="ml-4">
                        <h3 class="text-sm font-medium text-gray-500">Price</h3>
                        <p class="text-base font-medium text-gray-900">
                          <?php echo $event["ticketPrice"] === 0 ? 'Free' : '$' . $event["ticketPrice"]; ?>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mb-8">
                  <h2 class="text-xl font-semibold text-gray-900 mb-3">Organizer Information</h2>
                  <p class="text-gray-600 mb-2">
                    <span class="font-medium">Organized by:</span> <?php echo htmlspecialchars($event["organizer"]); ?>
                  </p>
                  <p class="text-gray-600">
                    <span class="font-medium">Contact:</span> 
                    <a href="mailto:<?php echo htmlspecialchars($event["contactEmail"]); ?>" class="text-indigo-600 hover:text-indigo-800">
                      <?php echo htmlspecialchars($event["contactEmail"]); ?>
                    </a>
                  </p>
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Register for this Event</h2>
                
                <div class="mb-6">
                  <p class="text-gray-600 mb-2 flex items-center">
                    <i class="fas fa-users text-indigo-600 mr-2"></i>
                    <span><?php echo $event["currentAttendees"]; ?> / <?php echo $event["maxAttendees"]; ?> attendees</span>
                  </p>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-indigo-600 h-2.5 rounded-full" style="width: <?php echo $attendancePercentage; ?>%"></div>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">
                    <?php echo $event["maxAttendees"] - $event["currentAttendees"]; ?> spots remaining
                  </p>
                </div>
                
                <?php if ($event["ticketPrice"] > 0): ?>
                  <p class="text-2xl font-bold text-gray-900 mb-4">
                    $<?php echo $event["ticketPrice"]; ?>
                  </p>
                <?php else: ?>
                  <p class="text-2xl font-bold text-green-600 mb-4">
                    Free Event
                  </p>
                <?php endif; ?>
                
                <form action="register.php" method="post" class="space-y-4">
                  <input type="hidden" name="event_id" value="<?php echo $event["id"]; ?>">
                  
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                  </div>
                  
                  <div>
                    <label for="tickets" class="block text-sm font-medium text-gray-700 mb-1">Number of Tickets</label>
                    <select 
                      id="tickets" 
                      name="tickets" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    class="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Register Now
                  </button>
                </form>
                
                <div class="mt-4 text-center">
                  <a href="#" class="text-sm text-indigo-600 hover:text-indigo-800">
                    Have a question? Contact the organizer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <?php else: ?>
      <!-- Event Not Found -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div class="bg-white shadow-xl rounded-lg overflow-hidden p-8">
          <i class="fas fa-exclamation-triangle text-yellow-500 text-5xl mb-4"></i>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p class="text-xl text-gray-600 mb-8">
            The event you are looking for does not exist or has been removed.
          </p>
          <a href="index.html" class="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none">
            Return to Events
          </a>
        </div>
      </div>
    <?php endif; ?>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 mt-12">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Campus Gathering Grid</h3>
          <p class="text-gray-300">Connecting students with campus events and activities.</p>
          <div class="mt-4 flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">Facebook</span>
              <i class="fab fa-facebook h-6 w-6"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">Instagram</span>
              <i class="fab fa-instagram h-6 w-6"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <span class="sr-only">Twitter</span>
              <i class="fab fa-twitter h-6 w-6"></i>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="index.html" class="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="index.html#events" class="text-gray-300 hover:text-white">All Events</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">Categories</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">Create Event</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white">About Us</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p class="text-gray-300 mb-2">Email: info@campusgrid.edu</p>
          <p class="text-gray-300 mb-2">Phone: (123) 456-7890</p>
          <p class="text-gray-300">Address: 123 University Ave, Campus City, ST 12345</p>
        </div>
      </div>
      <div class="mt-8 border-t border-gray-700 pt-8">
        <p class="text-gray-400 text-center">&copy; 2023 Campus Gathering Grid. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script>
    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
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
    });
  </script>
</body>
</html>
