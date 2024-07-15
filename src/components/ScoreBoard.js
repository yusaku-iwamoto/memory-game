import React from 'react';

function ScoreBoard({ scores, currentPlayer }) {
  return (
    <div className="score-board">
      {scores.map((score, index) => (
        <p key={index} className={index === currentPlayer ? 'current-player' : ''}>
          プレイヤー{index + 1}: {score}点
        </p>
      ))}
    </div>
  );
}

export default ScoreBoard;