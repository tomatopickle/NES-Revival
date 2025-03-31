// App.jsx
import React from "react";
import { BrowserRouter as HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

const App = () => {
  return (
    <HashRouter basename='/NES-Revival'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
