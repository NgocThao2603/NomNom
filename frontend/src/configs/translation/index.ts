import i18next, { InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../..//locales/en/translation.json';
import translationJA from '../../locales/ja/translation.json';
import translationVI from '../../locales/vi/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

// Khai báo các resource với type cụ thể
const resources: Resource = {
  en: { translation: translationEN },
  ja: { translation: translationJA },
  vi: { translation: translationVI }
};

// Cấu hình i18next với TypeScript
const i18nConfig: InitOptions = {
  lng: 'en', // Ngôn ngữ mặc định
  debug: true, // Chỉ bật debug khi phát triển
  resources,
  fallbackLng: 'ja', // Nếu ngôn ngữ không tồn tại, sẽ về ngôn ngữ này
  interpolation: {
    escapeValue: false, // Không escape trong React
  },
  detection: {
    // Thêm phần phát hiện ngôn ngữ nếu cần
    order: ['navigator', 'localStorage', 'htmlTag', 'path', 'subdomain'],
    caches: ['localStorage'],
  },
};

// Khởi tạo i18next với detector và react-i18next
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nConfig);

export default i18next;
