<?php
require_once 'includes/config.php';

// Get database connection
$conn = getDBConnection();

// Test data insertion
$test_user = [
    'username' => 'test_user_' . time(),
    'email' => 'test' . time() . '@example.com',
    'password_hash' => password_hash('test123', PASSWORD_DEFAULT),
    'first_name' => 'Test',
    'last_name' => 'User'
];

// Insert test user
$sql = "INSERT INTO users (username, email, password_hash, first_name, last_name) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", 
    $test_user['username'],
    $test_user['email'],
    $test_user['password_hash'],
    $test_user['first_name'],
    $test_user['last_name']
);

if ($stmt->execute()) {
    echo "Test user inserted successfully!<br>";
    
    // Verify the insertion
    $verify_sql = "SELECT * FROM users WHERE username = ?";
    $verify_stmt = $conn->prepare($verify_sql);
    $verify_stmt->bind_param("s", $test_user['username']);
    $verify_stmt->execute();
    $result = $verify_stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo "<h3>Verified User Data:</h3>";
        echo "<pre>";
        print_r($row);
        echo "</pre>";
    }
} else {
    echo "Error inserting test user: " . $conn->error;
}

$stmt->close();
$conn->close();
?> 