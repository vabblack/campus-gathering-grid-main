<?php
require_once 'includes/config.php';

// Get database connection
$conn = getDBConnection();

// Set header to return JSON
header('Content-Type: application/json');

// Get category filter from query parameters
$category = isset($_GET['category']) ? $_GET['category'] : 'All';
$featured = isset($_GET['featured']) ? (bool)$_GET['featured'] : false;

// Build the SQL query based on parameters
$sql = "SELECT e.*, c.name as category_name 
        FROM events e 
        JOIN categories c ON e.category_id = c.category_id 
        WHERE event_date >= CURRENT_DATE";

// Add category filter if not "All"
if ($category !== 'All') {
    $sql .= " AND c.name = '" . $conn->real_escape_string($category) . "'";
}

// Add featured filter if requested
if ($featured) {
    $sql .= " AND featured = TRUE";
}

// Order by date
$sql .= " ORDER BY event_date ASC";

// Execute query
$result = $conn->query($sql);

if (!$result) {
    die(json_encode([
        'success' => false,
        'message' => "Query failed: " . $conn->error
    ]));
}

// Fetch all events
$events = [];
while ($row = $result->fetch_assoc()) {
    // Format data for JSON response
    $events[] = [
        'id' => (int)$row['event_id'],
        'title' => $row['title'],
        'description' => $row['description'],
        'date' => $row['event_date'],
        'time' => $row['event_time'],
        'location' => $row['location'],
        'image' => $row['image_url'] ?: 'images/event-placeholder.jpg',
        'category' => $row['category_name'],
        'featured' => (bool)$row['featured'],
        'ticketPrice' => (float)$row['ticket_price']
    ];
}

// Return events as JSON
echo json_encode([
    'success' => true,
    'events' => $events
]);

// Close connection
$conn->close();
?>
