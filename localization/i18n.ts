import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, jp } from './translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
    type: 'languageDetector',
    async: true,
    init: () => {},
    detect: async function (callback: (lang: string) => void) {
        try {
            // get stored language from Async storage
            // put your own language detection logic here
            await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if (language) {
                    //if language was stored before, use this language in the app
                    return callback(language);
                }
                //if language was not stored yet, use english

                return callback('jp');
            });
        } catch (error) {
            console.log('Error reading language', error);
        }
    },
    cacheUserLanguage: async function (language: string) {
        try {
            //save a user's language choice in Async storage
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch (error) {}
    },
} as any;
const resources = {
    en: {
        translation: en,
    },
    jp: {
        translation: jp,
    },
};

i18n.use(initReactI18next)
    .use(languageDetectorPlugin)
    .init({
        resources,
        compatibilityJSON: 'v4',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });
export default i18n;
