import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';

export default function AboutCity() {
    const { t } = useTranslation();
    return (
        <View className="flex-1 bg-white">
            <View className="flex-row bg-white rounded-3xl items-center gap-3 relative">
                <View className="absolute w-full h-full bg-white z-20 opacity-15"></View>
                <View className="absolute w-full h-full  z-40 justify-center items-center">
                    <Text className="text-white text-8xl font-extrabold">{t('Tokyo')}</Text>
                </View>
                <Image
                    source={require('@/assets/city/tokyo.png')}
                    className="rounded-lg"
                    style={{ height: Dimensions.get('window').height * 0.3, width: '100%' }}
                />
            </View>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="flex-1 gap-3 p-3">
                    <View>
                        <Text className="text-xl text-gray-600 font-bold text-center">{t('About Tokyo')}</Text>
                        <Text className="text-gray-500 mt-2 p-3 rounded-lg">
                            {t(
                                'Tokyo, the capital of Japan, is one of the most vibrant and modern cities in the world. With a population of over 14 million people, it is the most populous metropolitan area globally. Tokyo is a city where tradition meets innovation,'
                            )}
                        </Text>
                    </View>
                    <View>
                        <Text className="text-xl text-gray-600 font-bold text-center">{t('Transportation')}</Text>
                        <View className="p-3 h-32 mt-3 rounded-lg"></View>
                    </View>
                    <View>
                        <Text className="text-xl text-gray-600 font-bold text-center">
                            {t('Travel Tips For Tokyo')}
                        </Text>
                        <View className="p-3 h-32 mt-3 rounded-lg"></View>
                    </View>
                    <View>
                        <Text className="text-xl text-gray-600 font-bold text-center">
                            {t('Travel Tips For Tokyo')}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
