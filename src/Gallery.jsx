import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './Gallery.css';

const galleryImages = [
  '/1.webp', '/2.webp', '/3.webp',
  '/4.webp', '/5.webp', '/6.webp',
  '/7.webp', '/8.webp', '/9.webp',
];

// Принимаем t и toggleLang из App.js
const Gallery = ({ onBack, t, toggleLang }) => {
  const [activeTab, setActiveTab] = useState('photos');
  const [direction, setDirection] = useState('forward');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setDirection(tab === 'lifestyle' ? 'forward' : 'backward');
    setActiveTab(tab);
  };

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const showNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  }, []);

  const showPrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <div className={`gallery-page direction-${direction}`}>
      <svg className="abstract-bg-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-100 200 C 400 50, 800 400, 1500 150" />
        <path d="M-50 700 C 300 850, 900 600, 1500 800" />
        <path d="M-200 450 C 500 500, 1000 200, 1600 450" />
        <path d="M300 -100 C 500 300, 700 800, 500 1100" />
      </svg>

      {/* Перевод кнопки "Назад" */}
      <button className="nav-back" onClick={onBack}>&larr; {t('back')}</button>

      <header className="gallery-header">
        {/* Перевод заголовка */}
        <h1 className="gallery-title">{t('galleryTitle')}</h1>
        <nav className="gallery-tabs">
          <button 
            className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => handleTabChange('photos')}
          >
            {t('tabPhotos')}
          </button>
          <button 
            className={`tab ${activeTab === 'lifestyle' ? 'active' : ''}`}
            onClick={() => handleTabChange('lifestyle')}
          >
            {t('tabLifestyle')}
          </button>
        </nav>
      </header>

      <div className="tab-content-wrapper">
        {activeTab === 'photos' ? (
          <div key="photos-panel" className={`dynamic-masonry slide-in-${direction}`}>
            {galleryImages.map((src, index) => (
              <div key={index} className="masonry-item" onClick={() => openLightbox(index)}>
                <img src={src} alt={`Portfolio ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        ) : (
          <div key="lifestyle-panel" className={`lifestyle-content slide-in-${direction}`}>
            <h2 className="lifestyle-quote">
              {t('lifestyleQuote')}
            </h2>
            <div className="lifestyle-text">
              <p>
                {t('lifestyleText')}
              </p>
            </div>
            <a href="https://www.instagram.com/namitova_k" 
               target="_blank" rel="noopener noreferrer" key={"lifestyle-cta"}
               className={`lifestyle-cta slide-in-${direction}`}>
               {t('lifestyleCta')}
            </a>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={(e) => e.target.classList.contains('lightbox-overlay') && closeLightbox()}>
          <div className="lightbox-header">
            <div className="lightbox-counter">{selectedIndex + 1} / {galleryImages.length}</div>
            <button className="lightbox-close" onClick={closeLightbox}><FiX /></button>
          </div>
          <button className="lightbox-nav prev" onClick={showPrev}><FiChevronLeft /></button>
          <img key={selectedIndex} src={galleryImages[selectedIndex]} className="lightbox-img" alt="" />
          <button className="lightbox-nav next" onClick={showNext}><FiChevronRight /></button>
        </div>
      )}

      {/* Переключатель языка работает из общих пропсов */}
      <button className="lang-toggle-gallery" onClick={toggleLang}>
        {t('langToggleBtn')}
      </button>
    </div>
  );
};

export default Gallery;