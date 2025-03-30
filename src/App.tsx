
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEvent";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Index />} /> {/* Use Index page for /events too until we create a dedicated page */}
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
