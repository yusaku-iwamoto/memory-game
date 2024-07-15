import React from 'react';

function DifficultySelector({ onSelect }) {
  return (
    <div className="difficulty-selector">
      <button onClick={() => onSelect('EASY')}>初級</button>
      <button onClick={() => onSelect('MEDIUM')}>中級</button>
      <button onClick={() => onSelect('HARD')}>上級</button>
    </div>
  );
}

export default DifficultySelector;