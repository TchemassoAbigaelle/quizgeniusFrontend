import React, { useState } from "react";
import "./QuizSelectionPage.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function QuizSelectionPage() {
  const navigate = useNavigate();

  const [difficulties, setDifficulties] = useState({});
  const [loadingTopic, setLoadingTopic] = useState(null);

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

  const handleDifficultyChange = (topic, level) => {
    setDifficulties(prev => ({ ...prev, [topic]: level }));
  };

  const handleQuizClick = async (topic) => {
    if (loadingTopic) return; // Prevent multiple clicks

    setLoadingTopic(topic);
    const selectedDifficulty = difficulties[topic] || "Beginner";

    try {
      const response = await axios.post('http://localhost:5000/generate-questions', { topic, difficulty: selectedDifficulty });
      const questions = response.data.questions;
      navigate("/startquiz", { state: { questions, topic, difficulty: selectedDifficulty } });
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoadingTopic(null);
    }
  };

  const topics = ["Math Basics", "English", "Biology", "C programming", "Literature"];

  return (
    <div className="quiz-selection-container">

      <div style={{ marginBottom: "1rem" }}>
        <Link to="/home" className="back-home-link" style={{ textDecoration: "none", color: "#007bff" }}>
          ← Back to Home
        </Link>
      </div>

      <h2>Choose a Quiz and Difficulty</h2>

      {topics.map(topic => {
        const isLoading = loadingTopic === topic;

        return (
          <div key={topic} className={`quiz-option-container ${isLoading ? "loading" : ""}`}>
            <div
              className="quiz-option"
              onClick={() => !isLoading && handleQuizClick(topic)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if(e.key === 'Enter' && !isLoading) handleQuizClick(topic); }}
              aria-disabled={isLoading}
            >
              {topic}
            </div>

            {isLoading && <div className="loading-indicator" aria-label="Loading spinner"></div>}

            <select
              className="difficulty-select"
              value={difficulties[topic] || "Beginner"}
              onChange={(e) => handleDifficultyChange(topic, e.target.value)}
              disabled={isLoading}
            >
              {difficultyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}

export default QuizSelectionPage;
