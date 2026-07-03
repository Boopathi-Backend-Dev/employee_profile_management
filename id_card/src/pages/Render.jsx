import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeList from "./EmployeeList";
import EditEmployee from "./EditEmployee";
const Render = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-employee" element={<EmployeeCreate />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/update-employee" element={<EditEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Render;
