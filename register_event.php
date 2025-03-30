
<?php
// Database connection parameters
$db_host = "localhost";
$db_user = "username";
$db_pass = "password";
$db_name = "campus_events";

// Connect to database
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => "Connection failed: " . $conn->connect_error
    ]));
}

// Set header to return JSON
header('Content-Type: application/json');

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    die(json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed'
    ]));
}

// Get POST data
$eventId = isset($_POST['event_id']) ? (int)$_POST['event_id'] : 0;
$userId = isset($_POST['user_id']) ? (int)$_POST['user_id'] : 0;

// Validate input
if ($eventId <= 0 || $userId <= 0) {
    http_response_code(400); // Bad Request
    die(json_encode([
        'success' => false,
        'message' => 'Invalid event ID or user ID'
    ]));
}

// Check if user is already registered for this event
$checkSql = "SELECT * FROM registrations WHERE event_id = ? AND user_id = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("ii", $eventId, $userId);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    // User is already registered
    $checkStmt->close();
    http_response_code(409); // Conflict
    die(json_encode([
        'success' => false,
        'message' => 'You are already registered for this event'
    ]));
}
$checkStmt->close();

// Check if event has reached capacity
$capacitySql = "SELECT capacity, 
                (SELECT COUNT(*) FROM registrations WHERE event_id = ?) as registered_count 
                FROM events WHERE event_id = ?";
$capacityStmt = $conn->prepare($capacitySql);
$capacityStmt->bind_param("ii", $eventId, $eventId);
$capacityStmt->execute();
$capacityResult = $capacityStmt->get_result();

if ($capacityRow = $capacityResult->fetch_assoc()) {
    if ($capacityRow['capacity'] > 0 && $capacityRow['registered_count'] >= $capacityRow['capacity']) {
        // Event is at capacity
        $capacityStmt->close();
        http_response_code(409); // Conflict
        die(json_encode([
            'success' => false,
            'message' => 'This event has reached capacity'
        ]));
    }
}
$capacityStmt->close();

// Register user for the event
$insertSql = "INSERT INTO registrations (event_id, user_id, status) VALUES (?, ?, 'confirmed')";
$insertStmt = $conn->prepare($insertSql);
$insertStmt->bind_param("ii", $eventId, $userId);

if ($insertStmt->execute()) {
    // Create notification for user
    $notifySql = "INSERT INTO notifications (user_id, message, link) 
                  VALUES (?, 
                         (SELECT CONCAT('You are registered for ', title) FROM events WHERE event_id = ?), 
                         CONCAT('/event/', ?))";
    $notifyStmt = $conn->prepare($notifySql);
    $notifyStmt->bind_param("iii", $userId, $eventId, $eventId);
    $notifyStmt->execute();
    $notifyStmt->close();
    
    // Success response
    $insertStmt->close();
    echo json_encode([
        'success' => true,
        'message' => 'You have successfully registered for this event'
    ]);
} else {
    // Failed to register
    http_response_code(500); // Internal Server Error
    $insertStmt->close();
    echo json_encode([
        'success' => false,
        'message' => 'Failed to register for the event: ' . $conn->error
    ]);
}

// Close connection
$conn->close();
?>
