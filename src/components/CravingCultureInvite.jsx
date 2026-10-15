import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { IceCreamCone, Sparkles, Send } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function CravingCultureInvite() {
  const data = SITE_DATA.cravingCulture;
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [caughtNo, setCaughtNo] = useState(false);
  const containerRef = useRef(null);

  const handleYes = () => {
    sound.playPop();
    sound.playChime();
    setAccepted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ffd166', '#a0c4ff', '#b9fbc0', '#e0aaff']
    });
  };

  const handleRunaway = (e) => {
    e.preventDefault();
    sound.playPop();

    // After 8 attempts, let her catch it playfully
    if (dodgeCount >= 8) {
      setCaughtNo(true);
      return;
    }

    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const maxX = (rect.width / 2) - 60;
      const maxY = 90;

      const randomX = (Math.random() * 2 - 1) * maxX;
      const randomY = (Math.random() * 2 - 1) * maxY;

      setNoPos({ x: randomX, y: randomY });
      setDodgeCount((prev) => prev + 1);
    }
  };

  const currentPhrase = dodgeCount === 0 
    ? data.noButtonText 
    : data.runawayPhrases[(dodgeCount - 1) % data.runawayPhrases.length];

  return (
    <section 
      id="craving-culture-section"
      style={{
        padding: '80px 20px',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Container Card */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #fff9f6 0%, #fff0f3 100%)',
          border: '2.5px solid #ffccd5',
          borderRadius: '32px',
          padding: 'clamp(32px, 6vw, 48px)',
          boxShadow: '0 20px 48px -10px rgba(255, 140, 165, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#ffffff',
          border: '1.5px solid #ffccd5',
          borderRadius: '999px',
          padding: '6px 18px',
          marginBottom: '16px',
          fontFamily: 'var(--font-hand)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#e11d48',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <IceCreamCone size={18} />
          <span>{data.badge}</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
          fontWeight: 700,
          color: '#881337',
          marginBottom: '14px',
          lineHeight: 1.15
        }}>
          {data.heading}
        </h2>

        {/* Subtitle */}
        <p style={{
          maxWidth: '520px',
          margin: '0 auto 36px auto',
          color: '#57534e',
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          {data.subtitle}
        </p>

        {!accepted && !caughtNo ? (
          <div 
            ref={containerRef}
            style={{
              position: 'relative',
              minHeight: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}
          >
            {/* YES Button */}
            <button
              onClick={handleYes}
              className="btn-kawaii"
              style={{
                fontSize: '1.35rem',
                padding: '16px 36px',
                animation: 'gentleBounce 2.5s infinite ease-in-out'
              }}
            >
              <span>{data.yesButtonText}</span>
              <Sparkles size={20} />
            </button>

            {/* Runaway NO Button */}
            <button
              onMouseEnter={handleRunaway}
              onTouchStart={handleRunaway}
              onClick={handleRunaway}
              style={{
                position: 'relative',
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                background: '#ffffff',
                color: '#9ca3af',
                border: '2px dashed #d1d5db',
                borderRadius: '999px',
                padding: '14px 28px',
                fontFamily: 'var(--font-hand)',
                fontSize: '1.25rem',
                fontWeight: 700,
                cursor: 'pointer',
                userSelect: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
              }}
            >
              {currentPhrase}
            </button>
          </div>
        ) : accepted ? (
          /* Accepted State Card */
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px 24px',
            border: '2px solid #ffccd5',
            boxShadow: '0 12px 28px rgba(255, 140, 165, 0.25)',
            animation: 'gentleBounce 0.4s ease-out'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎉🍦🍨</div>

            <h3 className="font-hand" style={{ fontSize: '2.2rem', color: '#e11d48', fontWeight: 700, marginBottom: '10px' }}>
              {data.accepted.title}
            </h3>

            <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px auto' }}>
              {data.accepted.message}
            </p>

            <a
              href="sms:?&body=Hey%20Nilesh!%20I%20saw%20the%20website%20and%20I%20am%20down%20for%20Craving%20Culture%20today%20%F0%9F%8D%A6%F0%9F%8E%89"
              className="btn-kawaii"
              style={{
                textDecoration: 'none',
                fontSize: '1.2rem',
                padding: '12px 28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => sound.playPop()}
            >
              <Send size={18} />
              <span>{data.accepted.actionText}</span>
            </a>

            <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#9ca3af', fontFamily: 'var(--font-hand)' }}>
              (Or simply text whenever you feel like it!)
            </div>
          </div>
        ) : (
          /* Playful Caught No State */
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px 24px',
            border: '2px solid #fed7aa',
            animation: 'gentleBounce 0.4s ease-out'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>🏆🙈</div>
            <h3 className="font-hand" style={{ fontSize: '1.8rem', color: '#c2410c', fontWeight: 700, marginBottom: '10px' }}>
              Whoa, you actually caught it!
            </h3>
            <p style={{ color: '#57534e', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '460px', margin: '0 auto 16px auto' }}>
              You're way too quick! But honestly, no pressure whatsoever. If you ever feel like grabbing ice cream at Craving Culture another day, the offer is always open. 😊
            </p>
            <button
              onClick={() => {
                setCaughtNo(false);
                setDodgeCount(0);
                setNoPos({ x: 0, y: 0 });
              }}
              className="btn-kawaii-secondary"
            >
              Give me another chance? 🌸
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
