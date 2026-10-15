import React from 'react';
import FloatingParticles from './components/FloatingParticles';
import AudioProgressHud from './components/AudioProgressHud';
import HeroOpening from './components/HeroOpening';
import ApologyLetter from './components/ApologyLetter';
import HappinessGarden from './components/HappinessGarden';
import DigitalScrapbook from './components/DigitalScrapbook';
import ComplimentMachine from './components/ComplimentMachine';
import CravingCultureInvite from './components/CravingCultureInvite';
import SecretGiftBox from './components/SecretGiftBox';
import FinalScreen from './components/FinalScreen';

export default function App() {
  const handleScrollToLetter = () => {
    const el = document.getElementById('letter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="tarasha-app" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Ambience & Interactive Tap Particles */}
      <FloatingParticles />

      {/* Persistent Audio Controls & Flower Growth Progress HUD */}
      <AudioProgressHud />

      {/* Main Experience Flow */}
      <main>
        {/* 1. Hero Landing with Peeking Teddy & 3D Envelope */}
        <HeroOpening onOpenLetter={handleScrollToLetter} />

        {/* 2. Sincere Apology Letter */}
        <ApologyLetter />

        {/* 3. Pick a Little Happiness Garden Mini-Game */}
        <HappinessGarden />

        {/* 4. Digital Scrapbook of Good Moments (Polaroids & Real Photos) */}
        <DigitalScrapbook />

        {/* 5. The Compliment Machine 3000 */}
        <ComplimentMachine />

        {/* 6. Craving Culture Hangout Invite (with Runaway NO button!) */}
        <CravingCultureInvite />

        {/* 7. The Secret Gift Box */}
        <SecretGiftBox />

        {/* 8. The Pastel Sunset Final Screen & Wishing Star */}
        <FinalScreen />
      </main>
    </div>
  );
}
