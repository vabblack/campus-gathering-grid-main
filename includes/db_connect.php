
<?php
// Database connection class

class Database {
    private $host = "localhost";
    private $username = "username";
    private $password = "password";
    private $database = "campus_events";
    private $conn;
    
    // Constructor establishes database connection
    public function __construct() {
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
            
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
            
            // Set charset to ensure proper encoding
            $this->conn->set_charset("utf8mb4");
        } catch (Exception $e) {
            error_log("Database Connection Error: " . $e->getMessage());
            die("Database connection failed. Please try again later.");
        }
    }
    
    // Method to get the database connection
    public function getConnection() {
        return $this->conn;
    }
    
    // Method to run a query and return result
    public function query($sql) {
        try {
            $result = $this->conn->query($sql);
            
            if (!$result) {
                throw new Exception("Query failed: " . $this->conn->error);
            }
            
            return $result;
        } catch (Exception $e) {
            error_log("Database Query Error: " . $e->getMessage());
            return false;
        }
    }
    
    // Method to prepare statements
    public function prepare($sql) {
        try {
            $stmt = $this->conn->prepare($sql);
            
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $this->conn->error);
            }
            
            return $stmt;
        } catch (Exception $e) {
            error_log("Database Prepare Error: " . $e->getMessage());
            return false;
        }
    }
    
    // Method to escape strings
    public function escape($string) {
        return $this->conn->real_escape_string($string);
    }
    
    // Method to get the last inserted ID
    public function getLastInsertId() {
        return $this->conn->insert_id;
    }
    
    // Method to close the connection
    public function close() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
    
    // Method to begin a transaction
    public function beginTransaction() {
        $this->conn->begin_transaction();
    }
    
    // Method to commit a transaction
    public function commit() {
        $this->conn->commit();
    }
    
    // Method to rollback a transaction
    public function rollback() {
        $this->conn->rollback();
    }
}
?>
