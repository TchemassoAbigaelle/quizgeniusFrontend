import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="info-panel">
          <h1>Welcome to QuizGenius</h1>
          <p>
            QuizGenius is your personalized quiz platform. Challenge yourself,
            improve your knowledge, and track your progress with intelligent
            feedback powered by AI.
          </p>
          <ul>
            <li>✅ Create and take quizzes on any topic</li>
            <li>📊 View progress and statistics</li>
            <li>🤖 Generate AI-based questions instantly</li>
          </ul>
        </div>

        <div className="login-form-panel">
          <div className="form-box">
            <h2>Login to Continue</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <p onClick={() => navigate("/register")}>
              Don't have an account? <strong>Register</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
