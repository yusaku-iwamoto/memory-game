import React, { useState, useEffect } from 'react';
import Card from './Card';

function Board({ vehicles, onMatch, onMismatch }) {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstId, secondId] = flipped;
      const firstCard = vehicles.find(vehicle => vehicle.uniqueId === firstId);
      const secondCard = vehicles.find(vehicle => vehicle.uniqueId === secondId);

      if (firstCard.name === secondCard.name) {
        setTimeout(() => {
          setMatched(prev => [...prev, firstId, secondId]);
          setFlipped([]);
          onMatch();
          setCanFlip(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlipped([]);
          onMismatch();
          setCanFlip(true);
        }, 1000);
      }
      setCanFlip(false);
    }
  }, [flipped, vehicles, onMatch, onMismatch]);

  const handleCardClick = (id) => {
    if (!canFlip || flipped.includes(id) || matched.includes(id)) return;

    setFlipped(prev => {
      if (prev.length === 1) {
        setCanFlip(false);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="board">
      {vehicles.map((vehicle) => (
        <Card
          key={vehicle.uniqueId}
          id={vehicle.uniqueId}
          image={vehicle.image}
          name={vehicle.name}
          isFlipped={flipped.includes(vehicle.uniqueId) || matched.includes(vehicle.uniqueId)}
          onClick={() => handleCardClick(vehicle.uniqueId)}
        />
      ))}
    </div>
  );
}

export default Board;