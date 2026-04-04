import { useState, useEffect } from 'react';
import { FaInstagram, FaTelegramPlane, FaVk } from 'react-icons/fa';
import Gallery from './Gallery';
import BookingModal from './BookingModal';
import { useTranslation } from './useTranslation';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lang, toggleLang, t } = useTranslation('en');

  useEffect(() => {
    const img = new Image();
    img.src = '/background.webp';

    const timer = setTimeout(() => {
      setLoading(false);
      setHasLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (page === 'lifestyle') {
    return <Gallery onBack={() => setPage('home')} t={t} toggleLang={toggleLang} />;
  }

  return (
    <>
      {!hasLoaded && (
        <div className={`preloader ${!loading ? 'fade-out' : ''}`}>
          <h1 className="preloader-text">{t('name')}</h1>
        </div>
      )}

      <div className={`wrapper ${hasLoaded ? 'content-visible' : ''}`}>
        <div className="background-container">
          <div
            className="background-layer active"
            style={{ backgroundImage: `url(/background.webp)` }}
          />
          <div className="overlay" />
        </div>

        <div className="glass-card">
          <h1 className="name">{t('name')}</h1>

          <div className="social-icons">
            <a href="https://instagram.com/namitova-k" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://t.me/namitova_k" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
            <a href="https://vk.com/namitova_k" target="_blank" rel="noreferrer"><FaVk /></a>
          </div>

          <button className="book-btn" onClick={() => setIsModalOpen(true)}>
            {t('bookShoot')}
          </button>

          <button className="lifestyle-link" onClick={() => setPage('lifestyle')}>
            {t('lifestyle')}
          </button>
        </div>

        <div className="footer-credits">
          {t('developedBy')}{' '}
          <a href="https://t.me/jolymento" target="_blank" rel="noreferrer">
            {t('developerName')}
          </a>
        </div>

        <button className="lang-toggle" onClick={toggleLang}>
          {t('langToggleBtn')}
        </button>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        t={t} 
      />
    </>
  );
}

export default App;