import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation'
import Home from './pages/Home'
import MapLayout from './pages/MapLayout';
import MapLayoutDetail from './pages/MapLayoutDetail';
import Footer from './components/Footer';
import Login from "./components/Login"
import Register from "./components/Register"
import AddInventory from './pages/AddInventory';
import InventoryAdded from './pages/InventoryAdded';

const App = () => {
  const [user, setLoginUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <Router>
        <Navigation user={user} setLoginUser={setLoginUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/layout" element={<MapLayout />} />
          <Route path="/zone/:ZoneName" element={<MapLayoutDetail />} />
          <Route path="/add-inventory" element={user && user._id ? (<AddInventory />) : (<Login setLoginUser={setLoginUser} />)} />
          <Route path="inventory" element={<InventoryAdded />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
