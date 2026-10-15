import React, { useState } from 'react';
import { Sparkles, Edit3, Check, RotateCcw } from 'lucide-react';
import { sound } from '../utils/sound';
import { SITE_DATA } from '../data/content';

export default function DigitalScrapbook() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('tarasha_scrapbook_cards_v2');
    return saved ? JSON.parse(saved) : SITE_DATA.scrapbook.cards;
  });

  const [flippedCards, setFlippedCards] = useState({});
  const [editingCard, setEditingCard] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', frontCaption: '', backNote: '' });

  const handleCardClick = (id) => {
    sound.playPaper();
    sound.playPop();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleStartEdit = (e, card) => {
    e.stopPropagation();
    sound.playPop();
    setEditingCard(card.id);
    setEditForm({
      title: card.title,
      frontCaption: card.frontCaption,
      backNote: card.backNote
    });
  };

  const handleSaveEdit = (e) => {
    e.stopPropagation();
    sound.playPop();
    const updated = cards.map((c) =>
      c.id === editingCard ? { ...c, ...editForm } : c
    );
    setCards(updated);
    localStorage.setItem('tarasha_scrapbook_cards', JSON.stringify(updated));
    setEditingCard(null);
  };

  const handleResetCards = () => {
    sound.playPop();
    localStorage.removeItem('tarasha_scrapbook_cards');
    setCards(SITE_DATA.scrapbook.cards);
    setEditingCard(null);
  };

  return (
    <section 
      id="scrapbook-section"
      style={{
        padding: '90px 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 235, 238, 0.9)',
          border: '1.5px solid #ffccd5',
          borderRadius: '999px',
          padding: '5px 16px',
          marginBottom: '12px',
          fontFamily: 'var(--font-hand)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#e11d48'
        }}>
          <span>memories & moments 📸</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
          fontWeight: 700,
          color: '#881337',
          marginBottom: '10px'
        }}>
          {SITE_DATA.scrapbook.heading}
        </h2>

        <p style={{
          maxWidth: '560px',
          margin: '0 auto',
          color: '#57534e',
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          {SITE_DATA.scrapbook.subtitle}
        </p>

        <p className="font-hand" style={{ marginTop: '10px', color: '#be123c', fontSize: '1.25rem', fontWeight: 700 }}>
          ✿ tap any photo to flip it and read the back ✿
        </p>
      </div>

      {/* Polaroid Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '36px 28px',
        justifyContent: 'center',
        padding: '10px'
      }}>
        {cards.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              className="polaroid-flip-container"
              style={{
                transform: `rotate(${card.rotation || 0}deg)`,
                transition: 'transform 0.3s ease',
                minHeight: '430px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${card.rotation || 0}deg)`;
                e.currentTarget.style.zIndex = '1';
              }}
              onClick={() => handleCardClick(card.id)}
            >
              {/* Washi Tape strip */}
              <div 
                className="washi-tape"
                style={{
                  background: card.id % 2 === 0 
                    ? 'rgba(254, 205, 211, 0.85)' 
                    : 'rgba(254, 240, 138, 0.85)'
                }}
              />

              <div className={`polaroid-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
                
                {/* Front of Polaroid */}
                <div className="polaroid-face" style={{ minHeight: '430px', display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Tag badge */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      background: '#fff0f3',
                      color: '#e11d48',
                      padding: '2px 10px',
                      borderRadius: '12px'
                    }}>
                      {card.tag}
                    </span>

                    {/* Edit button */}
                    <button
                      onClick={(e) => handleStartEdit(e, card)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                        padding: '4px'
                      }}
                      title="Edit note"
                    >
                      <Edit3 size={15} />
                    </button>
                  </div>

                  {/* Photo Frame */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#fef2f2',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.06)',
                    marginBottom: '16px'
                  }}>
                    <img 
                      src={card.image} 
                      alt={card.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Polaroid Handwritten Caption */}
                  <div style={{
                    textAlign: 'center',
                    marginTop: 'auto',
                    paddingBottom: '4px'
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#1f2937',
                      lineHeight: 1.2
                    }}>
                      {card.title}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: '1.25rem',
                      color: '#e11d48',
                      marginTop: '4px'
                    }}>
                      “{card.frontCaption}” ♡
                    </div>
                  </div>

                </div>

                {/* Back of Polaroid (Handwritten Note) */}
                <div className="polaroid-back">
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '20px',
                    fontSize: '1.2rem',
                    opacity: 0.5
                  }}>
                    💌
                  </div>

                  <span style={{
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#e11d48',
                    marginBottom: '14px'
                  }}>
                    {card.title}
                  </span>

                  <p style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: '#33272a',
                    lineHeight: '1.65',
                    margin: 0
                  }}>
                    {card.backNote}
                  </p>

                  <div style={{
                    marginTop: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-script)',
                    fontSize: '1.25rem',
                    color: '#9f1239'
                  }}>
                    <span>— Nilesh ♡</span>
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    fontSize: '0.85rem',
                    color: '#9ca3af',
                    fontFamily: 'var(--font-hand)'
                  }}>
                    (tap again to flip back)
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Note Modal if Nilesh wants to customize */}
      {editingCard && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            border: '2px solid #ffccd5'
          }}>
            <h3 className="font-hand" style={{ fontSize: '1.6rem', color: '#e11d48', marginBottom: '16px' }}>
              Personalize Memory Note ✏️
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#4b5563', display: 'block', marginBottom: '4px' }}>
                  Title
                </label>
                <input 
                  type="text" 
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ffd0da',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-hand)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#4b5563', display: 'block', marginBottom: '4px' }}>
                  Front Short Caption
                </label>
                <input 
                  type="text" 
                  value={editForm.frontCaption}
                  onChange={(e) => setEditForm({ ...editForm, frontCaption: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ffd0da',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-script)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#4b5563', display: 'block', marginBottom: '4px' }}>
                  Back Handwritten Note
                </label>
                <textarea 
                  rows={4}
                  value={editForm.backNote}
                  onChange={(e) => setEditForm({ ...editForm, backNote: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ffd0da',
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-hand)',
                    lineHeight: '1.4'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setEditingCard(null)}
                className="btn-kawaii-secondary"
                style={{ padding: '8px 18px', fontSize: '1rem' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="btn-kawaii"
                style={{ padding: '8px 22px', fontSize: '1rem' }}
              >
                <Check size={16} />
                <span>Save Note</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
