
<?php
// This would process the registration form
// For a demo, we'll just show a confirmation message

// Get form data (with validation)
$eventId = isset($_POST['event_id']) ? intval($_POST['event_id']) : 0;
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$tickets = isset($_POST['tickets']) ? intval($_POST['tickets']) : 1;

// Validate tickets (between 1 and 5)
$tickets = max(1, min(5, $tickets));

// In a real app, we would:
// 1. Validate all inputs
// 2. Check if the event exists and has spots available
// 3. Insert into database
// 4. Send confirmation email
// 5. Redirect to confirmation page or show errors

// Sample event data for display
$events = [
  1 => [
    "title" => "Tech Startup Showcase",
    "date" => "2023-09-15",
    "time" => "3:00 PM - 7:00 PM",
    "location" => "Innovation Center, Main Campus",
    "ticketPrice" => 0
  ],
  2 => [
    "title" => "International Food Festival",
    "date" => "2023-09-20",
    "time" => "12:00 PM - 4:00 PM",
    "location" => "University Quad",
    "ticketPrice" => 5
  ],
  3 => [
    "title" => "Fall Music Concert",
    "date" => "2023-10-05",
    "time" => "7:30 PM - 10:00 PM",
    "location" => "University Auditorium",
    "ticketPrice" => 10
  ],
  6 => [
    "title" => "Homecoming Game",
    "date" => "2023-10-15",
    "time" => "1:00 PM - 5:00 PM",
    "location" => "University Stadium",
    "ticketPrice" => 15
  ]
];

// Get event details if available
$event = isset($events[$eventId]) ? $events[$eventId] : null;

// Calculate total price
$totalPrice = 0;
if ($event) {
  $totalPrice = $event["ticketPrice"] * $tickets;
}

// Format date
$formattedDate = "";
if ($event) {
  $eventDate = new DateTime($event["date"]);
  $formattedDate = $eventDate->format('l, F j, Y');
}

// Generate random confirmation code
$confirmationCode = strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Confirmation - Campus Events</title>
  <meta name="description" content="Registration confirmation for campus event" />
  
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
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <?php if ($event): ?>
        <!-- Registration Successful -->
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="bg-green-50 p-4 border-b border-green-100">
            <div class="flex">
              <div class="flex-shrink-0">
                <i class="fas fa-check-circle text-green-500 text-2xl"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-green-800">Registration Successful!</h3>
                <p class="mt-1 text-sm text-green-700">
                  Thank you for registering for this event.
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Registration Details</h2>
            
            <div class="border-t border-b border-gray-200 py-6 mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Event:</span>
                  <span class="text-gray-900 font-medium"><?php echo htmlspecialchars($event["title"]); ?></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Date:</span>
                  <span class="text-gray-900"><?php echo $formattedDate; ?></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Time:</span>
                  <span class="text-gray-900"><?php echo htmlspecialchars($event["time"]); ?></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Location:</span>
                  <span class="text-gray-900"><?php echo htmlspecialchars($event["location"]); ?></span>
                </div>
              </div>
            </div>
            
            <div class="border-b border-gray-200 py-6 mb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Attendee Information</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Name:</span>
                  <span class="text-gray-900"><?php echo $name; ?></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Email:</span>
                  <span class="text-gray-900"><?php echo $email; ?></span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Number of Tickets:</span>
                  <span class="text-gray-900"><?php echo $tickets; ?></span>
                </div>
                <?php if ($event["ticketPrice"] > 0): ?>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Price per Ticket:</span>
                    <span class="text-gray-900">$<?php echo $event["ticketPrice"]; ?></span>
                  </div>
                  <div class="flex justify-between font-semibold">
                    <span class="text-gray-800">Total Price:</span>
                    <span class="text-gray-900">$<?php echo $totalPrice; ?></span>
                  </div>
                <?php else: ?>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Price:</span>
                    <span class="text-green-600 font-medium">Free</span>
                  </div>
                <?php endif; ?>
              </div>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg mb-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Confirmation Code</h3>
                <span class="text-xl font-mono font-bold text-indigo-600"><?php echo $confirmationCode; ?></span>
              </div>
              <p class="text-sm text-gray-600 mt-2">
                Please save this confirmation code. You may need it for check-in at the event.
              </p>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <p class="text-gray-600 mb-4">
                A confirmation email has been sent to your email address with all the details of your registration.
              </p>
              <div class="flex justify-between">
                <a href="index.html" class="text-indigo-600 hover:text-indigo-800 font-medium">
                  Return to Events
                </a>
                <button onclick="window.print()" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <i class="fas fa-print mr-2"></i> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      <?php else: ?>
        <!-- Registration Error -->
        <div class="bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="bg-red-50 p-4 border-b border-red-100">
            <div class="flex">
              <div class="flex-shrink-0">
                <i class="fas fa-exclamation-circle text-red-500 text-2xl"></i>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-red-800">Registration Failed</h3>
                <p class="mt-1 text-sm text-red-700">
                  We couldn't process your registration. The event may not exist or there was an error with your submission.
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-6 text-center">
            <p class="text-gray-600 mb-6">
              Please try again or contact support if you continue to experience issues.
            </p>
            <a href="index.html" class="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none">
              Return to Events
            </a>
          </div>
        </div>
      <?php endif; ?>
    </div>
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
