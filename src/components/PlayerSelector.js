import React from 'react';

function PlayerSelector({ onSelect }) {
  return (
    <div className="player-selector">
      <button onClick={() => onSelect(2)}>2人プレイ</button>
      <button onClick={() => onSelect(3)}>3人プレイ</button>
      <button onClick={() => onSelect(4)}>4人プレイ</button>
    </div>
  );
}

export default PlayerSelector;
