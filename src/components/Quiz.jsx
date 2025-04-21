

import React, { useState, useEffect } from 'react';
import Question from './Question';
import '../styles/Quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQnIndex, setCurrentQnIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [timer, setTimer] = useState(30);
  const [timeOut, setTimeOut] = useState(false);

  // Fetch questions and load past scores
  useEffect(() => {
    fetchQuestions();
    const history = JSON.parse(localStorage.getItem('quizScores')) || [];
    setScoreHistory(history);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (questions.length === 0 || showScore || timeOut) return;

    if (timer === 0) {
      setTimeOut(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, showScore, questions, timeOut]);

  const fetchQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => {
          const answers = [...q.incorrect_answers];
          const randIndex = Math.floor(Math.random() * 4);
          answers.splice(randIndex, 0, q.correct_answer);
          return {
            question: q.question,
            answers: answers,
            correctAnswer: q.correct_answer,
          };
        });
        setQuestions(formatted);
      });
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer || timeOut) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQnIndex].correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      const nextQn = currentQnIndex + 1;
      if (nextQn < questions.length) {
        setCurrentQnIndex(nextQn);
        setSelectedAnswer(null);
        setTimer(30);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        const updatedScores = [...scoreHistory, finalScore];
        localStorage.setItem('quizScores', JSON.stringify(updatedScores));
        setScoreHistory(updatedScores);
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQnIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimeOut(false);
    setTimer(30);
    fetchQuestions();
  };

  const bestScore = Math.max(...scoreHistory, score);

  // Calculate progress as percentage
  const progressPercentage = (currentQnIndex / questions.length) * 100;

  return (
    <div className="quiz-container">
      {questions.length === 0 ? (
        <p>Loading...</p>
      ) : timeOut ? (
        <div className="score-section">
          <p>⏰ Time's up!</p>
          <p>You reached question {currentQnIndex + 1}</p>
          <button onClick={handleRestart}>Retry Quiz</button>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <p>You scored <strong>{score}</strong> out of {questions.length}</p>
          <p>📊 <strong>Score History</strong>:</p>
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            {scoreHistory.map((s, index) => (
              <li key={index} style={{
                fontWeight: s === bestScore ? 'bold' : 'normal',
                color: s === bestScore ? '#27ae60' : '#333'
              }}>
                Attempt {index + 1}: {s} / {questions.length}
                {s === bestScore && ' ⭐️ Best'}
              </li>
            ))}
          </ul>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            ⏱️ Time left: <strong>{timer}s</strong>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <Question
            question={questions[currentQnIndex]}
            selectedAnswer={selectedAnswer}
            onAnswerClick={handleAnswerClick}
          />
        </>
      )}
    </div>
  );
}

export default Quiz;




