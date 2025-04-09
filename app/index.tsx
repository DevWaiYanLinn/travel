
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
    const router = useRouter();
    const { t } = useTranslation();
    return <View className="flex-1 relative">
        <Image source={require('@/assets/images/poster.jpg')} className='w-full h-full flex-1' resizeMode="stretch" />
        <View className='absolute bottom-0 left-0 right-0 p-5'>
            <TouchableOpacity className='bg-blue-500 py-3 rounded-3xl' onPress={() => router.navigate('/(tabs)')} >
                <Text className='text-center text-white text-2xl font-bold'>{t('Welcome to the App')}</Text>
            </TouchableOpacity>
        </View>
    </View>
}
