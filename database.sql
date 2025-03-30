
-- Database schema for Campus Events
-- This would be implemented in a real SQL database like MySQL or PostgreSQL

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_image VARCHAR(255),
    bio TEXT,
    role VARCHAR(20) DEFAULT 'user', -- 'user', 'admin', 'organizer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the categories table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    color_code VARCHAR(7) -- Hex color code
);

-- Create the events table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    ticket_price DECIMAL(10, 2) DEFAULT 0.00,
    image_url VARCHAR(255),
    category_id INT REFERENCES categories(category_id),
    organizer_id INT REFERENCES users(user_id),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'cancelled'
    capacity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the registrations table for event attendees
CREATE TABLE registrations (
    registration_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    user_id INT REFERENCES users(user_id),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'confirmed', -- 'confirmed', 'cancelled', 'waitlisted'
    UNIQUE(event_id, user_id)
);

-- Create the comments table
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    user_id INT REFERENCES users(user_id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the ratings table
CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id),
    user_id INT REFERENCES users(user_id),
    score INT NOT NULL CHECK (score BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- Create the notifications table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    message TEXT NOT NULL,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial categories
INSERT INTO categories (name, description, color_code) VALUES
('Academic', 'Lectures, workshops, and educational events', '#3B82F6'),
('Social', 'Meet-ups, parties, and social gatherings', '#EC4899'),
('Cultural', 'Cultural showcases and celebrations', '#8B5CF6'),
('Sports', 'Sporting events and competitions', '#10B981'),
('Career', 'Career fairs, networking, and professional development', '#F59E0B'),
('Workshop', 'Hands-on learning experiences', '#6366F1'),
('Concert', 'Music performances and concerts', '#EF4444');

-- Sample users
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@campus.edu', 'hashed_password_here', 'Admin', 'User', 'admin'),
('organizer1', 'organizer1@campus.edu', 'hashed_password_here', 'Event', 'Organizer', 'organizer'),
('student1', 'student1@campus.edu', 'hashed_password_here', 'Student', 'One', 'user');

-- Sample events
INSERT INTO events (title, description, event_date, event_time, location, ticket_price, category_id, organizer_id, featured) VALUES
('Tech Startup Showcase', 'Network with innovative student startups and see their cutting-edge projects in action.', '2023-09-15', '15:00:00', 'Innovation Center, Main Campus', 0.00, 1, 2, TRUE),
('International Food Festival', 'Experience culinary delights from around the world prepared by student cultural organizations.', '2023-09-20', '12:00:00', 'University Quad', 5.00, 3, 2, TRUE),
('Fall Music Concert', 'Annual concert featuring performances from all university musical groups and special guest artists.', '2023-10-05', '19:30:00', 'University Auditorium', 10.00, 7, 2, TRUE);

-- Create index for performance
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_featured ON events(featured);
CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);

-- View to get events with category names
CREATE VIEW event_details_view AS
SELECT e.*, c.name as category_name, u.username as organizer_name
FROM events e
JOIN categories c ON e.category_id = c.category_id
JOIN users u ON e.organizer_id = u.user_id;

-- Sample query to get upcoming featured events
-- SELECT * FROM events WHERE featured = TRUE AND event_date >= CURRENT_DATE ORDER BY event_date ASC LIMIT 5;

-- Sample query to get events by category
-- SELECT * FROM events WHERE category_id = 1 AND event_date >= CURRENT_DATE ORDER BY event_date ASC;

-- Sample query to get event attendees
-- SELECT u.* FROM users u JOIN registrations r ON u.user_id = r.user_id WHERE r.event_id = 1;
