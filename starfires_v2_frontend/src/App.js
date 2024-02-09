import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Treasures from './pages/Treasures';
import Library from './pages/Library';
import Mastery from './pages/Mastery';
import Consultations from './pages/Consultations';
import Stargate from './pages/Stargate';
import CartPage from './pages/CartPage';
// Import other pages components
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/treasures" element={<Treasures />} />
          <Route path="/library" element={<Library />} />
          <Route path="/mastery" element={<Mastery />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/stargate" element={<Stargate />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
