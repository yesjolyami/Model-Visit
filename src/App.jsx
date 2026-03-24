import { useState, useEffect } from 'react';
import { FaInstagram, FaTelegramPlane, FaVk } from 'react-icons/fa';
import Gallery from './Gallery';
import BookingModal from './BookingModal';
import { useTranslation } from './useTranslation';
import './App.css';

const backgrounds = ['/1.webp', '/3.webp', '/7.webp', '/8.webp'];

function App() {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  
  // Состояние для открытия/закрытия модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Подключаем хук перевода
  const { lang, toggleLang, t } = useTranslation('en');

  useEffect(() => {
    backgrounds.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const timer = setTimeout(() => {
      setLoading(false);
      setHasLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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
          {backgrounds.map((src, index) => {
            let status = "";
            if (index === currentIndex) status = "active";
            if (index === prevIndex) status = "previous";

            return (
              <div
                key={src}
                className={`background-layer ${status}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            );
          })}
          <div className="overlay" />
        </div>

        <div className="glass-card">
          <h1 className="name">{t('name')}</h1>
          <div className="social-icons">
            <a href="https://instagram.com/namitova-k" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://t.me/namitova_k" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
            <a href="https://vk.com/namitova_k" target="_blank" rel="noreferrer"><FaVk /></a>
          </div>
          
          {/* Кнопка открывает модалку */}
          <button className="book-btn" onClick={() => setIsModalOpen(true)}>
            {t('bookShoot')}
          </button>
          
          <button className="lifestyle-link" onClick={() => setPage('lifestyle')}>
            {t('lifestyle')}
          </button>
        </div>

        <div className="footer-credits">
          {t('developedBy')} <a href="https://t.me/jolymento" target="_blank" rel="noreferrer">{t('developerName')}</a>
        </div>
        
        <button className="lang-toggle" onClick={toggleLang}>
          {t('langToggleBtn')}
        </button>
      </div>

      {/* Вызов компонента модалки */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        t={t} 
      />
    </>
  );
}

export default App;