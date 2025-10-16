import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function LevelNode({ level, onComplete }) {
  const nodeRef = useRef();

  useGSAP(() => {
    if (!level.locked) {
      gsap.fromTo(nodeRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 });
    }
  }, { scope: nodeRef });

  const handleClick = () => {
    if (!level.locked) {
      onComplete();
    }
  };

  return (
    <div ref={nodeRef} className={\`level-node \${level.locked ? 'locked' : 'unlocked'}\`} onClick={handleClick}>
      <img src={level.icon} alt={level.mediaLabel} />
      <div className="day-label">Day {level.day}</div>
      {level.locked && <div className="lock-icon">🔒</div>}
    </div>
  );
}

export default LevelNode;
