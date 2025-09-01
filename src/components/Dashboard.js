import { db } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Badge from '../components/Badge';
export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      const progressSnap = await getDoc(userRef);

      if (progressSnap.exists()) {
        const userData = progressSnap.data();
        setProgress(userData.progress || {});
      }
    };

    fetchData();
  }, [user]);

  const handleReturnHome = () => {
    navigate('/home');
  };

  // Calculations
  const averageScore =
    progress?.totalQuestions && progress?.totalScore
      ? ((progress.totalScore / progress.totalQuestions) * 100).toFixed(2)
      : "0.00";

  let bestQuiz = null;
  if (progress?.quizHistory && Array.isArray(progress.quizHistory)) {
    bestQuiz = progress.quizHistory.reduce((best, current) => {
      const currentPercentage = current.totalQuestions
        ? current.score / current.totalQuestions
        : 0;
      const bestPercentage = best.totalQuestions
        ? best.score / best.totalQuestions
        : 0;
      return currentPercentage > bestPercentage ? current : best;
    }, progress.quizHistory[0]);
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-info">
          <img
            className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt="Default Avatar"
          />
          <div>
            <h2 className="dashboard-title">Welcome 👋</h2>
            <p className="dashboard-subtitle">
              Logged in as: <strong>{user?.email || 'User'}</strong>
            </p>
          </div>
        </div>

        <button onClick={handleReturnHome} className="return-home-btn">
          ⬅ Return Home
        </button>
      </div>

      {progress && (
  <div className="badges-section">
    <h3>Your Badges</h3>
    {Array.isArray(progress.badges) && progress.badges.length > 0 ? (
      <ul className="badges-list">
        {progress.badges.map((badge, idx) => (
          <li key={idx} className="badge-item">
            🏅 {badge}
          </li>
        ))}
      </ul>
    ) : (
      <p>No badges earned yet.</p>
    )}
  </div>
)}


        {progress && (
  <div className="level-section">
    <h3>Your Level</h3>
    <p className="level-value">{progress.level || 1}</p>
  </div>
)}

      {progress ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Quizzes Completed</p>
              <p className="stat-value">{progress.quizzesCompleted || 0}</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Total Questions Answered</p>
              <p className="stat-value">{progress.totalQuestions || 0}</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Total Score</p>
              <p className="stat-value">{progress.totalScore || 0}</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Average Score</p>
              <p className="stat-value">{averageScore}%</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Favorite Topic</p>
              <p className="stat-value">{progress.bestTopic || 'N/A'}</p>
            </div>

            <div className="stat-card">
              <p className="stat-label">Best Quiz Performance</p>
              {bestQuiz ? (
                <p className="stat-value">
                  {bestQuiz.topic} ({((bestQuiz.score / bestQuiz.totalQuestions) * 100).toFixed(2)}%)
                </p>
              ) : (
                <p className="stat-value">N/A</p>
              )}
            </div>
          </div>

         
        </>
      ) : (
        <p className="loading-message">Loading statistics...</p>
      )}
    </div>
  );
}
