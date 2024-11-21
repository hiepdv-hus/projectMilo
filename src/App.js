import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from './admin';
import Page from './page';
import Login from './loginAdmin'; // Import component Login
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'admin@admin' && password === 'admin@admin') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Route admin chỉ truy cập được khi đã đăng nhập */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? <Admin /> : <Navigate to="/login" replace />
            }
          />
          {/* Route login */}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          {/* Route trang chủ */}
          <Route path="/" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
