<?php
require_once 'includes/config.php';

// Get database connection
$conn = getDBConnection();

// Function to check table contents
function checkTable($conn, $tableName) {
    $sql = "SELECT * FROM $tableName";
    $result = $conn->query($sql);
    
    echo "<h2>Contents of $tableName table:</h2>";
    if ($result->num_rows > 0) {
        echo "<table border='1'>";
        // Get column names
        $first_row = $result->fetch_assoc();
        echo "<tr>";
        foreach ($first_row as $key => $value) {
            echo "<th>$key</th>";
        }
        echo "</tr>";
        
        // Reset pointer
        $result->data_seek(0);
        
        // Output data
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>$value</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "No data found in $tableName table<br>";
    }
    echo "<br>";
}

// Check each table
$tables = ['users', 'events', 'categories', 'registrations', 'comments', 'ratings', 'notifications'];
foreach ($tables as $table) {
    checkTable($conn, $table);
}

$conn->close();
?> 