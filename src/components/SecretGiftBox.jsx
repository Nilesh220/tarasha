import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function SecretGiftBox() {
  const { teaser, buttonText, image, message } = SITE_DATA.giftBox;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    sound.playPop();
    sound.playSparkle();
    sound.playChime();
    setIsOpen(true);

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#ffd166', '#a0c4ff', '#b9fbc0', '#ffc6ff', '#fde047']
    });
  };

  return (
    <section 
      id="gift-section"
      style={{
        padding: '90px 20px',
        maxWidth: '680px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Teaser Header */}
      <div style={{ marginBottom: '32px' }}>
        <p className="font-hand" style={{
          fontSize: '1.45rem',
          fontWeight: 700,
          color: '#d97706',
          marginBottom: '6px'
        }}>
          ✿ almost at the end ✿
        </p>

        <h2 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
          fontWeight: 700,
          color: '#78350f',
          lineHeight: 1.15
        }}>
          {teaser}
        </h2>
      </div>

      {/* Gift Box Container */}
      {!isOpen ? (
        <div 
          onClick={handleOpenGift}
          style={{
            cursor: 'pointer',
            maxWidth: '360px',
            margin: '0 auto',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
          }}
        >
          {/* 3D Gift Box Image */}
          <div style={{
            position: 'relative',
            width: '260px',
            height: '260px',
            margin: '0 auto 28px auto',
            borderRadius: '32px',
            overflow: 'hidden',
            border: '4px solid #ffffff',
            boxShadow: '0 20px 48px -10px rgba(255, 140, 165, 0.4)',
            animation: 'gentleBounce 3.5s infinite ease-in-out'
          }}>
            <img 
              src={image} 
              alt="Pastel gift box with ribbon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Sparkle sticker */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              fontSize: '1.6rem',
              animation: 'starTwinkle 2.5s infinite ease-in-out'
            }}>
              ✨
            </div>
          </div>

          {/* Open Button */}
          <button 
            onClick={handleOpenGift}
            className="btn-kawaii"
            style={{ fontSize: '1.35rem', padding: '16px 36px' }}
          >
            <span>{buttonText}</span>
            <Gift size={20} />
          </button>
        </div>
      ) : (
        /* Revealed Gift Card */
        <div style={{
          background: 'linear-gradient(135deg, #fffaf0 0%, #fff0f3 100%)',
          border: '2.5px solid #ffccd5',
          borderRadius: '32px',
          padding: 'clamp(28px, 6vw, 48px)',
          boxShadow: '0 24px 56px -12px rgba(255, 140, 165, 0.35)',
          animation: 'gentleBounce 0.5s ease-out',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Cute Teddy Holding Flower Avatar */}
          <div style={{
            width: '140px',
            height: '140px',
            margin: '0 auto 22px auto',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3.5px solid #ffccd5',
            boxShadow: '0 10px 24px rgba(0,0,0,0.08)'
          }}>
            <img 
              src="/images/teddy-flower.jpg" 
              alt="Cute teddy holding flower"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h3 className="font-hand" style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: '#be185d',
            marginBottom: '20px'
          }}>
            a tiny reminder ♡
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: '#44403c',
            fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
            lineHeight: 1.75,
            maxWidth: '520px',
            margin: '0 auto 26px auto',
            textAlign: 'left'
          }}>
            {message.paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {p}
              </p>
            ))}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1.5px solid #ffccd5',
            borderRadius: '999px',
            padding: '8px 22px',
            fontFamily: 'var(--font-script)',
            fontSize: '1.45rem',
            color: '#be185d'
          }}>
            <span>appreciated with care 🌸</span>
            <Heart size={18} fill="#ff85a1" color="#ff85a1" />
          </div>
        </div>
      )}
    </section>
  );
}
