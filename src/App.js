// src/App.js (or a similar main component)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/MoneyRotate';
import AboutPage from './Pages/AboutPage';
import AboutPage2 from './Pages/AboutPage2';
import AboutPage3 from './Pages/AboutPage3';

import './App.css'
import WorkSpacePage from './Pages/WorkSpacePage';

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
              <Link to="/about2">Contact</Link>
            </li>
            <li  className='hidden'>
              <Link to="/workspace">WorkSpace</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about2" element={<AboutPage2 />} />
          <Route path="/about3" element={<AboutPage3 />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path='/workspace' element={<WorkSpacePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;