import React from 'react';

function Card({ id, image, name, isFlipped, onClick }) {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">
          <img src={image} alt={name} />
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;