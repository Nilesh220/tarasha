import React, { useEffect, useState } from 'react';

export default function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  // Handle click anywhere to spawn cute hearts/sparkles
  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger if clicked on an input or button that handles its own confetti
      const emojis = ['💖', '✨', '🌸', '🧸', '☁️', '🌷', '🎀'];
      const chosen = emojis[Math.floor(Math.random() * emojis.length)];
      const dx = (Math.random() - 0.5) * 60;
      
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: chosen,
        dx: `${dx}px`
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Background ambient floating stickers */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '4%',
          fontSize: '2.5rem',
          opacity: 0.35,
          animation: 'cloudDrift 14s infinite ease-in-out'
        }}>☁️</div>

        <div style={{
          position: 'absolute',
          top: '38%',
          right: '5%',
          fontSize: '2rem',
          opacity: 0.3,
          animation: 'cloudDrift 18s infinite ease-in-out reverse'
        }}>☁️</div>

        <div style={{
          position: 'absolute',
          top: '65%',
          left: '6%',
          fontSize: '1.8rem',
          opacity: 0.25,
          animation: 'gentleBounce 6s infinite ease-in-out'
        }}>🌸</div>

        <div style={{
          position: 'absolute',
          top: '85%',
          right: '8%',
          fontSize: '2rem',
          opacity: 0.3,
          animation: 'starTwinkle 4s infinite ease-in-out'
        }}>✨</div>
      </div>

      {/* Click-spawned floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            left: p.x - 12,
            top: p.y - 12,
            fontSize: '1.6rem',
            '--dx': p.dx
          }}
        >
          {p.emoji}
        </div>
      ))}
    </>
  );
}
