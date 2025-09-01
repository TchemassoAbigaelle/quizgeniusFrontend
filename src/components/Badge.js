// Badge.js
import React from "react";

const badgeIcons = {
  "Fast Learner": "⚡️",
  "Quiz Master": "🏆",
  "Consistency": "📅",
  "High Score": "⭐️",
  // ajoute d'autres badges et icônes ici
};

export default function Badge({ name }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "12px",
        padding: "6px 12px",
        margin: "4px",
        fontWeight: "600",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        cursor: "default",
        userSelect: "none",
      }}
      title={name}
    >
      <span style={{ fontSize: "20px", marginRight: "8px" }}>
        {badgeIcons[name] || "🎖"}
      </span>
      <span>{name}</span>
    </div>
  );
}
