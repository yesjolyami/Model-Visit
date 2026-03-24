import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiX } from 'react-icons/fi';
import './BookingModal.css'; // Создадим стили на следующем шаге

const BookingModal = ({ isOpen, onClose, t }) => {
  const form = useRef();
  const [status, setStatus] = useState(''); // '' | 'sending' | 'success' | 'error'

  if (!isOpen) return null;

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // ЗАМЕНИ эти данные на свои из личного кабинета EmailJS
    const SERVICE_ID = 'service_rj1oz9j';
    const TEMPLATE_ID = 'template_dlswic4';
    const PUBLIC_KEY = 'nQkGjJD3JlFOdfJrl';

  emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus('success');
          setTimeout(() => {
            onClose();
            setStatus('');
          }, 4000); // Чуть дольше показываем успешный статус
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus('error');
          setTimeout(() => setStatus(''), 4000);
        }
      );
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-wrapper">
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        
        <div className="modal-content">
          <h2 className="modal-title">{t('modalTitle')}</h2>
          <div className="modal-divider"></div>

          {status === 'success' ? (
            <div className="modal-status success">
              <p>{t('modalSuccess')}</p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="booking-form">
              <div className="input-group">
                <input 
                  type="text" 
                  name="user_name" 
                  required 
                  disabled={status === 'sending'}
                />
                <label>{t('modalName')}</label>
              </div>

              <div className="input-group">
                <input 
                  type="text" 
                  name="user_contact" 
                  required 
                  disabled={status === 'sending'}
                />
                <label>{t('modalContact')}</label>
              </div>

              {/* Поле для даты */}
              <div className="input-group">
                <input 
                  type="date" 
                  name="user_date" 
                  required 
                  disabled={status === 'sending'}
                  className="date-input"
                />
                <label className="date-label">{t('modalDate')}</label>
              </div>

              <div className="input-group">
                <textarea 
                  name="message" 
                  rows="3" 
                  required 
                  disabled={status === 'sending'}
                ></textarea>
                <label>{t('modalMessage')}</label>
              </div>

              <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? t('modalSending') : t('modalSubmit')}
              </button>
              
              {status === 'error' && (
                <div className="modal-status error">
                  <p>{t('modalError')}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;