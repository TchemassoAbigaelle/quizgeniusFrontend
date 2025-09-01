// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import QuizSelectionPage from "./components/QuizSelectionPage"; 
import CreateQuizPage from "./components/CreateQuizPage.js";
import Login from "./auth/loginTemp.js";
import Register from "./auth/Register.js";
import QuizPage from "./components/QuizPage"; 
import ResultsPage from "./components/ResultsPage";
import Dashboard from "./components/Dashboard.js";
import { AuthProvider } from "./auth/AuthContext";





function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signout" element={<HomePage />} />
        <Route path="/quizzes" element={<QuizSelectionPage />} />
        <Route path="/startquiz" element={<QuizPage />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
