import React, { useEffect } from "react";
import { useAuth } from "../auth/AuthContext"; // adjust the path if needed
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserProgress } from "../components/updateProgress"; // adjust path

import "./ResultsPage.css";

function ResultsPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, topic, userAnswers = [] } = location.state || {};

  const progressPercent = (score / total) * 100 || 0;

  console.log("🚀 Received answers:", userAnswers);

  useEffect(() => {
    if (user) {
      updateUserProgress(user.uid, score, total, topic);
    }
  }, [user, score, total, topic]);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Results - {topic}</h1>

        {/* Progress bar */}
        <div className="progress-bar-container">
          <div
            className={`progress-bar ${progressPercent < 50 ? "red" : ""}`}
            style={{ width: `${progressPercent}%` }}
            aria-label="Progress Bar"
          ></div>
        </div>

        <p>
          You scored <strong>{score}</strong> out of <strong>{total}</strong>
        </p>

        <button className="next-btn" onClick={() => navigate("/home")}>
          Go Home
        </button>
      </div>

      {/* Résultats détaillés */}
      <div className="quiz-card">
        {userAnswers.map((ans, idx) => (
          <div key={idx} className="result-item">
            <h3>Q{idx + 1}: {ans.question}</h3>

            <p>
              ✅ Correct Answer: <strong>{ans.correctAnswer}</strong>
            </p>

            <p
              style={{
                color: ans.selectedAnswer === ans.correctAnswer ? "green" : "red",
              }}
            >
              🧠 Your Answer: <strong>{ans.selectedAnswer}</strong>
            </p>

            {/* 🔴 Afficher explication seulement si la réponse est fausse */}
            {ans.selectedAnswer !== ans.correctAnswer && ans.explanation && (
              <p style={{ marginTop: "0.5rem", fontStyle: "italic", color: "black" }}>
                📝 Explanation: {ans.explanation}
              </p>
            )}

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;
