// src/App.js (or a similar main component)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/MoneyRotate';
import AboutPage from './Pages/AboutPage';
// import ContactPage from './ContactPage';

import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li  className='hidden'>
              <Link to="/">Home</Link>
            </li>
            <li  className='hidden'>
              <Link to="/about">About</Link>
            </li>
            <li  className='hidden'>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;