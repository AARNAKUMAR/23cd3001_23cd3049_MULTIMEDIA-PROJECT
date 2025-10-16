import React from 'react';
import LevelNode from './LevelNode';

function LevelMap({ levels, onCompleteLevel }) {
  return (
    <div className="level-map">
      {levels.map((lvl) => (
        <LevelNode key={lvl.day} level={lvl} onComplete={() => onCompleteLevel(lvl.day)} />
      ))}
    </div>
  );
}

export default LevelMap;
