import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEvent";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./components/SignIn";
import EventHome from "./pages/EventHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<EventHome />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
