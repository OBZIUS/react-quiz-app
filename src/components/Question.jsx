import React from 'react';
import AnswerButton from './AnswerButton';

function Question({ question, onAnswerClick, selectedAnswer }) {
  return (
    <div className="question-section">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="answer-section">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer}
            onClick={() => onAnswerClick(answer)}
            isCorrect={answer === question.correctAnswer}
            isSelected={selectedAnswer === answer}
            disabled={selectedAnswer !== null}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
