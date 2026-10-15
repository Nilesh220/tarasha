import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, X, Heart } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function HappinessGarden() {
  const { characters, messages, heading, subtitle } = SITE_DATA.happinessGame;
  const [selectedChar, setSelectedChar] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [discoveredSet, setDiscoveredSet] = useState(new Set());
  const [activeBounce, setActiveBounce] = useState(null);

  const handlePickCharacter = (char) => {
    sound.playPop();
    sound.playChime();
    setActiveBounce(char.id);

    // Pick random message
    const randomIdx = Math.floor(Math.random() * messages.length);
    const msg = messages[randomIdx];
    setCurrentMessage(msg);
    setSelectedChar(char);

    // Track discoveries
    if (!discoveredSet.has(randomIdx)) {
      const nextSet = new Set(discoveredSet).add(randomIdx);
      setDiscoveredSet(nextSet);
      setDiscoveredCount(nextSet.size);
    }

    // Mini confetti sprinkle
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
      colors: [char.borderColor, '#ffccd5', '#ffffff']
    });

    setTimeout(() => setActiveBounce(null), 800);
  };

  const handleGetAnother = () => {
    sound.playPop();
    sound.playSparkle();
    const randomIdx = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIdx]);
  };

  return (
    <section 
      id="garden-section"
      style={{
        padding: '80px 20px',
        maxWidth: '920px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(238, 242, 255, 0.9)',
          border: '1.5px solid #c7d2fe',
          borderRadius: '999px',
          padding: '5px 16px',
          marginBottom: '12px',
          fontFamily: 'var(--font-hand)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#4f46e5'
        }}>
          <span>interactive garden 🌸</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
          fontWeight: 700,
          color: '#2e1065',
          marginBottom: '10px'
        }}>
          {heading}
        </h2>

        <p style={{
          maxWidth: '560px',
          margin: '0 auto',
          color: '#6b7280',
          fontSize: '1.05rem',
          lineHeight: 1.6
        }}>
          {subtitle}
        </p>

        {/* Counter */}
        <div style={{
          marginTop: '14px',
          fontFamily: 'var(--font-hand)',
          fontSize: '1.15rem',
          color: '#9333ea',
          fontWeight: 700
        }}>
          ✨ Little surprises unlocked: {discoveredCount} / {messages.length}
        </div>
      </div>

      {/* 3 Character Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        marginBottom: '36px'
      }}>
        {characters.map((char) => {
          const isBouncing = activeBounce === char.id;
          return (
            <div
              key={char.id}
              onClick={() => handlePickCharacter(char)}
              style={{
                background: '#ffffff',
                borderRadius: '28px',
                padding: '24px 20px 28px 20px',
                border: `2px solid ${char.borderColor}`,
                boxShadow: isBouncing 
                  ? `0 20px 40px -10px ${char.borderColor}` 
                  : '0 10px 25px -5px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isBouncing ? 'scale(1.05) translateY(-8px)' : 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
                e.currentTarget.style.boxShadow = `0 16px 36px -8px ${char.borderColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.06)';
              }}
            >
              {/* Character Image Circle */}
              <div style={{
                width: '150px',
                height: '150px',
                margin: '0 auto 16px auto',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `3px solid ${char.borderColor}`,
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                background: char.color
              }}>
                <img 
                  src={char.image} 
                  alt={char.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Character Info */}
              <h3 style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                {char.name}
              </h3>

              <p style={{
                fontSize: '0.92rem',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                {char.desc}
              </p>

              {/* Tap button prompt */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: char.color,
                color: '#374151',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.92rem',
                fontWeight: 600,
                fontFamily: 'var(--font-hand)'
              }}>
                <span>tap to see note ♡</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revealed Surprise Message Modal / Card */}
      {selectedChar && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          border: `2.5px solid ${selectedChar.borderColor}`,
          borderRadius: '24px',
          padding: '30px 24px',
          maxWidth: '560px',
          margin: '0 auto',
          boxShadow: '0 20px 48px -10px rgba(0, 0, 0, 0.12)',
          position: 'relative',
          animation: 'gentleBounce 0.4s ease-out'
        }}>
          {/* Close button */}
          <button
            onClick={() => setSelectedChar(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#4b5563'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.4rem' }}>💌</span>
            <span className="font-hand" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#374151' }}>
              Note from {selectedChar.name}:
            </span>
          </div>

          <div style={{
            fontFamily: 'var(--font-hand)',
            fontSize: 'clamp(1.35rem, 4vw, 1.65rem)',
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1.5,
            padding: '12px 16px',
            background: selectedChar.color,
            borderRadius: '16px',
            marginBottom: '20px'
          }}>
            “{currentMessage}”
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleGetAnother}
              className="btn-kawaii-secondary"
              style={{ fontSize: '1.1rem', padding: '8px 18px' }}
            >
              <RefreshCw size={16} />
              <span>Another surprise thought 🌸</span>
            </button>
            <button
              onClick={() => setSelectedChar(null)}
              className="btn-kawaii"
              style={{ fontSize: '1.1rem', padding: '8px 22px' }}
            >
              <span>Thanks little friend! ♡</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
