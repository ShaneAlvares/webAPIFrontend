import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import SearchFlights from './FlightBookings/searchFlights';
import Cart from './FlightBookings/cart';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seachFlights" element={<SearchFlights />} />
          <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;