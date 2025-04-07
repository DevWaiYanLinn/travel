import CityCard from '@/components/custom/city-card';
import { useFetch } from '@/lib/fetch';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTranslation } from 'react-i18next';

export default function City() {
    const {t} = useTranslation();
    const { data: cities } = useFetch<Array<any>>('/(api)/cities');
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <View className='sticky p-3'>
                <View className='bg-gray-200 rounded-lg flex flex-row justify-between items-center'>
                    <TextInput
                        placeholder={t('Search your favorite city...')}
                        className="flex-1 rounded-md px-4 py-3"
                    />
                    <EvilIcons name="search" size={25} color="#6b7280" className='mx-2' />
                </View>
            </View>
            <ScrollView className="flex-1">
                <CityCard
                    imageUrl={require('@/assets/city/tokyo.png')}
                    title="Tokyo"
                    description={t('Tokyo, the capital of Japan, is one of the most vibrant and modern cities in the world. With a population of over 14 million people, it is the most populous metropolitan area globally. Tokyo is a city where tradition meets innovation,')}
                    onReadMore={() => {
                        console.log('Read more clicked');
                    }}
                />
                <CityCard
                    imageUrl={require('@/assets/city/osaka-castle.jpg')}
                    title="Osaka"
                    description={t("Osaka, located in the Kansai region of Japan, is known for its lively atmosphere, rich culture, and unique cuisine. The city, which is Japan's third-largest, is a major economic and entertainment hub. Known as the ‘Kitchen of Japan,’")}
                    onReadMore={() => {
                        console.log('Read more clicked');
                    }}
                />
            </ScrollView>
        </KeyboardAvoidingView>

    );
}
