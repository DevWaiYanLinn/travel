import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function Tab() {
    const { t, i18n } = useTranslation();
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    }
    return (
        <View className='flex-1 p-3'>
            <View>
                <Text className='text-xl font-bold'>{t('Language')}</Text>
                <View className='flex flex-col py-3 px-4 bg-white rounded-md mt-3'>
                    <View className='flex flex-row items-center justify-between gap-3'>
                        <Text className='text-gray-600'>{t('English')}</Text>
                        <Switch
                            disabled={i18n.language === 'en'}   
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={i18n.language === 'en' ? '#81b0ff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => handleLanguageChange('en')}
                            value={i18n.language === 'en'}
                        />
                    </View>
                    <View className='flex flex-row items-center justify-between gap-3'>
                        <Text className='text-gray-600'>{t('Japanese')}</Text>
                        <Switch
                            disabled={i18n.language === 'jp'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={i18n.language === 'jp' ? '#81b0ff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => handleLanguageChange('jp')}
                            value={i18n.language === 'jp'}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

