import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data'; // Assuming your questions are in data.js

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracks the selected answer for each question
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // State to show the correct answer if wrong is selected
  const [quizCompleted, setQuizCompleted] = useState(false); // State to track if the quiz is completed

  const question = data[index];

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelectedAnswer(null); // Reset the selected answer for the next question
      setShowCorrectAnswer(false); // Reset the correct answer display for the next question
    } else {
      setQuizCompleted(true); // Mark the quiz as completed when the last question is answered
    }
  };

  const handlePlayAgain = () => {
    setIndex(0); // Reset to the first question
    setScore(0); // Reset the score
    setSelectedAnswer(null); // Reset the selected answer
    setShowCorrectAnswer(false); // Reset the correct answer display
    setQuizCompleted(false); // Reset quiz completion state
  };

  const checkAns = (selectedOption) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    setSelectedAnswer(selectedOption);

    if (selectedOption === question.correctAnswer) {
      setScore(score + 1); // Increase score for correct answer
    } else {
      setShowCorrectAnswer(true); // Show the correct answer if the selected option is wrong
    }
  };

  return (
    <div className="quiz-container">
      <h1>Simple Quiz</h1>
      <hr />
      {!quizCompleted ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            {question.options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => checkAns(option)}
                className={
                  selectedAnswer === option
                    ? option === question.correctAnswer
                      ? 'correct'
                      : 'wrong'
                    : ''
                }
              >
                {option}
              </li>
            ))}
          </ul>
          {showCorrectAnswer && (
            <p className="correct-answer">
              The correct answer is: <strong>{question.correctAnswer}</strong>
            </p>
          )}
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            Next
          </button>
          <h3 className="result">Score: {score}</h3>
        </>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <h3>Your Score: {score}</h3>
          <button className="next-btn" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
