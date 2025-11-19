import { useState, useRef } from 'react';

export const Button = ({ onClick, size, text, isNo }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  
  const baseSize = isNo ? 18 : size;
  const padding = isNo ? '16px 32px' : `${Math.max(16, size * 0.6)}px ${Math.max(32, size * 0.9)}px`;
  
  const handleMouseMove = (e) => {
    if (!isNo || !buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distanceX = mouseX - buttonCenterX;
    const distanceY = mouseY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < 150 && distance > 0) {
      const angle = Math.atan2(distanceY, distanceX);
      const moveDistance = 80;
      const newX = -Math.cos(angle) * moveDistance;
      const newY = -Math.sin(angle) * moveDistance;
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseLeave = () => {
    if (isNo) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleClick = (e) => {
    if (isNo) {
      e.preventDefault();
      
      const randomAngle = Math.random() * Math.PI * 2;
      const randomDistance = 150 + Math.random() * 100;
      const randomX = Math.cos(randomAngle) * randomDistance;
      const randomY = Math.sin(randomAngle) * randomDistance;
      
      setPosition({ x: randomX, y: randomY });
      
      setTimeout(() => {
        setPosition({ x: 0, y: 0 });
      }, 400);
      
      setTimeout(() => {
        onClick();
      }, 100);
    } else {
      onClick();
    }
  };
  
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-yes={!isNo}
      data-no={isNo}
      className={isNo ? 'no-button-run' : 'yes-button-bounce'}
      style={{
        fontSize: `${baseSize}px`,
        padding: padding,
        transform: isNo ? `translate(${position.x}px, ${position.y}px)` : 'none',
        transition: isNo ? 'transform 0.2s ease-out' : 'all 0.3s ease',
      }}
    >
      {text}
    </button>
  );
};
