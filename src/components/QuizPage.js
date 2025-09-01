// src/components/QuizPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./QuizPage.css";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [], topic = "Unknown" } = location.state || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];

  // Met à jour l'option sélectionnée lors du changement de question
  useEffect(() => {
  const newScore = answers.reduce((acc, ans) => {
    if (ans?.selectedAnswer === ans?.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  setScore(newScore);
}, [answers]);

  const handleOptionClick = (option) => {
  setSelectedOption(option);

  setAnswers((prevAnswers) => {
    const newAnswers = [...prevAnswers];
    newAnswers[currentQuestionIndex] = {
      question: currentQuestion.question,
      selectedAnswer: option,
      correctAnswer: currentQuestion.answer,
      explanation: currentQuestion.explanation,
    };
    return newAnswers;
  });
};

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      navigate("/results", {
        state: { score, total: questions.length, topic, userAnswers: answers },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleQuit = () => {
    if (window.confirm("Are you sure you want to quit the quiz?")) {
      navigate("/home");
    }
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="quiz-page">
        <h1>No question Availaible</h1>
        <button className="back-btn" onClick={() => navigate("/home")}>← Home</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/quizzes" style={{ textDecoration: "none", color: "#007bff" }}>← Back</Link>
      </div>

      <div className="quiz-header">
        <h1>{topic} Quiz</h1>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      </div>

      <div className="quiz-card">
        <h2>{currentQuestion?.question}</h2>
        <ul>
          {currentQuestion?.options.map((opt, i) => (
            <li key={i} className="quiz-option">
              <button
                className={selectedOption === opt ? "selected-option" : "option-button"}
                aria-pressed={selectedOption === opt}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="button-container">
        <button
          className="prev-btn"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
          className="next-btn"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>

        <button
          className="quit-btn"
          onClick={handleQuit}
        >
          Quit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
