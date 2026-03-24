import { useState } from 'react';

const translations = {
  en: {
    modalTitle: 'BOOK A SHOOT',
    modalDate: 'Preferred Date',
    name: 'KSENIA NAMITOVA',
    bookShoot: 'BOOK A SHOOT',
    lifestyle: 'ME AND MY LIFESTYLE',
    developedBy: 'DESIGNED & DEVELOPED BY',
    developerName: 'JOLY',
    langToggleBtn: 'RU',
    modalName: 'Your Name',
    modalContact: 'Instagram / Telegram / Phone',
    modalMessage: 'Tell me about your idea...',
    modalSubmit: 'SEND REQUEST',
    modalSending: 'SENDING...',
    modalSuccess: 'Request sent successfully! I will contact you soon.',
    modalError: 'Oops! Something went wrong. Please try again.',
    // Тексты для Gallery
    back: 'BACK',
    galleryTitle: 'ME',
    tabPhotos: 'ALL PHOTOS',
    tabLifestyle: 'MY LIFESTYLE',
    lifestyleQuote: "Photography is not just about capturing a moment — it's about feeling deeper, seeing beyond, and preserving what words can’t hold.",
    lifestyleText: "I thrive on movement and emotion. The electric guitar is my voice, while skiing and snowboarding give me a sense of freedom and speed. Padel fuels my competitive spirit, swimming brings me balance, and skating keeps me grounded in the moment. Traveling and exploring new places constantly inspire me — new cultures, new people, and new experiences turn life into an ongoing adventure.",
    lifestyleCta: "Let’s create something truly unique and inspiring together!"
  },
  ru: {
    name: 'КСЕНИЯ НАМИТОВА',
    bookShoot: 'ЗАБРОНИРОВАТЬ СЪЕМКУ',
    lifestyle: 'Я И МОЙ LIFESTYLE',
    developedBy: 'ДИЗАЙН И РАЗРАБОТКА —',
    developerName: 'ЖОЛИ',
    langToggleBtn: 'EN',

    // Тексты для Gallery
    modalTitle: 'ЗАБРОНИРОВАТЬ СЪЕМКУ',
    back: 'НАЗАД',
    galleryTitle: 'ОБО МНЕ',
    tabPhotos: 'ВСЕ ФОТО',
    tabLifestyle: 'МОЙ LIFESTYLE',
    lifestyleQuote: "Фотография — это не просто момент. Это способ чувствовать глубже, видеть больше и сохранять то, что нельзя выразить словами.",
    lifestyleText: "Движение и эмоции — моя стихия. Электрогитара — мой голос, а лыжи и сноуборд дают ощущение свободы и скорости. Падел-теннис разжигает соревновательный дух, плавание возвращает баланс, а скейтборд помогает быть в моменте. Путешествия и новые места постоянно вдохновляют меня — другие культуры, люди и впечатления превращают жизнь в непрерывное приключение.",
    lifestyleCta: "Давайте создадим что-то по-настоящему уникальное и вдохновляющее вместе!",

    modalName: 'Ваше имя',
    modalDate: 'Предпочтительная дата',
    modalContact: 'Instagram / Telegram / Номер телефона',
    modalMessage: 'Расскажите о вашей идее...',
    modalSubmit: 'ОТПРАВИТЬ ЗАЯВКУ',
    modalSending: 'ОТПРАВКА...',
    modalSuccess: 'Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.',
    modalError: 'Упс! Что-то пошло не так. Попробуйте еще раз.',
  }
  };

export const useTranslation = (initialLang = 'en') => {
  const [lang, setLang] = useState(initialLang);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ru' : 'en'));
  };

  const t = (key) => translations[lang][key] || key;

  return { lang, toggleLang, t };
};