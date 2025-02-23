import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ScriptGenerator from './components/ScriptGenerator';
import VideoGenerator from './components/VideoGenerator';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Script Generator</Link>
          </li>
          <li>
            <Link to="/video-generator">Video Generator</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ScriptGenerator />} />
        <Route path="/video-generator" element={<VideoGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;