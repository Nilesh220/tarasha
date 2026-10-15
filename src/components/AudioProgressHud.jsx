import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Compass, Sparkles, X } from 'lucide-react';
import { sound } from '../utils/sound';

export default function AudioProgressHud() {
  const [soundOn, setSoundOn] = useState(false);
  const [bgmOn, setBgmOn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sound.soundEnabled = next;
    if (next) sound.playPop();
  };

  const toggleBgm = () => {
    const next = sound.toggleBgm();
    setBgmOn(next);
    if (next) {
      setSoundOn(true);
      sound.soundEnabled = true;
    }
  };

  // Flower state based on exploration progress
  const getFlowerEmoji = () => {
    if (scrollProgress < 20) return { emoji: '🌱', label: 'a tiny seed' };
    if (scrollProgress < 45) return { emoji: '🌿', label: 'little sprout' };
    if (scrollProgress < 75) return { emoji: '🌷', label: 'tender bud' };
    if (scrollProgress < 95) return { emoji: '🌸', label: 'blooming' };
    return { emoji: '💐', label: 'full garden' };
  };

  const flower = getFlowerEmoji();

  const scrollTo = (id) => {
    sound.playPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navigation Quick Menu Modal */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '22px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          padding: '18px',
          borderRadius: '24px',
          boxShadow: '0 16px 36px rgba(255, 140, 165, 0.35)',
          border: '2px solid #ffccd5',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minWidth: '220px',
          animation: 'gentleBounce 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ffe0e6', paddingBottom: '6px' }}>
            <span className="font-hand" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#e64980' }}>
              jump to a chapter ✿
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a08080' }}
            >
              <X size={18} />
            </button>
          </div>

          <button onClick={() => scrollTo('hero-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            🧸 <span>Start / Hello</span>
          </button>
          <button onClick={() => scrollTo('letter-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            💌 <span>Apology Note</span>
          </button>
          <button onClick={() => scrollTo('garden-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            🌿 <span>Little Friends</span>
          </button>
          <button onClick={() => scrollTo('scrapbook-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            📸 <span>Moments Scrapbook</span>
          </button>
          <button onClick={() => scrollTo('compliments-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            ✿ <span>Compliment Machine</span>
          </button>
          <button onClick={() => scrollTo('gift-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            🎁 <span>Mystery Gift</span>
          </button>
          <button onClick={() => scrollTo('final-section')} className="btn-kawaii-secondary" style={{ justifyContent: 'flex-start', padding: '8px 14px', fontSize: '1.05rem' }}>
            🌅 <span>Sunset & Wish</span>
          </button>
        </div>
      )}

      {/* Floating HUD at bottom right */}
      <div className="floating-hud">
        {/* Flower Growth Progress */}
        <div 
          className="flower-progress" 
          title={`Exploration progress: ${scrollProgress}%\n${flower.label}`}
          style={{ cursor: 'pointer' }}
          onClick={() => sound.playPop()}
        >
          <span className="flower-icon">{flower.emoji}</span>
          <span style={{ fontSize: '0.95rem', color: '#9d4edd', minWidth: '42px' }}>
            {scrollProgress}%
          </span>
        </div>

        <div style={{ width: '1px', height: '20px', background: '#ffd0da', margin: '0 2px' }} />

        {/* SFX Button */}
        <button
          className="hud-btn"
          onClick={toggleSound}
          title={soundOn ? "Sound Effects: ON (Click to mute)" : "Sound Effects: OFF (Click to turn on)"}
          aria-label="Toggle sound effects"
        >
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        {/* Lofi BGM Button */}
        <button
          className="hud-btn"
          onClick={toggleBgm}
          style={{
            background: bgmOn ? 'linear-gradient(135deg, #c084fc, #e879f9)' : '#fff0f5',
            color: bgmOn ? '#fff' : '#b7791f'
          }}
          title={bgmOn ? "Gentle Lofi BGM: Playing (Click to pause)" : "Gentle Lofi BGM: Off (Click to play cozy music box)"}
          aria-label="Toggle background music"
        >
          <Music size={18} />
        </button>

        {/* Navigation Quick Jump */}
        <button
          className="hud-btn"
          onClick={() => {
            sound.playPop();
            setMenuOpen(!menuOpen);
          }}
          title="Jump to chapter"
          aria-label="Table of contents"
        >
          <Compass size={18} />
        </button>
      </div>
    </>
  );
}
