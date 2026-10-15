import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Zap, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function ComplimentMachine() {
  const { heading, subtitle, buttonText, compliments } = SITE_DATA.complimentMachine;
  const [currentCompliment, setCurrentCompliment] = useState(
    "click the button below to turn the crank!"
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [complimentCount, setComplimentCount] = useState(0);

  const handleGenerate = () => {
    if (isSpinning) return;
    sound.playPop();
    sound.playSparkle();
    setIsSpinning(true);

    let count = 0;
    const interval = setInterval(() => {
      const tempIdx = Math.floor(Math.random() * compliments.length);
      setCurrentCompliment(compliments[tempIdx]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        const finalIdx = Math.floor(Math.random() * compliments.length);
        setCurrentCompliment(compliments[finalIdx]);
        setIsSpinning(false);
        setComplimentCount((prev) => prev + 1);

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#ff85a1', '#ffd166', '#a0c4ff', '#b9fbc0']
        });
      }
    }, 80);
  };

  return (
    <section 
      id="compliments-section"
      style={{
        padding: '90px 20px',
        maxWidth: '700px',
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
          background: 'rgba(254, 243, 199, 0.9)',
          border: '1.5px solid #fde68a',
          borderRadius: '999px',
          padding: '5px 16px',
          marginBottom: '12px',
          fontFamily: 'var(--font-hand)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#b45309'
        }}>
          <Zap size={16} />
          <span>wholesome energy generator ✿</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
          fontWeight: 700,
          color: '#78350f',
          marginBottom: '10px'
        }}>
          {heading}
        </h2>

        <p style={{
          maxWidth: '480px',
          margin: '0 auto',
          color: '#71717a',
          fontSize: '1.05rem',
          lineHeight: 1.6
        }}>
          {subtitle}
        </p>
      </div>

      {/* Retro-Kawaii Arcade Machine */}
      <div style={{
        background: 'linear-gradient(180deg, #ffe5ec 0%, #ffccd5 100%)',
        border: '3.5px solid #ff85a1',
        borderRadius: '36px',
        padding: '36px 28px',
        boxShadow: '0 20px 48px -8px rgba(255, 133, 161, 0.35), inset 0 2px 6px rgba(255, 255, 255, 0.8)',
        position: 'relative',
        maxWidth: '520px',
        margin: '0 auto'
      }}>
        {/* Antenna with glowing star */}
        <div style={{
          position: 'absolute',
          top: '-32px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '32px',
          background: '#ff85a1',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            fontSize: '1.3rem',
            animation: 'starTwinkle 2s infinite ease-in-out'
          }}>
            ⭐
          </div>
        </div>

        {/* Top Machine Console Lights */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff4d6d', boxShadow: '0 0 8px #ff4d6d' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffd166', boxShadow: '0 0 8px #ffd166' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#06d6a0', boxShadow: '0 0 8px #06d6a0' }} />
        </div>

        {/* Machine Screen */}
        <div style={{
          background: '#ffffff',
          border: '2.5px solid #ffb3c6',
          borderRadius: '20px',
          padding: '28px 20px',
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.04)',
          marginBottom: '26px',
          position: 'relative'
        }}>
          <p style={{
            fontFamily: 'var(--font-hand)',
            fontSize: 'clamp(1.4rem, 4.5vw, 1.85rem)',
            fontWeight: 700,
            color: '#18181b',
            lineHeight: 1.45,
            margin: 0,
            transition: 'opacity 0.2s ease',
            opacity: isSpinning ? 0.4 : 1
          }}>
            {currentCompliment}
          </p>

          {isSpinning && (
            <div style={{
              position: 'absolute',
              fontFamily: 'var(--font-hand)',
              fontSize: '1.1rem',
              color: '#f43f5e',
              fontWeight: 700
            }}>
              generating sweet truth... 🌸
            </div>
          )}
        </div>

        {/* Controls Panel & Mini Teddy Operator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Mini Teddy Icon Operator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-hand)',
            color: '#701a75'
          }}>
            <span style={{ fontSize: '1.4rem' }}>🧸</span>
            <span>Chief Operator</span>
          </div>

          {/* Trigger Button */}
          <button
            onClick={handleGenerate}
            disabled={isSpinning}
            className="btn-kawaii"
            style={{
              fontSize: '1.25rem',
              padding: '12px 28px',
              opacity: isSpinning ? 0.7 : 1
            }}
          >
            <span>{buttonText}</span>
            <Sparkles size={18} />
          </button>
        </div>

        {/* Counter footer */}
        {complimentCount > 0 && (
          <div style={{
            marginTop: '16px',
            fontFamily: 'var(--font-hand)',
            fontSize: '1.05rem',
            color: '#9f1239'
          }}>
            ✿ Compliments dispensed: {complimentCount}
          </div>
        )}
      </div>
    </section>
  );
}
