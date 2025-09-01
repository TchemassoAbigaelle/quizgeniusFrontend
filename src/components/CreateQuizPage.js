import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreateQuizPage.css";

function CreateQuizPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert("Please enter a topic or text");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/submit-quiz", {
        topic: inputText,
        difficulty,
      });
      if (res.data.questions && res.data.questions.length > 0) {
        navigate("/startquiz", {
          state: { questions: res.data.questions, topic: inputText, difficulty },
        });
      } else {
        setError("No questions generated.");
      }
    } catch (e) {
      setError("Failed to generate questions.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-container">
      <Link to="/home" className="back-link">← Back to Home</Link>
      <h2 className="page-title">Create a Custom Quiz</h2>

      <label className="label" htmlFor="difficulty">Select Difficulty</label>
      <select
        id="difficulty"
        className="select-input"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label className="label" htmlFor="inputText">Topic or Text</label>
      <textarea
        id="inputText"
        className="input-textarea"
        rows={6}
        placeholder="Enter a topic or paste some text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        className="generate-button"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CreateQuizPage;
