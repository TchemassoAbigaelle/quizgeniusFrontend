import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateUserProgress = async (uid, score, totalQuestions, topic) => {
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  let progress = {};
  if (userSnap.exists()) {
    progress = userSnap.data().progress || {};
  }

  const updatedTotalScore = (progress.totalScore || 0) + score;
  const updatedTotalQuestions = (progress.totalQuestions || 0) + totalQuestions; // note the key 'totalquestions' lowercase q
  const updatedQuizzesCompleted = (progress.quizzesCompleted || 0) + 1;

  // Calculate average score as percentage
  const avgScore = updatedTotalQuestions > 0
    ? ((updatedTotalScore / updatedTotalQuestions) * 100).toFixed(2)
    : 0;

  // Update topic counts
  const topicCounts = progress.topicCounts || {};
  topicCounts[topic] = (topicCounts[topic] || 0) + 1;

  // Determine best topic (the one with highest quiz count)
  let bestTopic = progress.bestTopic || topic;
  let maxCount = 0;
  for (const t in topicCounts) {
    if (topicCounts[t] > maxCount) {
      bestTopic = t;
      maxCount = topicCounts[t];
    }
  }

  // Update quiz history
  const quizHistory = progress.quizHistory || [];
  quizHistory.push({
    topic,
    score,
    totalQuestions,
    date: new Date().toISOString()
  });

  // --------- Add badges ---------
  const badgesSet = new Set(progress.badges || []);
  if (updatedQuizzesCompleted >= 1) badgesSet.add("Beginner");
  if (updatedQuizzesCompleted >= 5) badgesSet.add("Motivated");
  if (avgScore >= 80) badgesSet.add("Accurate");
  if (updatedQuizzesCompleted >= 10 && avgScore >= 90) badgesSet.add("Expert");
  const badges = Array.from(badgesSet);

  // --------- Add level ---------
  let level = 1;
  if (updatedTotalScore >= 500) level = 4;
  else if (updatedTotalScore >= 300) level = 3;
  else if (updatedTotalScore >= 100) level = 2;

  // --------- Update progress object ---------
  const updatedProgress = {
    totalScore: updatedTotalScore,
    totalQuestions: updatedTotalQuestions,
    quizzesCompleted: updatedQuizzesCompleted,
    avgScore,
    bestTopic,
    topicCounts,
    quizHistory,
    badges,
    level
  };

  await setDoc(userRef, { progress: updatedProgress }, { merge: true });
};
