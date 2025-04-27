import { useTranslation } from 'react-i18next';
import { View, Text, Switch, StyleSheet, Pressable, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useRef } from 'react';
import { useFocusEffect } from 'expo-router';

export default function Tab() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = useCallback((lang: string) => {
        i18n.changeLanguage(lang);
    }, []);

    const aboutAppModalSheetRef = useRef<BottomSheetModal>(null);

    const handleAboutModalPress = useCallback(() => {
        aboutAppModalSheetRef.current?.present();
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                aboutAppModalSheetRef.current?.dismiss();
            };
        }, [])
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <View>
                <Text className="text-2xl text-gray-600 font-bold">{t('Language')}</Text>
                <View
                    className="flex flex-col py-3 px-4 rounded-md mt-3"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                >
                    <View className="flex flex-row items-center justify-between gap-3">
                        <Text className="text-gray-600 font-bold">{t('English')}</Text>
                        <Switch
                            disabled={i18n.language === 'en'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={i18n.language === 'en' ? '#81b0ff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => handleLanguageChange('en')}
                            value={i18n.language === 'en'}
                        />
                    </View>
                    <View className="flex flex-row items-center justify-between gap-3">
                        <Text className="text-gray-600 font-bold">{t('Japanese')}</Text>
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
            <View className="flex-1"></View>
            <Pressable onPress={handleAboutModalPress}>
                <View
                    className="mt-3 px-4 py-3 rounded-lg flex-row gap-3 items-center"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                >
                    <AntDesign name="infocirlceo" size={20} color="#4b5563" />
                    <Text className="text-gray-600">{t('About the App')}</Text>
                </View>
            </Pressable>
            <BottomSheetModalProvider>
                <BottomSheetModal ref={aboutAppModalSheetRef} snapPoints={['100%']}>
                    <BottomSheetView style={styles.contentContainer} className="p-3 bg-gray-100">
                        <View className="flex-1 w-full">
                            <View className="flex-col items-center justify-center sticky top-0">
                                <Image
                                    source={require('@/assets/images/icon.png')}
                                    className=" w-20 h-20 rounded-lg mr-3"
                                    resizeMode="cover"
                                />
                                <Text className="text-3xl text-gray-600 text-center mt-3 font-bold">
                                    {t('Meow Map')}
                                </Text>
                            </View>
                            <View className="bg-white flex-1 rounded-lg mt-3 p-3">
                                <Text className="text-gray-600">
                                    このアプリは、長崎市への深い感謝の気持ちを込めて開発しました。長崎市は、私が日本で開発者としての旅を始めるきっかけを与えてくれた特別な場所です。日本で生活できていること、そしてこれまで支えてくださった皆さんに心から感謝しています。
                                </Text>
                                <Text className="text-gray-600 mt-3">
                                    現在このアプリはプロトタイプの段階ですが、時間のあるときに少しずつ開発を進めていく予定です。日本、特に長崎を訪れる方々にとって役立つものになることを願っています。旅行のヒントや観光スポット、ぜひ試してほしい食べ物などを、ひとつのアプリにまとめてお届けします。
                                </Text>
                            </View>
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: '50%',
    },
});
