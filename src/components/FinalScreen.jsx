import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Heart, ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function FinalScreen() {
  const { heading, image, paragraphs, wishButtonText, wishSentMessage, footerText } = SITE_DATA.finalScreen;
  const [wishSent, setWishSent] = useState(false);
  const [shootingStars, setShootingStars] = useState([]);

  const handleSendWish = () => {
    sound.playPop();
    sound.playSparkle();
    setWishSent(true);

    // Spawn shooting stars floating up
    const newStars = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: `${15 + Math.random() * 70}%`,
      delay: `${i * 0.1}s`
    }));
    setShootingStars(newStars);

    // Golden / pastel star confetti
    confetti({
      particleCount: 75,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#ffd166', '#ffccd5', '#ffffff', '#e0aaff', '#99f6e4']
    });
  };

  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="final-section"
      style={{
        padding: '90px 20px 60px 20px',
        maxWidth: '740px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Pastel Sunset Card */}
      <div style={{
        background: 'linear-gradient(180deg, #fce7f3 0%, #ede9fe 50%, #fff7ed 100%)',
        border: '3px solid #ffccd5',
        borderRadius: '36px',
        padding: 'clamp(32px, 6vw, 54px)',
        boxShadow: '0 24px 60px -12px rgba(236, 72, 153, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Shooting Stars */}
        {shootingStars.map((s) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: s.left,
              fontSize: '1.8rem',
              pointerEvents: 'none',
              animation: `floatUp 1.8s ${s.delay} ease-out forwards`,
              zIndex: 10
            }}
          >
            ⭐
          </div>
        ))}

        {/* Waving Sunset Teddy Picture */}
        <div style={{
          position: 'relative',
          width: '210px',
          height: '210px',
          margin: '0 auto 28px auto',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid #ffffff',
          boxShadow: '0 16px 36px rgba(168, 85, 247, 0.25)',
          animation: 'gentleBounce 4s infinite ease-in-out'
        }}>
          <img 
            src={image} 
            alt="Teddy waving goodbye on a cloud at sunset"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
          fontWeight: 700,
          color: '#831843',
          marginBottom: '20px',
          lineHeight: 1.15
        }}>
          {heading}
        </h2>

        {/* Sincere Farewell Paragraphs */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          color: '#4a3e3e',
          fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
          lineHeight: 1.75,
          maxWidth: '560px',
          margin: '0 auto 34px auto'
        }}>
          {paragraphs.map((p, idx) => (
            <p key={idx} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
        </div>

        {/* Wish Button or Wish Sent Card */}
        {!wishSent ? (
          <div>
            <button
              onClick={handleSendWish}
              className="btn-kawaii"
              style={{
                fontSize: '1.35rem',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)'
              }}
            >
              <span>{wishButtonText}</span>
              <Sparkles size={20} />
            </button>
          </div>
        ) : (
          <div style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '24px',
            border: '2px solid #f472b6',
            boxShadow: '0 12px 28px rgba(236, 72, 153, 0.25)',
            animation: 'gentleBounce 0.4s ease-out'
          }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>✨🌸🌟</div>
            <p className="font-hand" style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#9d174d',
              margin: 0
            }}>
              {wishSentMessage}
            </p>
          </div>
        )}

        {/* Back to top helper */}
        <div style={{ marginTop: '40px' }}>
          <button
            onClick={scrollToTop}
            className="btn-kawaii-secondary"
            style={{ fontSize: '1rem', padding: '8px 18px' }}
          >
            <ArrowUp size={16} />
            <span>back to the start 🧸</span>
          </button>
        </div>

      </div>

      {/* Website Footer */}
      <footer style={{
        marginTop: '50px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p className="font-hand" style={{
          fontSize: '1.35rem',
          color: '#831843',
          fontWeight: 700
        }}>
          {footerText}
        </p>
        <p style={{
          fontSize: '0.88rem',
          color: '#a1a1aa',
          marginTop: '6px'
        }}>
          a tiny little something ♡ made with care & respect
        </p>
      </footer>
    </section>
  );
}
