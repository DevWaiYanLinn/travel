import CityCard from '@/components/custom/city-card';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTranslation } from 'react-i18next';

export default function City() {
    const { t } = useTranslation();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View className="sticky p-3">
                <View style={{ borderRadius: 10 }} className="bg-white h-14 flex flex-row justify-between items-center">
                    <TextInput
                        placeholder={t('Search your favorite city...')}
                        className="flex-1 rounded-md px-4 py-3"
                    />
                    <EvilIcons name="search" size={30} color="#6b7280" className="mx-2" />
                </View>
            </View>
            <ScrollView className="flex-1 px-4">
                <View className="gap-4">
                    <CityCard
                        imageUrl={require('@/assets/city/tokyo.png')}
                        title={t('Tokyo')}
                        description={t(
                            'Tokyo, the capital of Japan, is one of the most vibrant and modern cities in the world. With a population of over 14 million people, it is the most populous metropolitan area globally. Tokyo is a city where tradition meets innovation,'
                        )}
                        onReadMore={() => {
                            console.log('Read more clicked');
                        }}
                    />
                    <CityCard
                        imageUrl={require('@/assets/city/osaka-castle.jpg')}
                        title={t('Osaka')}
                        description={t(
                            "Osaka, located in the Kansai region of Japan, is known for its lively atmosphere, rich culture, and unique cuisine. The city, which is Japan's third-largest, is a major economic and entertainment hub. Known as the ‘Kitchen of Japan,’"
                        )}
                        onReadMore={() => {
                            console.log('Read more clicked');
                        }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
