import React from 'react';

function AnswerButton({ answer, onClick, isCorrect, isSelected, disabled }) {
  let className = 'answer-button';

  if (isSelected) {
    className += isCorrect ? ' correct' : ' incorrect';
  }

  const answerWithEmoji = `${answer} ${
    isSelected ? (isCorrect ? '✅' : '❌') : ''
  }`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      dangerouslySetInnerHTML={{ __html: answerWithEmoji }}
    />
  );
}

export default AnswerButton;
