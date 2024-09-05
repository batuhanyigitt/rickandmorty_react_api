import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
