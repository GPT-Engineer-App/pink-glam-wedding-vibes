import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 10;
const CELL_SIZE = 30;

const LoveMinigame = () => {
  const [groomPosition, setGroomPosition] = useState({ x: 0, y: 0 });
  const [bridePosition, setBridePosition] = useState({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
  const [maze, setMaze] = useState([]);

  useEffect(() => {
    generateMaze();
  }, []);

  const generateMaze = () => {
    const newMaze = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    for (let i = 0; i < GRID_SIZE * GRID_SIZE / 3; i++) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      if ((x !== 0 || y !== 0) && (x !== GRID_SIZE - 1 || y !== GRID_SIZE - 1)) {
        newMaze[y][x] = 1;
      }
    }
    setMaze(newMaze);
  };

  const moveGroom = (dx, dy) => {
    const newX = groomPosition.x + dx;
    const newY = groomPosition.y + dy;
    if (
      newX >= 0 && newX < GRID_SIZE &&
      newY >= 0 && newY < GRID_SIZE &&
      maze[newY][newX] === 0
    ) {
      setGroomPosition({ x: newX, y: newY });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp': moveGroom(0, -1); break;
        case 'ArrowDown': moveGroom(0, 1); break;
        case 'ArrowLeft': moveGroom(-1, 0); break;
        case 'ArrowRight': moveGroom(1, 0); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [groomPosition, maze]);

  useEffect(() => {
    if (groomPosition.x === bridePosition.x && groomPosition.y === bridePosition.y) {
      alert('Congratulations! You caught the bride!');
      setGroomPosition({ x: 0, y: 0 });
      setBridePosition({ x: GRID_SIZE - 1, y: GRID_SIZE - 1 });
      generateMaze();
    }
  }, [groomPosition, bridePosition]);

  return (
    <div className="flex flex-col items-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-lg font-semibold text-[#FF1493]"
      >
        Help the groom catch the bride! Use arrow keys to move.
      </motion.p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: '1px',
          backgroundColor: '#FF69B4',
          padding: '1px',
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <motion.div
              key={`${x}-${y}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell === 1 ? '#FF1493' : '#FFF0F5',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: (x + y) * 0.02 }}
            >
              {x === groomPosition.x && y === groomPosition.y && '🤵'}
              {x === bridePosition.x && y === bridePosition.y && '👰'}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LoveMinigame;
