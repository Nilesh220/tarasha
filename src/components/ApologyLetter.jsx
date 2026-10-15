import React, { useState } from 'react';
import { Heart, Sparkles, Coffee } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function ApologyLetter() {
  const [unfolded, setUnfolded] = useState(true);

  const toggleFold = () => {
    sound.playPaper();
    sound.playPop();
    setUnfolded(!unfolded);
  };

  return (
    <section 
      id="letter-section"
      style={{
        padding: '80px 20px',
        maxWidth: '760px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Decorative Washi Tape at Top */}
      <div className="washi-tape" style={{ width: '120px', top: '70px', background: 'rgba(255, 182, 193, 0.7)' }} />

      {/* Main Paper Letter Card */}
      <div 
        style={{
          background: '#fffdfa',
          backgroundImage: `
            radial-gradient(#f0e6e6 0.7px, transparent 0.7px),
            linear-gradient(to right, rgba(255, 182, 193, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 100% 100%',
          border: '2px solid #ffd6e0',
          borderRadius: '24px',
          boxShadow: '0 20px 48px -10px rgba(220, 160, 175, 0.3), 0 4px 12px rgba(0,0,0,0.03)',
          padding: 'clamp(28px, 6vw, 56px)',
          position: 'relative',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
      >
        {/* Cute Post Stamp in Corner */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          border: '2px dashed #ff9ebb',
          borderRadius: '6px',
          padding: '6px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: '#fff0f5',
          transform: 'rotate(3deg)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🌸</span>
          <span className="font-hand" style={{ fontSize: '0.85rem', color: '#ff6584', fontWeight: 700 }}>
            AIR MAIL
          </span>
          <span style={{ fontSize: '0.75rem', color: '#998080' }}>
            To: Tarasha
          </span>
        </div>

        {/* Margin Doodle left */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '20px',
          opacity: 0.45,
          pointerEvents: 'none'
        }}>
          <span style={{ fontSize: '2rem' }}>🌼</span>
        </div>

        {/* Letter Greeting */}
        <div style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2rem, 5vw, 2.6rem)',
          fontWeight: 700,
          color: '#d81b60',
          marginBottom: '26px'
        }}>
          {SITE_DATA.letter.greeting}
        </div>

        {/* Letter Body Paragraphs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          color: '#4a3e3e',
          fontSize: 'clamp(1rem, 2.8vw, 1.15rem)',
          lineHeight: '1.8',
          letterSpacing: '0.1px'
        }}>
          {SITE_DATA.letter.paragraphs.map((p, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
        </div>

        {/* Letter Signoff */}
        <div style={{
          marginTop: '36px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            fontFamily: 'var(--font-script)',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#c2185b',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{SITE_DATA.letter.signoff}</span>
            <Heart size={20} fill="#ff8da1" color="#ff8da1" />
          </div>
        </div>

        {/* Margin sticker bottom right */}
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px dashed #ffd4de',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <span className="font-hand" style={{ color: '#a08888', fontSize: '1.05rem' }}>
            ✿ written with sincerity & zero expectations
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem' }}>☕</span>
            <span style={{ fontSize: '1.2rem' }}>🧸</span>
            <span style={{ fontSize: '1.2rem' }}>✨</span>
          </div>
        </div>

      </div>
    </section>
  );
}
