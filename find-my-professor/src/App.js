import React from 'react';
import { Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ProfessorList from './ProfessorList';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="logo">Find My Professor</div>
          <nav>
            <Link to="/">Professors</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProfessorList />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;