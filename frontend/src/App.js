import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
export default function App() {
  return (
    <BrowserRouter>
    <div className="max-h-screen items-center">
      <Routes>
          <Route path="/" index element={<Home />} />
      </Routes>
</div>
    </BrowserRouter>
  );
}
