import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/login.tsx";
import Employee from "./Employee/Employee.tsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/employee" element={<Employee />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
