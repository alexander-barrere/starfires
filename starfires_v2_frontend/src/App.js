import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stargate from './pages/Stargate'; // Ensure you have these components created
import Library from './pages/Library';
import Treasures from './pages/Treasures';
import Mastery from './pages/Mastery';
import Consultations from './pages/Consultations';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stargate" element={<Stargate />} />
          <Route path="/library" element={<Library />} />
          <Route path="/treasures" element={<Treasures />} />
          <Route path="/mastery" element={<Mastery />} />
          <Route path="/consultations" element={<Consultations />} />
          {/* Define additional routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
