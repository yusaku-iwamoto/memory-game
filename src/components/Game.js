import React, { useState, useEffect } from 'react';
import Board from './Board';
import DifficultySelector from './DifficultySelector';
import PlayerSelector from './PlayerSelector';
import ScoreBoard from './ScoreBoard';

const DIFFICULTY_LEVELS = {
  EASY: 8,
  MEDIUM: 16,
  HARD: 24
};

const VEHICLES = [
  { id: 1, name: 'ブルドーザー', image: '/images/bulldozer.png' },
  { id: 2, name: 'ダンプカー', image: '/images/dump_truck.png' },
  { id: 3, name: 'ショベルカー', image: '/images/excavator.png' },
  { id: 4, name: 'クレーン車', image: '/images/crane_truck.png' },
  { id: 5, name: 'コンクリートミキサー車', image: '/images/concrete_mixer.png' },
  { id: 6, name: 'フォークリフト', image: '/images/forklift.png' },
  { id: 7, name: 'トラクター', image: '/images/tractor.png' },
  { id: 8, name: 'ロードローラー', image: '/images/road_roller.png' },
  { id: 9, name: '消防車', image: '/images/fire_truck.png' },
  { id: 10, name: 'パトカー', image: '/images/police_car.png' },
  { id: 11, name: '救急車', image: '/images/ambulance.png' },
  { id: 12, name: 'ゴミ収集車', image: '/images/garbage_truck.png' },
  { id: 13, name: 'スクールバス', image: '/images/school_bus.png' },
  { id: 14, name: 'タンクローリー', image: '/images/tanker_truck.png' },
  { id: 15, name: 'レッカー車', image: '/images/tow_truck.png' },
  { id: 16, name: '除雪車', image: '/images/snow_plow.png' },
  { id: 17, name: '清掃車', image: '/images/street_sweeper.png' },
  { id: 18, name: 'キャリアカー', image: '/images/car_carrier.png' },
  { id: 19, name: 'コンバインハーベスター', image: '/images/combine_harvester.png' },
  { id: 20, name: '高所作業車', image: '/images/cherry_picker.png' },
  { id: 21, name: 'タクシー', image: '/images/taxi.png' },
  { id: 22, name: 'ホイールローダー', image: '/images/wheel_loader.png' },
  { id: 23, name: 'パネルバン', image: '/images/panel_van.png' },
  { id: 24, name: '郵便車', image: '/images/mail_truck.png' }
];

function Game() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY_LEVELS.EASY);
  const [players, setPlayers] = useState(2);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState(Array(players).fill(0));
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (matchedPairs === difficulty / 2) {
      setGameEnded(true);
    }
  }, [matchedPairs, difficulty]);

  useEffect(() => {
    const shuffledVehicles = VEHICLES.sort(() => 0.5 - Math.random()).slice(0, difficulty / 2);
    const gameVehicles = [...shuffledVehicles, ...shuffledVehicles].map((vehicle, index) => ({
      ...vehicle,
      uniqueId: `${vehicle.id}-${index}`
    })).sort(() => 0.5 - Math.random());
    setVehicles(gameVehicles);
  }, [difficulty]);

  const handleDifficultyChange = (level) => {
    setDifficulty(DIFFICULTY_LEVELS[level]);
    resetGame();
  };

  const handlePlayerChange = (numPlayers) => {
    setPlayers(numPlayers);
    setScores(Array(numPlayers).fill(0));
    resetGame();
  };

  const handleMatch = () => {
    const newScores = [...scores];
    newScores[currentPlayer]++;
    setScores(newScores);
    setMatchedPairs(prev => prev + 1);
  };

  const handleMismatch = () => {
    setCurrentPlayer((prev) => (prev + 1) % players);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setMatchedPairs(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setMatchedPairs(0);
    setScores(Array(players).fill(0));
    setCurrentPlayer(0);
  };

  return (
    <div className="game-container">
      <h1>働く車の神経衰弱</h1>
      <DifficultySelector onSelect={handleDifficultyChange} />
      <PlayerSelector onSelect={handlePlayerChange} />
      <ScoreBoard scores={scores} currentPlayer={currentPlayer} />
      {!gameStarted && !gameEnded && <button onClick={startGame}>ゲーム開始</button>}
      {gameStarted && !gameEnded && (
        <Board
          vehicles={vehicles}
          onMatch={handleMatch}
          onMismatch={handleMismatch}
        />
      )}
      {gameEnded && (
        <div>
          <h2>ゲーム終了！</h2>
          <p>勝者: プレイヤー{scores.indexOf(Math.max(...scores)) + 1}</p>
          <button onClick={resetGame}>リセット</button>
        </div>
      )}
    </div>
  );
}

export default Game;