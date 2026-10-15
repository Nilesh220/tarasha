import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function HeroOpening({ onOpenLetter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    sound.playPop();
    sound.playChime();
    setIsOpen(true);

    // Fire cute confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ff85a1', '#ffd166', '#a0c4ff', '#b9fbc0', '#ffc6ff']
    });

    setTimeout(() => {
      onOpenLetter();
    }, 700);
  };

  return (
    <section 
      id="hero-section" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        textAlign: 'center',
        zIndex: 1
      }}
    >
      {/* Decorative floating clouds & stars */}
      <div style={{
        position: 'absolute',
        top: '6%',
        left: '10%',
        animation: 'cloudDrift 10s infinite ease-in-out',
        pointerEvents: 'none'
      }}>
        <span style={{ fontSize: '2.5rem', opacity: 0.55 }}>☁️</span>
      </div>

      <div style={{
        position: 'absolute',
        top: '14%',
        right: '12%',
        animation: 'cloudDrift 12s infinite ease-in-out reverse',
        pointerEvents: 'none'
      }}>
        <span style={{ fontSize: '2.8rem', opacity: 0.5 }}>☁️</span>
      </div>

      {/* Hero Container */}
      <div style={{ maxWidth: '580px', width: '100%', margin: '0 auto' }}>
        
        {/* Peeking Teddy Illustration */}
        <div style={{
          position: 'relative',
          width: '210px',
          height: '210px',
          margin: '0 auto -15px auto',
          animation: 'gentleBounce 4s infinite ease-in-out'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #fff',
            boxShadow: '0 16px 36px rgba(255, 140, 165, 0.35)',
            background: '#fff'
          }}>
            <img 
              src="/images/teddy-peeking.jpg" 
              alt="Cute teddy peeking behind cloud"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Little floating speech bubble or flower */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '-10px',
            background: '#ffffff',
            border: '2px solid #ffccd5',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '1rem',
            fontFamily: 'var(--font-hand)',
            fontWeight: 700,
            color: '#ee4266',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            animation: 'gentleWiggle 3s infinite ease-in-out'
          }}>
            heyy! 👋
          </div>
        </div>

        {/* Small badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 230, 238, 0.85)',
          border: '1.5px solid #ffb3c6',
          borderRadius: '999px',
          padding: '6px 18px',
          marginBottom: '14px',
          fontFamily: 'var(--font-hand)',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#d81b60'
        }}>
          <Sparkles size={16} />
          <span>{SITE_DATA.headerBadge}</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(3rem, 9vw, 4.8rem)',
          fontWeight: 700,
          color: '#d81b60',
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.5px'
        }}>
          {SITE_DATA.heroHeadline}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)',
          color: '#6c584c',
          whiteSpace: 'pre-line',
          maxWidth: '440px',
          margin: '0 auto 34px auto',
          lineHeight: 1.6
        }}>
          {SITE_DATA.heroSubtitle}
        </p>

        {/* Animated Envelope Interactive Box */}
        <div 
          onClick={handleOpen}
          style={{
            position: 'relative',
            width: '260px',
            height: '160px',
            margin: '0 auto 32px auto',
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffebf0 100%)',
            border: '2.5px solid #ffb3c6',
            borderRadius: '16px',
            boxShadow: '0 18px 38px rgba(255, 140, 165, 0.28)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isOpen ? 'scale(1.08) translateY(-10px)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.transform = 'none';
          }}
        >
          {/* Envelope Flap Triangle */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: '#ffccd5',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            borderBottom: '2px solid rgba(255, 140, 165, 0.4)',
            transition: 'transform 0.5s ease',
            transformOrigin: 'top',
            transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            zIndex: 3
          }} />

          {/* Letter Peeking Inside */}
          <div style={{
            position: 'absolute',
            left: '18px',
            right: '18px',
            top: isOpen ? '-40px' : '20px',
            height: '100px',
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            transition: 'top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            zIndex: 2
          }}>
            <span style={{ fontSize: '1.8rem' }}>💌</span>
            <span className="font-hand" style={{ fontSize: '1rem', color: '#ff6b8b', fontWeight: 700 }}>
              for Tarasha
            </span>
          </div>

          {/* Envelope Heart Seal Badge */}
          <div style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#ee4266',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(238, 66, 102, 0.4)',
            zIndex: 4,
            animation: 'softPulse 2s infinite ease-in-out'
          }}>
            <Heart size={20} fill="#ffffff" />
          </div>

          {/* Decorative Sparkle Icons around Envelope */}
          <span style={{ position: 'absolute', top: '-10px', right: '-12px', fontSize: '1.4rem' }}>✨</span>
          <span style={{ position: 'absolute', bottom: '-8px', left: '-10px', fontSize: '1.2rem' }}>🌸</span>
        </div>

        {/* Main CTA Button */}
        <div>
          <button 
            onClick={handleOpen} 
            className="btn-kawaii"
            aria-label="Open the letter"
          >
            <span>{SITE_DATA.heroCta}</span>
            <Sparkles size={20} />
          </button>
        </div>

        {/* Nilesh's Signature */}
        <div style={{
          marginTop: '32px',
          fontFamily: 'var(--font-script)',
          fontSize: '1.45rem',
          color: '#8c7a7a',
          letterSpacing: '0.3px'
        }}>
          {SITE_DATA.heroSignature}
        </div>

      </div>
    </section>
  );
}
