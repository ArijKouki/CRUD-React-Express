import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Albums from './pages/Albums';
import UpdateAlbum from './pages/UpdateAlbum';
import AddAlbum from './pages/AddAlbum';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Albums />} />
        <Route path="/update/:id" element={<UpdateAlbum />} />
        <Route path="/add" element={<AddAlbum />} />
      </Routes>
    </Router>
  );
}

export default App;
