import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./pages/CountryList";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <Router>
      <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
        Country Information App
      </header>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
