// src/App.js (or a similar main component)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/MoneyRotate';
import AboutPage from './Pages/AboutPage';
import AboutPage2 from './Pages/AboutPage2';
import AboutPage3 from './Pages/AboutPage3';

import './App.css'
import WorkSpacePage from './Pages/WorkSpacePage';
import WorkSpacePageDup from './Pages/WorkSpacePageDup';

const App = () => {
  const arr = ["/", "/about", "/about2", "/workspace", "/workspacedup"]
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {
              arr.map((item) => (
                <li className='hidden'>
                  <Link to={item}>{item}</Link>
                </li>
              ))
            }
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about2" element={<AboutPage2 />} />
          <Route path="/about3" element={<AboutPage3 />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path='/workspace' element={<WorkSpacePage />} />
          <Route path='/workspacedup' element={<WorkSpacePageDup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;