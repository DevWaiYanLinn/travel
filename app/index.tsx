import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
export default function App() {
    const router = useRouter();
    const { t } = useTranslation();
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
