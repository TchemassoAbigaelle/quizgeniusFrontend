import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSelectQuiz = () => {
    navigate("/quizzes");
  };

  const handleCreateQuiz = () => {
    navigate("/create");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="home-wrapper">
      <div className="home-card">
        {user && (
          <div className="user-actions">
            <p className="user-greeting">Hello, <strong>{user.email}</strong></p>
            <div className="user-buttons">
              <button onClick={handleSignOut} className="auth-btn">Sign Out</button>
              <button onClick={() => navigate("/dashboard")} className="dashboard-btn">Dashboard</button>
            </div>
          </div>
        )}
        <header className="home-header">
          <h1>Welcome to QuizGenius</h1>
          <p>Your personalized quiz platform</p>
        </header>
        <section className="home-content">
          <p>
            Choose from a variety of subjects to test your knowledge, or let us
            create a quiz based on your topic.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn" onClick={handleSelectQuiz}>
              Start Quiz
            </button>
            <button className="cta-btn" onClick={handleCreateQuiz}>
              Create Your Quiz
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
