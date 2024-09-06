import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { ToastContainer } from "react-toastify";
import { ErrorProvider } from "./context/ErrorContext"; 
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <ErrorProvider>
      {" "}
      <Router>
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
          </Routes>
        </div>
      </Router>
    </ErrorProvider>
  );
}

export default App;
