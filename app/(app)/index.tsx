import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Redirect, useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { useSession } from '@/providers/session-provider';
export default function App() {
    const router = useRouter();
    const { t } = useTranslation();
    const { session, isLoading } = useSession();

    if (isLoading) {
        return <View />;
    }

    if (session) {
        return <Redirect href={'/(app)/(tabs)'} />;
    }

    return (
        <View className="flex-1 relative">
            <Image
                source={require('@/assets/images/welcome-bg.png')}
                className="w-full h-full flex-1"
                resizeMode="stretch"
            />
            <View className="absolute bottom-0 left-0 right-0 p-5">
                <TouchableOpacity
                    style={{ borderRadius: 30 }}
                    className="bg-blue-500 h-14 py-3"
                    onPress={() => router.navigate('/(auth)/sign-in')}
                >
                    <Text className="text-center text-white text-xl  font-bold">{t('Welcome to the App')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
