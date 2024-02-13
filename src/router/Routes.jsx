// Routes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Homepage/HomePage';
import EmployeePage from '../pages/EmployeePage/EmployeePage';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
