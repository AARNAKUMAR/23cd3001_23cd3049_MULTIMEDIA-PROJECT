import React, { useState, useEffect } from 'react';
import LevelMap from './components/LevelMap';
import levelsData from './data/levels.json';
import './styles/App.css';

function App() {
  const [levels, setLevels] = useState(levelsData);

  useEffect(() => {
    const updated = [...levels];
    updated[0].locked = false;
    setLevels(updated);
  }, []);

  const unlockNext = (day) => {
    setLevels(prev => {
      const copy = prev.map(l => ({ ...l }));
      const idx = copy.findIndex(l => l.day === day);
      if (idx >= 0 && idx + 1 < copy.length) {
        copy[idx + 1].locked = false;
      }
      return copy;
    });
  };

  return (
    <div className="App">
      <h1>Echoes from Tomorrow: A Media Odyssey</h1>
      <LevelMap levels={levels} onCompleteLevel={unlockNext} />
    </div>
  );
}

export default App;
